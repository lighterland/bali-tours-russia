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
        '<path d="M21 34a15 15 0 0 1 30 0" stroke-width="2.2"/>'
        '<path d="M12 38c8-3 16-3 24 0s16 3 24 0" stroke-width="2"/>'
        '<path d="M15 44c7-3 14-3 21 0s14 3 21 0" stroke-width="1.65"/>'
        '<path d="M36 5v7M23 9l3.5 6M49 9l-3.5 6M14 18l6 3.5M58 18l-6 3.5M10 30h7M62 30h-7" stroke-width="1.65"/>'
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

