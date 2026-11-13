#!/usr/bin/env python3
"""
Prepare the client's real assets for the OmniEye landing page.

Asset map (per the build brief, section 6):
  img4  lasso-autocad  -> hero video-box poster (clean AutoCAD base screen)
  img6  multi-industry-b -> Healthcare visual (HIPAA chip covered + taskbar cropped)
  img5  multi-industry-a -> IT & Software visual (HUD + IDE pane crop)
  img1  hud-autocad    -> About filmstrip (toned)
  img2  hotkey         -> About filmstrip (toned)
  img3  privacy-panel  -> About filmstrip (toned)
  img7  storyboard-60s -> demo modal storyboard
  logo  emblem         -> OG image badge, apple-icon

All web outputs are WebP with explicit sizes.
"""
from PIL import Image, ImageEnhance, ImageDraw, ImageFilter

SRC = "/home/z/my-project/upload/images"
OUT = "/home/z/my-project/public/mockups"
BRAND = "/home/z/my-project/public"
APP = "/home/z/my-project/src/app"

import os
os.makedirs(OUT, exist_ok=True)


def save_webp(im, path, widths, quality=84):
    """Save progressive WebP variants for each max width."""
    for w in widths:
        if im.width <= w:
            im.save(f"{path}-{im.width}.webp", "WEBP", quality=quality, method=6)
            break
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(f"{path}-{w}.webp", "WEBP", quality=quality, method=6)
    else:
        im.save(f"{path}-{im.width}.webp", "WEBP", quality=quality, method=6)


def tone(im, color=0.55, brightness=0.92, contrast=0.96):
    """Desaturate and tone mockups toward ink/bone (brief: no neon glow)."""
    im = ImageEnhance.Color(im).enhance(color)
    im = ImageEnhance.Brightness(im).enhance(brightness)
    im = ImageEnhance.Contrast(im).enhance(contrast)
    return im


# ---------------------------------------------------------------- 1. hero poster
img4 = Image.open(f"{SRC}/full_img4.jpg").convert("RGB")
save_webp(img4, f"{OUT}/lasso-autocad", [1376, 768])

# ---------------------------------------------------------------- 2. healthcare (cover HIPAA chip)
img6 = Image.open(f"{SRC}/full_img6.jpg").convert("RGB")
# the gold chip "Sub-300ms Context Captured - HIPAA Privacy Mode" sits at
# ~ (825, 608) - (1252, 664); cover it with a clean band sampled just above it
band = img6.crop((822, 592, 1254, 612)).resize((432, 58), Image.LANCZOS)
band = band.filter(ImageFilter.GaussianBlur(2))
img6.paste(band, (822, 606))
# crop inside the monitor screen, removing the Windows taskbar
img6c = img6.crop((92, 32, 1302, 668))
save_webp(img6c, f"{OUT}/healthcare", [1208, 768])

# ---------------------------------------------------------------- 3. IT (HUD + IDE pane)
img5 = Image.open(f"{SRC}/full_img5.jpg").convert("RGB")
img5c = img5.crop((770, 62, 1312, 652))
save_webp(img5c, f"{OUT}/it-code", [542, 420])

# ---------------------------------------------------------------- 4. filmstrip frames (toned)
img1 = Image.open(f"{SRC}/full_img1.jpg").convert("RGB")
save_webp(tone(img1), f"{OUT}/hud-autocad", [900, 480])
img2 = Image.open(f"{SRC}/full_img2.jpg").convert("RGB")
save_webp(tone(img2), f"{OUT}/hotkey", [900, 480])
img3 = Image.open(f"{SRC}/full_img3.jpg").convert("RGB")
save_webp(tone(img3), f"{OUT}/privacy-panel", [900, 480])

# ---------------------------------------------------------------- 5. storyboard
img7 = Image.open(f"{SRC}/full_img7.jpg").convert("RGB")
save_webp(img7, f"{OUT}/storyboard", [1100, 768])

# ---------------------------------------------------------------- 6. emblem (trim white margins)
logo = Image.open(f"{SRC}/full_logo.jpg").convert("RGB")
gray = logo.convert("L")
# find bounding box of non-white content (threshold 245)
mask = gray.point(lambda p: 255 if p < 245 else 0)
bbox = mask.getbbox()
print("emblem bbox:", bbox)
emblem = logo.crop(bbox)
# square canvas, white background, small margin
side = max(emblem.size)
canvas = Image.new("RGB", (side, side), (255, 255, 255))
canvas.paste(emblem, ((side - emblem.width) // 2, (side - emblem.height) // 2))
canvas.save(f"{BRAND}/brand/emblem.png")
if not os.path.isdir(f"{BRAND}/brand"):
    os.makedirs(f"{BRAND}/brand")
    canvas.save(f"{BRAND}/brand/emblem.png")

# apple-touch icon: 180x180 white with the emblem
icon = canvas.resize((172, 172), Image.LANCZOS)
appicon = Image.new("RGB", (180, 180), (255, 255, 255))
appicon.paste(icon, (4, 4))
appicon.save(f"{APP}/apple-icon.png")

print("done")
