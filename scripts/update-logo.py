#!/usr/bin/env python3
"""Replace the OmniEye emblem with the client's new logo image.

Source: scripts/tmp/new-logo-full.jpg (1280x698 JPEG, white bg).
Produces:
  - public/brand/emblem.png   (transparent RGBA, trimmed)
  - src/app/icon.png          (256x256 favicon tile)
  - src/app/apple-icon.png    (180x180 Apple touch tile)
  - scripts/tmp/logo-preview.png (QA contact sheet over dark/light)
"""
import os
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import binary_propagation, binary_dilation

SRC = "/home/z/my-project/scripts/tmp/new-logo-full.jpg"
EMBLEM_OUT = "/home/z/my-project/public/brand/emblem.png"
ICON_OUT = "/home/z/my-project/src/app/icon.png"
APPLE_OUT = "/home/z/my-project/src/app/apple-icon.png"
PREVIEW = "/home/z/my-project/scripts/tmp/logo-preview.png"

BONE = (234, 227, 210)
INK = (13, 12, 18)

# ---- 1. load + background estimate -------------------------------------
im = Image.open(SRC).convert("RGB")
a = np.asarray(im).astype(np.float32)
h, w, _ = a.shape

corners = np.concatenate([
    a[:22, :22].reshape(-1, 3),
    a[:22, -22:].reshape(-1, 3),
    a[-22:, :22].reshape(-1, 3),
    a[-22:, -22:].reshape(-1, 3),
])
bg = np.median(corners, axis=0)
print("bg color:", bg.round(1))

# ---- 2. distance map ----------------------------------------------------
dist = np.sqrt(((a - bg) ** 2).sum(axis=2))
close = dist < 26  # candidate background pixels

# ---- 3. flood-fill background from the borders --------------------------
seed = np.zeros((h, w), dtype=bool)
seed[0, :] = seed[-1, :] = seed[:, 0] = seed[:, -1] = True
seed &= close
bg_region = binary_propagation(seed, mask=close)
print("bg region px:", int(bg_region.sum()), "/", h * w)

# ---- 4. content bbox + crop ---------------------------------------------
content = ~bg_region
ys, xs = np.where(content)
y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
print("content bbox:", x0, y0, x1, y1)
pad = 6
x0, y0 = max(0, x0 - pad), max(0, y0 - pad)
x1, y1 = min(w - 1, x1 + pad), min(h - 1, y1 + pad)
a_c = a[y0:y1 + 1, x0:x1 + 1]
dist_c = dist[y0:y1 + 1, x0:x1 + 1]
bg_r_c = bg_region[y0:y1 + 1, x0:x1 + 1]
ch, cw = a_c.shape[:2]

# ---- 5. soft alpha + decontamination ------------------------------------
# band of 2px around the flood region gets a distance-based alpha ramp so
# anti-aliased edges don't leave a white halo on dark backgrounds.
band = binary_dilation(bg_r_c, iterations=2) & ~bg_r_c
alpha = np.full((ch, cw), 255.0)
# inside the flood region: alpha from distance (faint circuit traces stay
# semi-visible on dark backgrounds)
ramp = np.clip((dist_c - 10.0) / (70.0 - 10.0), 0.0, 1.0) * 255.0
alpha[bg_r_c] = ramp[bg_r_c]
alpha[band] = np.maximum(ramp[band], alpha[band])

alpha_u = alpha.astype(np.float32) / 255.0
# un-mix the background out of semi-transparent pixels
af = alpha_u[..., None]
rgb = (a_c - (1.0 - af) * bg) / np.maximum(af, 1e-3)
rgb = np.clip(rgb, 0, 255)

out = np.dstack([rgb.astype(np.uint8), (alpha_u * 255).astype(np.uint8)])
emblem = Image.fromarray(out, "RGBA")

# final trim on alpha
al = np.asarray(emblem)[:, :, 3]
ys, xs = np.where(al > 8)
ex0, ex1, ey0, ey1 = xs.min(), xs.max(), ys.min(), ys.max()
emblem = emblem.crop((ex0, ey0, ex1 + 1, ey1 + 1))
print("emblem size:", emblem.size)

# light despeckle: drop fully-isolated alpha specks via slight median on alpha
emblem.save(EMBLEM_OUT, "PNG")
print("saved", EMBEDLEM_OUT if False else EMBLEM_OUT, os.path.getsize(EMBLEM_OUT), "bytes")

# ---- 6. tiles: favicon + apple icon -------------------------------------
def make_tile(size, out_path):
    tile = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(tile)
    radius = int(size * 0.225)
    d.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=BONE + (255,))
    # fit emblem into 78% of tile
    box = int(size * 0.78)
    em = emblem.copy()
    em.thumbnail((box, box), Image.LANCZOS)
    ex = (size - em.width) // 2
    ey = (size - em.height) // 2
    tile.alpha_composite(em, (ex, ey))
    tile.save(out_path, "PNG")
    print("saved", out_path, tile.size, os.path.getsize(out_path), "bytes")

make_tile(256, ICON_OUT)
make_tile(180, APPLE_OUT)

# ---- 7. QA contact sheet ------------------------------------------------
def over(img, color):
    bgim = Image.new("RGBA", img.size, color + (255,))
    return Image.alpha_composite(bgim, img)

s = 2
big = emblem.resize((emblem.width * s, emblem.height * s), Image.LANCZOS)
sheet = Image.new("RGBA", (big.width * 3 + 40, big.height + 20), INK + (255,))
sheet.alpha_composite(over(big, INK), (10, 10))
sheet.alpha_composite(over(big, BONE), (20 + big.width, 10))
sheet.alpha_composite(big, (30 + big.width * 2, 10))
sheet.convert("RGB").save(PREVIEW)
print("saved", PREVIEW)
