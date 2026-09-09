// scripts/generate-og-image.mjs
// Generates public/og-image.png (1200x630) — a brand-matched Open Graph / social
// share preview for the landing page. Pure Node, zero dependencies: pixels are
// drawn by hand and the PNG is compressed with the built-in node:zlib.
//
//   node scripts/generate-og-image.mjs

import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const W = 1200
const H = 630
const img = Buffer.alloc(W * H * 3)

/* ── raster helpers ─────────────────────────────────────────────────── */

const setPx = (x, y, r, g, b) => {
  if (x < 0 || x >= W || y < 0 || y >= H) return
  const i = (y * W + x) * 3
  img[i] = r; img[i + 1] = g; img[i + 2] = b
}

const fillRect = (x, y, w, h, c) => {
  const x0 = Math.max(0, Math.floor(x)), x1 = Math.min(W - 1, Math.floor(x + w - 1))
  const y0 = Math.max(0, Math.floor(y)), y1 = Math.min(H - 1, Math.floor(y + h - 1))
  for (let yy = y0; yy <= y1; yy++) for (let xx = x0; xx <= x1; xx++) setPx(xx, yy, c[0], c[1], c[2])
}

const gradientRect = (x, y, w, h, top, bottom) => {
  const x0 = Math.max(0, Math.floor(x)), x1 = Math.min(W - 1, Math.floor(x + w - 1))
  const y0 = Math.max(0, Math.floor(y)), y1 = Math.min(H - 1, Math.floor(y + h - 1))
  for (let yy = y0; yy <= y1; yy++) {
    const t = (yy - y) / Math.max(1, h - 1)
    const c = [
      Math.round(top[0] + (bottom[0] - top[0]) * t),
      Math.round(top[1] + (bottom[1] - top[1]) * t),
      Math.round(top[2] + (bottom[2] - top[2]) * t),
    ]
    for (let xx = x0; xx <= x1; xx++) setPx(xx, yy, c[0], c[1], c[2])
  }
}

const inRoundRect = (xx, yy, x, y, w, h, r) => {
  if (xx < x || xx >= x + w || yy < y || yy >= y + h) return false
  const rr = Math.min(r, w / 2, h / 2)
  const dx = Math.max(0, x + rr - xx, xx - (x + w - rr))
  const dy = Math.max(0, y + rr - yy, yy - (y + h - rr))
  if (dx === 0 || dy === 0) return true
  return dx * dx + dy * dy <= rr * rr
}

const roundRect = (x, y, w, h, r, c) => {
  const rr = Math.min(r, w / 2, h / 2)
  for (let yy = Math.max(0, Math.floor(y)); yy <= Math.min(H - 1, Math.floor(y + h - 1)); yy++)
    for (let xx = Math.max(0, Math.floor(x)); xx <= Math.min(W - 1, Math.floor(x + w - 1)); xx++)
      if (inRoundRect(xx + 0.5, yy + 0.5, x, y, w, h, rr)) setPx(xx, yy, c[0], c[1], c[2])
}

const roundRectV = (x, y, w, h, r, topC, bottomC) => {
  const rr = Math.min(r, w / 2, h / 2)
  for (let yy = Math.max(0, Math.floor(y)); yy <= Math.min(H - 1, Math.floor(y + h - 1)); yy++) {
    const t = Math.max(0, Math.min(1, (yy - y) / Math.max(1, h - 1)))
    const c = [
      Math.round(topC[0] + (bottomC[0] - topC[0]) * t),
      Math.round(topC[1] + (bottomC[1] - topC[1]) * t),
      Math.round(topC[2] + (bottomC[2] - topC[2]) * t),
    ]
    for (let xx = Math.max(0, Math.floor(x)); xx <= Math.min(W - 1, Math.floor(x + w - 1)); xx++)
      if (inRoundRect(xx + 0.5, yy + 0.5, x, y, w, h, rr)) setPx(xx, yy, c[0], c[1], c[2])
  }
}

const distSeg = (px, py, x1, y1, x2, y2) => {
  const dx = x2 - x1, dy = y2 - y1
  const len2 = dx * dx + dy * dy
  let t = len2 === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / len2
  t = Math.max(0, Math.min(1, t))
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))
}

const line = (x1, y1, x2, y2, thickness, c) => {
  const r = thickness / 2
  const x0 = Math.max(0, Math.floor(Math.min(x1, x2) - r)), xE = Math.min(W - 1, Math.ceil(Math.max(x1, x2) + r))
  const y0 = Math.max(0, Math.floor(Math.min(y1, y2) - r)), yE = Math.min(H - 1, Math.ceil(Math.max(y1, y2) + r))
  for (let yy = y0; yy <= yE; yy++) for (let xx = x0; xx <= xE; xx++)
    if (distSeg(xx + 0.5, yy + 0.5, x1, y1, x2, y2) <= r) setPx(xx, yy, c[0], c[1], c[2])
}

const polyline = (pts, thickness, c) => {
  for (let i = 0; i + 1 < pts.length; i++) line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], thickness, c)
}

const circle = (cx, cy, r, c) => {
  for (let yy = Math.max(0, Math.floor(cy - r)); yy <= Math.min(H - 1, Math.ceil(cy + r)); yy++)
    for (let xx = Math.max(0, Math.floor(cx - r)); xx <= Math.min(W - 1, Math.ceil(cx + r)); xx++)
      if ((xx + 0.5 - cx) ** 2 + (yy + 0.5 - cy) ** 2 <= r * r) setPx(xx, yy, c[0], c[1], c[2])
}

const polygon = (pts, c) => {
  const ys = pts.map((p) => p[1])
  const y0 = Math.max(0, Math.ceil(Math.min(...ys))), y1 = Math.min(H - 1, Math.floor(Math.max(...ys)))
  for (let yy = y0; yy <= y1; yy++) {
    const crosses = []
    for (let i = 0; i < pts.length; i++) {
      const [ax, ay] = pts[i]
      const [bx, by] = pts[(i + 1) % pts.length]
      if ((ay <= yy + 0.5 && by > yy + 0.5) || (by <= yy + 0.5 && ay > yy + 0.5))
        crosses.push(ax + (yy + 0.5 - ay) * (bx - ax) / (by - ay))
    }
    crosses.sort((a, b) => a - b)
    for (let i = 0; i + 1 < crosses.length; i += 2) {
      const x0 = Math.max(0, Math.ceil(crosses[i])), x1 = Math.min(W - 1, Math.floor(crosses[i + 1]))
      for (let xx = x0; xx <= x1; xx++) setPx(xx, yy, c[0], c[1], c[2])
    }
  }
}

/* ── palette ────────────────────────────────────────────────────────── */

const BG_TOP    = [241, 242, 237]   // #F1F2ED
const BG_BOTTOM = [226, 229, 220]
const SHADOW    = [199, 204, 191]
const PANEL_TOP = [38, 77, 65]
const PANEL_BOT = [23, 49, 41]
const TRACK     = [41, 82, 71]
const AREA      = [45, 88, 74]
const LINE      = [174, 198, 185]
const SAGE      = [124, 148, 115]   // #7C9473
const TERRA     = [190, 106, 75]    // #BE6A4B
const INK       = [235, 239, 230]
const MUTED     = [200, 208, 198]

/* ── render ─────────────────────────────────────────────────────────── */

gradientRect(0, 0, W, H, BG_TOP, BG_BOTTOM)

// Main "dashboard" panel on the soft background
const panel = { x: 96, y: 78, w: 1008, h: 474, r: 46 }
roundRect(panel.x + 12, panel.y + 16, panel.w, panel.h, panel.r, SHADOW)
roundRectV(panel.x, panel.y, panel.w, panel.h, panel.r, PANEL_TOP, PANEL_BOT)
const pxL = panel.x + 62            // inner left
const pxR = panel.x + panel.w - 30  // inner right

// Brand mark (same motif as the Navbar logo): tile + rising trend + white spark
roundRect(200, 205, 98, 98, 20, [36, 78, 66])
const logoPts = [[223,290],[240,270],[256,276],[272,248],[288,252],[294,234]]
polygon([[223,290],[240,270],[256,276],[272,248],[288,252],[294,234],[294,290]], [48, 92, 78])
polyline(logoPts, 5, [185, 205, 190])
const spark = [[289,222],[290.8,228.4],[296,231],[290.8,233.6],[289,240],[287.2,233.6],[282,231],[287.2,228.4]]
polygon(spark, [244, 248, 240])
// subtle companion pill beside the logo
roundRect(360, 178, 168, 34, 17, LINE)

// Chart: gridlines, area fill, line, then a terra anomaly drop
for (const gy of [300, 360, 420]) line(pxL, gy, pxL + 520, gy, 1.6, TRACK)
const chart = [[0,430],[55,402],[110,416],[165,362],[220,374],[275,336],[330,344],[385,302],[440,316],[496,268],[512,262],[528,268]]
const areaPts = [[pxL, 468], ...[chart.map(([dx, dy]) => [pxL + dx, dy])], [pxL + 528, 468]]
polygon(areaPts, AREA)
polyline(chart.map(([dx, dy]) => [pxL + dx, dy]), 5, LINE)
line(pxL + 496, 268, pxL + 512, 262, 5, TERRA)
line(pxL + 512, 262, pxL + 528, 268, 5, TERRA)
circle(pxL + 512, 262, 11, TERRA)
circle(pxL + 526, 268, 5, TERRA)

// KPI tiles along the right edge (skeleton-style)
for (const tx of [pxR - 340, pxR - 218, pxR - 96]) {
  roundRect(tx, panel.y + 70, 106, 96, 16, TRACK)
  roundRect(tx + 12, panel.y + 88, 82, 12, 6, INK)
  roundRect(tx + 12, panel.y + 110, 54, 12, 6, [210, 216, 205])
  roundRect(tx + 12, panel.y + 132, 34, 12, 6, MUTED)
  circle(tx + 12, panel.y + 150, 4, SAGE)
}

// Progress bars, bottom-left
let py = 458
for (const pct of [78, 54, 38]) {
  roundRect(pxL, py, 150, 16, 8, TRACK)
  roundRect(pxL, py, Math.max(8, 150 * pct / 100), 16, 8, SAGE)
  py += 26
}

// Alert card, bottom-right
roundRect(pxR - 300, 452, 268, 92, 18, AREA)
circle(pxR - 258, 485, 8, TERRA)
roundRect(pxR - 236, 468, 176, 10, 5, INK)
roundRect(pxR - 236, 492, 118, 10, 5, MUTED)

// Floating accents outside the panel for depth
roundRect(panel.x + panel.w - 138, panel.y + 28, 108, 30, 15, SAGE)
circle(panel.x + 40, panel.y + panel.h + 14, 20, TERRA)

/* ── PNG encoder ────────────────────────────────────────────────────── */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c
  }
  return t
})()

const crc32 = (data) => {
  // JS bitwise operators work in signed 32-bit; keep the value signed
  // throughout and normalize to unsigned only at the end.
  let c = 0xffffffff
  for (let i = 0; i < data.length; i++) {
    c = CRC_TABLE[(c ^ data[i]) & 0xff] ^ (c >>> 8)
  }
  c = ~c
  return c < 0 ? c + 0x100000000 : c
}

const chunk = (type, data) => {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

const encodePng = (width, height, rgb) => {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8  // bit depth
  ihdr[9] = 2  // color type: truecolor RGB
  const stride = width * 3
  const raw = Buffer.alloc((stride + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0 // filter: none
    const src = y * stride
    const dst = y * (stride + 1) + 1
    for (let i = 0; i < stride; i++) raw[dst + i] = rgb[src + i]
  }
  const idat = deflateSync(raw, 6)
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))])
}

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og-image.png')
const png = encodePng(W, H, img)
writeFileSync(out, png)
console.log(`wrote ${out} (${png.length} bytes, ${W}x${H})`)