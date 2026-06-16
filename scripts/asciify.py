import sys
from PIL import Image, ImageOps, ImageEnhance

COLS = 84
ROWS = 62
CHAR_ASPECT = 1.667
RAMP = " .,:;-~=+ox*%#@"
WHITE_CLIP = 232
BLACK_POINT = 18

SOURCES = [
    ("public/_ascii/napoleon.jpg", "center", "top"),
    ("public/_ascii/portrait.jpg", "center", "center"),
]


def asciify(path, hanchor, vanchor):
    img = Image.open(path).convert("L")
    img = ImageOps.autocontrast(img, cutoff=1)
    img = ImageEnhance.Contrast(img).enhance(1.35)

    target_ratio = COLS / (ROWS * CHAR_ASPECT)
    w, h = img.size
    cur_ratio = w / h

    if cur_ratio > target_ratio:
        new_w = int(h * target_ratio)
        if hanchor == "right":
            left = w - new_w
        elif hanchor == "left":
            left = 0
        else:
            left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        if vanchor == "top":
            top = 0
        elif vanchor == "bottom":
            top = h - new_h
        else:
            top = (h - new_h) // 2
        img = img.crop((0, top, w, top + new_h))

    img = img.resize((COLS, ROWS), Image.LANCZOS)
    px = img.load()

    rows = []
    for y in range(ROWS):
        line = []
        for x in range(COLS):
            lum = px[x, y]
            if lum >= WHITE_CLIP:
                idx = 0
            else:
                d = (WHITE_CLIP - lum) / (WHITE_CLIP - BLACK_POINT)
                idx = round(min(1.0, d) * (len(RAMP) - 1))
            line.append(RAMP[idx])
        rows.append("".join(line))
    return rows


def to_ts_array(rows):
    inner = ",\n    ".join(repr(r) for r in rows)
    return "[\n    " + inner + ",\n  ]"


def main():
    frames = [asciify(path, hanchor, vanchor) for path, hanchor, vanchor in SOURCES]
    out = []
    out.append("export const ASCII_COLS = %d;" % COLS)
    out.append("export const ASCII_ROWS = %d;" % ROWS)
    out.append("")
    out.append("export const ASCII_FRAMES: string[][] = [")
    for f in frames:
        out.append("  " + to_ts_array(f) + ",")
    out.append("];")
    out.append("")
    with open("lib/ascii-frames.ts", "w") as fh:
        fh.write("\n".join(out))
    print("wrote lib/ascii-frames.ts (%d frames, %dx%d)" % (len(frames), COLS, ROWS))


if __name__ == "__main__":
    main()
