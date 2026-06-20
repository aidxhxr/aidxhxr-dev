"""Draw a stylized drummer (Andrew Neiman) tuned to read well at 96x72 ASCII.

Dark figure on a white field, matching the napoleon/portrait convention
(non-white pixels do the filling, so no inversion at asciify time).
"""
from PIL import Image, ImageDraw, ImageFilter

W, H = 800, 1000
BLACK = 0
WHITE = 255
GRAY = 70


def rotated_disc(w, h, angle, fill=BLACK):
    pad = int(max(w, h) * 1.5)
    im = Image.new("L", (pad, pad), 0)
    d = ImageDraw.Draw(im)
    cx = pad // 2
    d.ellipse((cx - w // 2, cx - h // 2, cx + w // 2, cx + h // 2), fill=255)
    im = im.rotate(angle, resample=Image.BICUBIC, expand=False)
    return im


def paste_disc(canvas, disc, cx, cy, fill=BLACK):
    solid = Image.new("L", disc.size, fill)
    canvas.paste(solid, (cx - disc.size[0] // 2, cy - disc.size[1] // 2), disc)


def thick_line(d, p0, p1, width, fill=BLACK):
    d.line([p0, p1], fill=fill, width=width)
    r = width // 2
    for p in (p0, p1):
        d.ellipse((p[0] - r, p[1] - r, p[0] + r, p[1] + r), fill=fill)


def poly(d, pts, fill=BLACK):
    d.polygon(pts, fill=fill)


img = Image.new("L", (W, H), WHITE)
d = ImageDraw.Draw(img)

# --- cymbal stands (behind everything) ---
thick_line(d, (175, 330), (255, 760), 7, GRAY)
thick_line(d, (625, 310), (560, 760), 7, GRAY)

# --- bass drum: big front circle ---
d.ellipse((180, 600, 620, 1000), fill=BLACK)
# drum head rim + interior ring read as a drum, not a blob
d.ellipse((205, 625, 595, 975), outline=WHITE, width=10)
d.ellipse((300, 720, 500, 880), outline=WHITE, width=6)

# --- drummer torso emerging from behind the kit ---
poly(d, [(318, 455), (482, 455), (540, 690), (260, 690)], BLACK)
# neck
d.rectangle((378, 392, 422, 455), fill=BLACK)

# --- head ---
d.ellipse((346, 268, 454, 400), fill=BLACK)
# a sliver of hair highlight to give the head structure when downsampled
poly(d, [(360, 285), (420, 275), (405, 305), (362, 312)], WHITE)

# --- arms raised, holding sticks ---
thick_line(d, (322, 460), (245, 345), 34, BLACK)   # left upper arm
thick_line(d, (245, 345), (322, 212), 30, BLACK)   # left forearm
thick_line(d, (478, 460), (555, 345), 34, BLACK)   # right upper arm
thick_line(d, (555, 345), (478, 212), 30, BLACK)   # right forearm

# hands
d.ellipse((300, 196, 344, 240), fill=BLACK)
d.ellipse((456, 196, 500, 240), fill=BLACK)

# --- drumsticks crossing overhead (the iconic signal) ---
thick_line(d, (322, 214), (575, 70), 11, BLACK)
thick_line(d, (478, 214), (225, 70), 11, BLACK)

# --- toms on the bass drum, in front of torso ---
left_tom = rotated_disc(170, 150, 18)
right_tom = rotated_disc(170, 150, -18)
paste_disc(img, left_tom, 330, 640, BLACK)
paste_disc(img, right_tom, 470, 640, BLACK)
d = ImageDraw.Draw(img)
d.ellipse((262, 588, 398, 700), outline=WHITE, width=6)
d.ellipse((402, 588, 538, 700), outline=WHITE, width=6)

# --- cymbals on top (foreground), big angled discs ---
left_cym = rotated_disc(280, 64, 18)
right_cym = rotated_disc(280, 64, -18)
paste_disc(img, left_cym, 178, 305, BLACK)
paste_disc(img, right_cym, 622, 285, BLACK)
d = ImageDraw.Draw(img)
# bell + grooves so cymbals don't read as flat bars
d.ellipse((168, 296, 188, 314), fill=WHITE)
d.ellipse((612, 276, 632, 294), fill=WHITE)

img = img.filter(ImageFilter.GaussianBlur(1.2))
img.save("public/_ascii/neiman.png")
print("wrote public/_ascii/neiman.png", img.size)
