import json
import html
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

INPUT_DIR = Path(r"C:/Users/anant/Downloads/my blog")
OUTPUT_PATH = Path("blog-posts.json")
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}


def extract_text(docx_path: Path) -> str:
    with zipfile.ZipFile(docx_path) as zf:
        xml_bytes = zf.read("word/document.xml")
    root = ET.fromstring(xml_bytes)
    paragraphs = []
    for para in root.findall(".//w:p", NS):
        texts = [node.text for node in para.findall(".//w:t", NS) if node.text]
        if texts:
            paragraphs.append("".join(texts))
    return "\n".join(html.unescape(p.strip()) for p in paragraphs if p.strip())


def slugify(text: str) -> str:
    import re

    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-") or "post"


def main():
    posts = []
    for docx in sorted(INPUT_DIR.glob("*.docx")):
        try:
            content = extract_text(docx)
        except zipfile.BadZipFile:
            print(f"Skipping non-DOCX file: {docx.name}")
            continue

        plain = " ".join(content.split())
        excerpt = plain[:320] + ("…" if len(plain) > 320 else "")
        posts.append(
            {
                "title": docx.stem,
                "slug": slugify(docx.stem),
                "excerpt": excerpt,
                "wordCount": len(plain.split()),
            }
        )

    OUTPUT_PATH.write_text(json.dumps(posts, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(posts)} posts to {OUTPUT_PATH.resolve()}")


if __name__ == "__main__":
    main()
