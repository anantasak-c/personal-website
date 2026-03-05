import sys
import zipfile
import html
from pathlib import Path
from xml.etree import ElementTree as ET

USAGE = "Usage: python extract_docx.py <path-to-docx>"


def extract_text(docx_path: Path) -> str:
    with zipfile.ZipFile(docx_path) as zf:
        xml_bytes = zf.read("word/document.xml")

    root = ET.fromstring(xml_bytes)
    namespace = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}

    paragraphs = []
    for para in root.findall(".//w:p", namespace):
        texts = [node.text for node in para.findall(".//w:t", namespace) if node.text]
        if texts:
            paragraphs.append("".join(texts))

    joined = "\n\n".join(html.unescape(p.strip()) for p in paragraphs if p.strip())
    return joined


def main():
    if len(sys.argv) < 2:
        print(USAGE)
        sys.exit(1)

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"File not found: {path}")
        sys.exit(1)

    try:
        text = extract_text(path)
        print(text)
    except Exception as exc:
        print(f"Failed to extract text: {exc}")
        sys.exit(1)


if __name__ == "__main__":
    main()
