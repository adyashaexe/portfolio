#!/usr/bin/env python3
"""Generates the monochrome SVG artwork used by the portfolio.

Run from the repo root:  python3 scripts/generate_art.py
Everything is original, procedurally generated, and safe to edit or replace.
"""
import math
import os
import random

ROOT = os.path.join(os.path.dirname(__file__), "..", "assets")


def save(path, svg):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(svg)


def wrap(w, h, body, defs=""):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice">'
        f'<defs><radialGradient id="bg" cx="50%" cy="40%" r="80%">'
        f'<stop offset="0" stop-color="#1c1c20"/><stop offset="1" stop-color="#09090a"/>'
        f"</radialGradient>{defs}</defs>"
        f'<rect width="{w}" height="{h}" fill="url(#bg)"/>{body}</svg>'
    )


# ---------- Projects (800 x 500) ----------
def trojan():
    r = random.Random(1)
    w, h = 800, 500
    body = []
    for _ in range(26):
        x, y = r.randrange(0, w, 20), r.randrange(0, h, 20)
        pts = [(x, y)]
        for _ in range(r.randint(3, 6)):
            dx, dy = r.choice([(40, 0), (0, 40), (40, 40), (-40, 0), (0, -40), (40, -40)])
            x, y = x + dx, y + dy
            pts.append((x, y))
        d = " ".join(f"{a},{b}" for a, b in pts)
        body.append(f'<polyline points="{d}" fill="none" stroke="#34343a" stroke-width="2"/>')
        body.append(f'<circle cx="{pts[0][0]}" cy="{pts[0][1]}" r="4" fill="#4a4a52"/>')
        body.append(f'<circle cx="{pts[-1][0]}" cy="{pts[-1][1]}" r="4" fill="#4a4a52"/>')
    # power trace
    pts = []
    for i in range(0, w + 1, 4):
        v = math.sin(i / 14) * 10 + math.sin(i / 5) * 4 + r.uniform(-3, 3)
        if 430 < i < 520:  # injected anomaly
            v += math.sin((i - 430) / 6) * 46
        pts.append(f"{i},{300 + v:.1f}")
    body.append(f'<polyline points="{" ".join(pts)}" fill="none" stroke="#f2f2f0" stroke-width="2.2"/>')
    body.append('<rect x="430" y="210" width="90" height="180" fill="none" stroke="#f2f2f0" stroke-width="1.2" stroke-dasharray="6 6" opacity=".6"/>')
    return wrap(w, h, "".join(body))


def gastric():
    r = random.Random(2)
    w, h = 800, 500
    body = []
    for _ in range(190):
        ang, rad = r.uniform(0, math.tau), r.random() ** 0.6 * 420
        x, y = 400 + math.cos(ang) * rad * 1.1, 250 + math.sin(ang) * rad * 0.62
        s = r.uniform(8, 30)
        g = r.randint(70, 150)
        body.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{s:.1f}" fill="none" stroke="rgb({g},{g},{g+6})" stroke-width="1.4" opacity=".85"/>')
        body.append(f'<circle cx="{x + r.uniform(-3, 3):.1f}" cy="{y + r.uniform(-3, 3):.1f}" r="{s * .34:.1f}" fill="rgb({g + 60},{g + 60},{g + 66})" opacity=".8"/>')
    return wrap(w, h, "".join(body))


def exoplanet():
    r = random.Random(3)
    w, h = 800, 500
    body = []
    for _ in range(140):
        body.append(f'<circle cx="{r.uniform(0, w):.0f}" cy="{r.uniform(0, 330):.0f}" r="{r.uniform(.6, 1.7):.1f}" fill="#fff" opacity="{r.uniform(.2, .8):.2f}"/>')
    glow = '<radialGradient id="sun"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#d8d8dc"/><stop offset="1" stop-color="#d8d8dc" stop-opacity="0"/></radialGradient>'
    body.append('<circle cx="400" cy="150" r="130" fill="url(#sun)"/>')
    for k, rx in enumerate((190, 270, 350)):
        body.append(f'<ellipse cx="400" cy="150" rx="{rx}" ry="{rx * .23:.0f}" fill="none" stroke="#3b3b42" stroke-width="1.4"/>')
    body.append('<circle cx="590" cy="187" r="11" fill="#0b0b0c" stroke="#f2f2f0" stroke-width="1.6"/>')
    # light curve with transit dip
    pts = []
    for i in range(0, w + 1, 4):
        v = r.uniform(-2.2, 2.2)
        if 300 < i < 420:
            v += 22 * (1 - abs((i - 360) / 60) ** 3 * 0.9)
        pts.append(f"{i},{400 + v:.1f}")
    body.append(f'<polyline points="{" ".join(pts)}" fill="none" stroke="#f2f2f0" stroke-width="2"/>')
    body.append('<line x1="0" y1="400" x2="800" y2="400" stroke="#2c2c31" stroke-dasharray="4 8"/>')
    return wrap(w, h, "".join(body), glow)


def hermes():
    r = random.Random(4)
    w, h = 800, 500
    body = []
    cx, cy = 560, 250
    nodes = []
    for i in range(13):
        a = i / 13 * math.tau + r.uniform(-.15, .15)
        rad = r.uniform(110, 200)
        nodes.append((cx + math.cos(a) * rad, cy + math.sin(a) * rad * .85))
    for x, y in nodes:
        body.append(f'<line x1="{cx}" y1="{cy}" x2="{x:.0f}" y2="{y:.0f}" stroke="#3b3b42" stroke-width="1.4"/>')
    for x, y in nodes:
        body.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r.randint(5, 10)}" fill="#0b0b0c" stroke="#8c8c92" stroke-width="1.6"/>')
    body.append(f'<circle cx="{cx}" cy="{cy}" r="22" fill="#f2f2f0"/>')
    # transcript lines
    for i, wd in enumerate((220, 180, 240, 150, 200)):
        y = 110 + i * 56
        body.append(f'<rect x="60" y="{y}" width="{wd}" height="26" rx="13" fill="{"#2a2a30" if i % 2 else "#3d3d44"}"/>')
        body.append(f'<circle cx="{60 + 16}" cy="{y + 13}" r="4" fill="#9a9aa0"/>')
    return wrap(w, h, "".join(body))


def ondeck():
    w, h = 800, 500
    body = []
    for i in range(6):
        y = 60 + i * 66
        hi = i == 2
        body.append(f'<rect x="{150 if hi else 190}" y="{y}" width="{500 if hi else 420}" height="52" rx="14" fill="{"#f2f2f0" if hi else "#18181b"}" stroke="#34343a"/>')
        col = "#0b0b0c" if hi else "#5a5a60"
        body.append(f'<rect x="{176 if hi else 216}" y="{y + 14}" width="{150 if hi else 110}" height="8" rx="4" fill="{col}"/>')
        body.append(f'<rect x="{176 if hi else 216}" y="{y + 30}" width="{90 if hi else 70}" height="6" rx="3" fill="{col}" opacity=".5"/>')
        body.append(f'<circle cx="{620 if hi else 590}" cy="{y + 26}" r="9" fill="none" stroke="{col}" stroke-width="1.6"/>')
    return wrap(w, h, "".join(body))


# ---------- About (1600 x 1000) ----------
def about():
    r = random.Random(7)
    w, h = 1600, 1000
    body = []
    for k in range(26):
        rad = 40 + k * 34
        body.append(f'<circle cx="800" cy="520" r="{rad}" fill="none" stroke="#{"3a3a41" if k % 3 else "5a5a62"}" stroke-width="{1.2 if k % 3 else 1.8}" opacity="{max(.12, 1 - k / 28):.2f}"/>')
    for i in range(36):
        a = i / 36 * math.tau
        body.append(f'<line x1="{800 + math.cos(a) * 60:.0f}" y1="{520 + math.sin(a) * 60:.0f}" x2="{800 + math.cos(a) * 900:.0f}" y2="{520 + math.sin(a) * 900:.0f}" stroke="#26262b" stroke-width="1"/>')
    for _ in range(90):
        body.append(f'<circle cx="{r.uniform(0, w):.0f}" cy="{r.uniform(0, h):.0f}" r="{r.uniform(.8, 2.4):.1f}" fill="#f2f2f0" opacity="{r.uniform(.15, .7):.2f}"/>')
    return wrap(w, h, "".join(body))


# ---------- Focus cards (600 x 900) ----------
def focus_ml():
    r = random.Random(11)
    layers = [4, 6, 6, 3]
    xs = [110, 250, 390, 510]
    body, coords = [], []
    for li, n in enumerate(layers):
        col = [(xs[li], 450 + (j - (n - 1) / 2) * 90) for j in range(n)]
        coords.append(col)
    for a, b in zip(coords, coords[1:]):
        for (x1, y1) in a:
            for (x2, y2) in b:
                body.append(f'<line x1="{x1}" y1="{y1:.0f}" x2="{x2}" y2="{y2:.0f}" stroke="#34343a" stroke-width="1"/>')
    for col in coords:
        for (x, y) in col:
            body.append(f'<circle cx="{x}" cy="{y:.0f}" r="13" fill="#0b0b0c" stroke="#f2f2f0" stroke-width="1.6"/>')
    return wrap(600, 900, "".join(body))


def focus_hw():
    body = ['<rect x="190" y="320" width="220" height="260" rx="14" fill="#141416" stroke="#f2f2f0" stroke-width="2"/>',
            '<rect x="235" y="365" width="130" height="170" rx="8" fill="none" stroke="#5a5a62" stroke-width="1.6"/>',
            '<circle cx="300" cy="450" r="30" fill="#f2f2f0"/>']
    for i in range(7):
        y = 345 + i * 36
        body.append(f'<line x1="150" y1="{y}" x2="190" y2="{y}" stroke="#f2f2f0" stroke-width="3"/><line x1="410" y1="{y}" x2="450" y2="{y}" stroke="#f2f2f0" stroke-width="3"/>')
        body.append(f'<polyline points="150,{y} 90,{y} 90,{y + 30 if i % 2 else y - 30} 30,{y + 30 if i % 2 else y - 30}" fill="none" stroke="#34343a" stroke-width="1.6"/>')
        body.append(f'<polyline points="450,{y} 510,{y} 510,{y - 30 if i % 2 else y + 30} 570,{y - 30 if i % 2 else y + 30}" fill="none" stroke="#34343a" stroke-width="1.6"/>')
    return wrap(600, 900, "".join(body))


def focus_web():
    body = ['<rect x="70" y="260" width="460" height="380" rx="18" fill="#141416" stroke="#f2f2f0" stroke-width="2"/>',
            '<line x1="70" y1="316" x2="530" y2="316" stroke="#34343a" stroke-width="1.6"/>']
    for i, x in enumerate((100, 124, 148)):
        body.append(f'<circle cx="{x}" cy="288" r="6" fill="{"#f2f2f0" if i == 0 else "#4a4a52"}"/>')
    body.append('<rect x="100" y="350" width="240" height="24" rx="6" fill="#f2f2f0"/>')
    for i, wd in enumerate((380, 340, 300)):
        body.append(f'<rect x="100" y="{400 + i * 28}" width="{wd}" height="10" rx="5" fill="#3a3a41"/>')
    body.append('<rect x="100" y="510" width="170" height="100" rx="10" fill="none" stroke="#5a5a62"/><rect x="290" y="510" width="170" height="100" rx="10" fill="none" stroke="#5a5a62"/>')
    return wrap(600, 900, "".join(body))


def focus_design():
    body = []
    for k, (x, y, r) in enumerate(((240, 400, 150), (360, 470, 150), (300, 560, 150))):
        body.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="none" stroke="{"#f2f2f0" if k == 0 else "#6a6a72"}" stroke-width="{2 if k == 0 else 1.5}"/>')
    for i in range(8):
        body.append(f'<line x1="60" y1="{250 + i * 60}" x2="540" y2="{250 + i * 60}" stroke="#1f1f23"/>')
    body.append('<rect x="260" y="470" width="80" height="80" fill="#f2f2f0" opacity=".9"/>')
    return wrap(600, 900, "".join(body))


# ---------- Photo placeholder (portrait slot) ----------
def photo_placeholder():
    body = (
        '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">'
        '<stop offset="0" stop-color="#f2f2f0"/><stop offset="1" stop-color="#4a4a50"/></linearGradient></defs>'
        '<ellipse cx="300" cy="280" rx="118" ry="140" fill="url(#g)"/>'
        '<path d="M40 760 C40 560 160 470 300 470 C440 470 560 560 560 760 Z" fill="url(#g)"/>'
        '<text x="300" y="650" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="3" fill="#0b0b0c">ADD YOUR PHOTO</text>'
        '<text x="300" y="684" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="#0b0b0c" opacity=".7">assets/photo.png</text>'
    )
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 760" width="600" height="760">{body}</svg>'


if __name__ == "__main__":
    save("projects/trojan.svg", trojan())
    save("projects/gastric.svg", gastric())
    save("projects/exoplanet.svg", exoplanet())
    save("projects/hermes.svg", hermes())
    save("projects/ondeck.svg", ondeck())
    save("about-art.svg", about())
    save("focus/ml.svg", focus_ml())
    save("focus/hardware.svg", focus_hw())
    save("focus/web.svg", focus_web())
    save("focus/design.svg", focus_design())
    save("photo-placeholder.svg", photo_placeholder())
    print("Artwork generated in assets/")
