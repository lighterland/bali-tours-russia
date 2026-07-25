from pathlib import Path
import sys

sys.path.insert(0, r"C:\tmp\bali-logo-fonttools")

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "design" / "vendor"
GEORGIA = TTFont(r"C:\Windows\Fonts\georgia.ttf")
GEORGIA_ITALIC = TTFont(r"C:\Windows\Fonts\georgiai.ttf")
ARIAL_BOLD = TTFont(r"C:\Windows\Fonts\arialbd.ttf")

COLOURS = {
    "gold": "#E8C88E",
    "white": "#FFFFFF",
    "forest": "#071510",
}


def text_advance(font: TTFont, text: str) -> int:
    cmap = font.getBestCmap()
    metrics = font["hmtx"].metrics
    return sum(metrics[cmap[ord(char)]][0] for char in text)


def outlined_text(font: TTFont, text: str, x: float, baseline: float, size: float, fill: str) -> str:
    cmap = font.getBestCmap()
    metrics = font["hmtx"].metrics
    units = font["head"].unitsPerEm
    cursor = 0
    paths: list[str] = []
    for char in text:
        glyph_name = cmap[ord(char)]
        glyph_set = font.getGlyphSet()
        pen = SVGPathPen(glyph_set)
        glyph_set[glyph_name].draw(pen)
        commands = pen.getCommands()
        if commands:
            paths.append(f'<path d="{commands}" transform="translate({cursor} 0)"/>')
        cursor += metrics[glyph_name][0]
    scale = size / units
    return (
        f'<g fill="{fill}" transform="translate({x:.3f} {baseline:.3f}) '
        f'scale({scale:.7f} {-scale:.7f})">{"".join(paths)}</g>'
    )


def centered_line(font: TTFont, text: str, y: float, max_width: float, size: float, fill: str) -> str:
    width = text_advance(font, text) * size / font["head"].unitsPerEm
    if width > max_width:
        size *= max_width / width
        width = max_width
    return outlined_text(font, text, (280 - width) / 2, y, size, fill)


def sunrise_geometry(colour: str) -> str:
    return (
        f'<g fill="none" stroke="{colour}" stroke-linecap="round" stroke-linejoin="round">'
        '<path d="M20 36a16 16 0 0 1 32 0" stroke-width="2.2"/>'
        '<path d="M8 36h56" stroke-width="2"/>'
        '<path d="M19.58 31.6 9.92 29.01M21.28 27.5 12.62 22.5M23.98 23.98 16.91 16.91M27.5 21.28 22.5 12.62M31.6 19.58 29.01 9.92M36 19V9M40.4 19.58 42.99 9.92M44.5 21.28 49.5 12.62M48.02 23.98 55.09 16.91M50.72 27.5 59.38 22.5M52.42 31.6 62.08 29.01" stroke-width="1.65"/>'
        '</g>'
    )


def build_front(colour_name: str, colour: str) -> None:
    lines = [
        centered_line(GEORGIA, "Бали", 54, 260, 61, "#FFFFFF" if colour_name == "gold" else colour),
        centered_line(GEORGIA, "ближе,", 111, 260, 61, "#FFFFFF" if colour_name == "gold" else colour),
        centered_line(GEORGIA_ITALIC, "чем", 169, 260, 63, colour),
        centered_line(GEORGIA_ITALIC, "кажется.", 226, 260, 63, colour),
    ]
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" width="280mm" height="240mm" viewBox="0 0 280 240">'
        + "".join(lines)
        + '</svg>'
    )
    (OUT / f"uniform-front-slogan-outline-{colour_name}.svg").write_text(svg, encoding="utf-8")


def build_stacked(colour_name: str, colour: str) -> None:
    label = "BALI CLOSER"
    units = ARIAL_BOLD["head"].unitsPerEm
    label_size = 8.8
    width = text_advance(ARIAL_BOLD, label) * label_size / units
    wordmark = outlined_text(ARIAL_BOLD, label, (90 - width) / 2, 59, label_size, colour)
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" width="90mm" height="65mm" viewBox="0 0 90 65">'
        f'<g transform="translate(18 0) scale(.75)">{sunrise_geometry(colour)}</g>{wordmark}</svg>'
    )
    (OUT / f"uniform-back-logo-outline-{colour_name}.svg").write_text(svg, encoding="utf-8")


OUT.mkdir(parents=True, exist_ok=True)
for name, value in COLOURS.items():
    build_front(name, value)
    build_stacked(name, value)
