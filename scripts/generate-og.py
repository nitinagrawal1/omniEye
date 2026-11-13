#!/usr/bin/env python3
"""Regenerate public/og.png (1200x630) with the client's real emblem badge."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
INK = (13, 12, 18)
BONE = (234, 227, 210)
AUREATE = (231, 178, 74)
SAPPHIRE = (77, 124, 255)
GRAPHITE = (154, 148, 132)

SERIF_R = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
SERIF_I = "/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf"
MONO = "/home/z/.local/share/fonts/JetBrainsMono.ttf"
SANS_B = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


def tracked(draw, pos, text, f, fill, spacing, anchor="la"):
    """Draw text with letter spacing; returns end x."""
    x, y = pos
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill, anchor=anchor)
        bb = draw.textbbox((0, 0), ch, font=f)
        x += (bb[2] - bb[0]) + spacing
    return x


def tracked_width(draw, text, f, spacing):
    """Width of a letter-spaced string."""
    w = 0
    for ch in text:
        bb = draw.textbbox((0, 0), ch, font=f)
        w += (bb[2] - bb[0]) + spacing
    return w - spacing


im = Image.new("RGB", (W, H), INK)

# radial glows (sapphire bottom-right, aureate top-left)
glow = Image.new("RGB", (W, H), INK)
gd = ImageDraw.Draw(glow)
gd.ellipse((W - 700, H - 620, W + 500, H + 500), fill=(16, 21, 40))
gd.ellipse((-450, -420, 420, 300), fill=(24, 21, 16))
glow = glow.filter(__import__("PIL.ImageFilter", fromlist=["GaussianBlur"]).GaussianBlur(160))
im = Image.blend(im, glow, 0.9)

draw = ImageDraw.Draw(im)

# blueprint grid — barely visible, alpha-safe overlay only
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
for x in range(0, W, 30):
    od.line((x, 0, x, H), fill=(234, 227, 210, 7), width=1)
for y in range(0, H, 30):
    od.line((0, y, W, y), fill=(234, 227, 210, 7), width=1)
im = Image.alpha_composite(im.convert("RGBA"), overlay).convert("RGB")
draw = ImageDraw.Draw(im)

# corner ticks
def ticks(x, y, w, h, ln=26, col=(234, 227, 210, 115)):
    o = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(o)
    d.line([(x, y + ln), (x, y), (x + ln, y)], fill=col, width=2, joint="curve")
    d.line([(x + w - ln, y), (x + w, y), (x + w, y + ln)], fill=col, width=2, joint="curve")
    d.line([(x + w, y + h - ln), (x + w, y + h), (x + w - ln, y + h)], fill=col, width=2, joint="curve")
    d.line([(x + ln, y + h), (x, y + h), (x, y + h - ln)], fill=col, width=2, joint="curve")
    return Image.alpha_composite(im.convert("RGBA"), o).convert("RGB")

im = ticks(36, 36, W - 72, H - 72)
draw = ImageDraw.Draw(im)

# mono labels
m13 = font(MONO, 13)
tracked(draw, (64, 46), "S-01 · HERO SHEET", m13, GRAPHITE, 2)
t = "PRIVATE BETA"
tracked(draw, (1136 - tracked_width(draw, t, m13, 2), 46), t, m13, GRAPHITE, 2)

# headline
h88 = font(SERIF_R, 88)
h88i = font(SERIF_I, 88)
x = 64
draw.text((x, 190), "Your AI ", font=h88, fill=BONE)
x += draw.textlength("Your AI ", font=h88)
draw.text((x, 190), "Sees", font=h88i, fill=AUREATE)
x += draw.textlength("Sees", font=h88i)
draw.text((x, 190), " What You See—", font=h88, fill=BONE)
draw.text((64, 288), "In Real Time.", font=h88, fill=BONE)

# taglines
m19 = font(MONO, 19)
tracked(draw, (64, 420), "SAS — SEE · ANALYZE · SHOW", m19, AUREATE, 6)
m15 = font(MONO, 15)
tracked(draw, (64, 460), "INTENT-AWARE AI DESKTOP OVERLAY", m15, GRAPHITE, 2)

# emblem badge top-right: bone rounded square + the client's emblem (RGBA)
emblem = Image.open("/home/z/my-project/public/brand/emblem.png").convert("RGBA")
badge = 84
em = emblem.copy()
em.thumbnail((badge - 10, badge - 8), Image.LANCZOS)
bx, by = 908, 40
o = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(o)
od.rounded_rectangle((bx, by, bx + badge, by + badge), radius=10, fill=(234, 227, 210, 255))
ex = bx + (badge - em.width) // 2
ey = by + (badge - em.height) // 2
o.alpha_composite(em, (ex, ey))
im = Image.alpha_composite(im.convert("RGBA"), o).convert("RGB")
draw = ImageDraw.Draw(im)

s30 = font(SANS_B, 30)
wx = bx + badge + 14
draw.text((wx, 58), "Omni", font=s30, fill=BONE)
wx2 = wx + draw.textlength("Omni", font=s30)
draw.text((wx2, 58), "Eye", font=s30, fill=AUREATE)

# bottom-right dashed capture chip
m16 = font(MONO, 16)
chip_text = "LASSO CONTEXT CAPTURE · 240MS"
ctw = tracked_width(draw, chip_text, m16, 2)
cx, cy, cw, ch = 740, 510, ctw + 44, 56
o = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(o)
od.rectangle((cx, cy, cx + cw, cy + ch), fill=(13, 12, 18, 205))
step = 16
# dashed rectangle on top of the fill
perim = [(cx, cy), (cx + cw, cy), (cx + cw, cy + ch), (cx, cy + ch), (cx, cy)]
for (x0, y0), (x1, y1) in zip(perim, perim[1:]):
    seg = ((x1 - x0) ** 2 + (y1 - y0) ** 2) ** 0.5
    n = int(seg // step)
    for i in range(n + 1):
        t0 = i / max(n, 1)
        t1 = min(t0 + 0.62, 1.0)
        od.line(
            (x0 + (x1 - x0) * t0, y0 + (y1 - y0) * t0, x0 + (x1 - x0) * t1, y0 + (y1 - y0) * t1),
            fill=(77, 124, 255, 235),
            width=2,
        )
im = Image.alpha_composite(im.convert("RGBA"), o).convert("RGB")
draw = ImageDraw.Draw(im)
tracked(draw, (cx + 22, cy + 17), chip_text, m16, BONE, 2)

# bottom mono row
m14 = font(MONO, 14)
tracked(draw, (64, 556), "SUB-300MS SCREEN-REGION CAPTURE", m14, GRAPHITE, 2)
t2 = "WINDOWS · MACOS"
tracked(draw, (1136 - tracked_width(draw, t2, m14, 2), 556), t2, m14, GRAPHITE, 2)

im.save("/home/z/my-project/public/og.png", "PNG")
print("og.png saved", im.size)
