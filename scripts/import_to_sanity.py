"""
import_to_sanity.py
-------------------
Reads DOCX files from C:/Users/anant/Downloads/my blog
and imports them as blog posts into Sanity via the Mutations API.

Usage:
    python scripts/import_to_sanity.py

Requirements:
    pip install requests python-docx
"""

import re
import sys
import uuid
import json
import zipfile
import datetime
import requests
from pathlib import Path
from xml.etree import ElementTree as ET

# ────────────────────────────────────────────────────────────
# CONFIG — ใส่ค่าจริงของคุณ
# ────────────────────────────────────────────────────────────
PROJECT_ID = "h12wjpdc"          # Sanity project ID
DATASET    = "production"        # Sanity dataset
# API token ที่มี write permission — ไปสร้างที่:
# https://www.sanity.io/manage → project → API → Tokens → Add API token (Editor)
API_TOKEN  = "skhGVDH8vKPKGw3DybDFxvpDZDSkE8KXjacK4nMkwhuSQzMHaWei5iAqrRwsjovnQMqFay4edgWbLq2MiY59A02CXIxzmpgIMwh1AgKJc9G6C5VAdjXaAb1mvQzGpLrETwnPz2fC3Q7TItwL6UnOA6kXrBCsZ9l30xCmQ1P3cdGmc5EYukpR"

INPUT_DIR  = Path(r"C:/Users/anant/Downloads/my blog")
# ────────────────────────────────────────────────────────────

NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
SANITY_URL = f"https://{PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/{DATASET}"


def extract_paragraphs(docx_path: Path) -> list[str]:
    """Extract non-empty paragraph strings from a DOCX file."""
    with zipfile.ZipFile(docx_path) as zf:
        xml_bytes = zf.read("word/document.xml")
    root = ET.fromstring(xml_bytes)
    paragraphs = []
    for para in root.findall(".//w:p", NS):
        texts = [node.text for node in para.findall(".//w:t", NS) if node.text]
        line = "".join(texts).strip()
        if line:
            paragraphs.append(line)
    return paragraphs


def paragraphs_to_portable_text(paragraphs: list[str]) -> list[dict]:
    """Convert plain paragraph strings into Sanity Portable Text blocks."""
    blocks = []
    for para in paragraphs:
        blocks.append({
            "_type": "block",
            "_key": uuid.uuid4().hex[:12],
            "style": "normal",
            "markDefs": [],
            "children": [{
                "_type": "span",
                "_key": uuid.uuid4().hex[:12],
                "marks": [],
                "text": para,
            }],
        })
    return blocks


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-") or "post"


def estimate_read_time(paragraphs: list[str]) -> str:
    words = sum(len(p.split()) for p in paragraphs)
    minutes = max(3, round(words / 180))
    return f"{minutes} min read"


def build_description(paragraphs: list[str]) -> str:
    full = " ".join(paragraphs)
    return (full[:280] + "…") if len(full) > 280 else full


def build_tags(title: str) -> list[str]:
    """Auto-detect simple tags from title keywords."""
    title_lower = title.lower()
    tags = []
    if any(k in title_lower for k in ["ai", "notebooklm", "n8n", "bot", "automation"]):
        tags.append("AI")
    if any(k in title_lower for k in ["chat", "chatbot", "แอดมิน", "sme"]):
        tags.append("Automation")
    if any(k in title_lower for k in ["คริปโต", "crypto", "navigator", "trade", "เทรด"]):
        tags.append("Crypto")
    if any(k in title_lower for k in ["รายรับ", "รายจ่าย", "การเงิน", "n8n"]):
        tags.append("Finance")
    if not tags:
        tags.append("Blog")
    return tags


def import_post(title: str, paragraphs: list[str]) -> dict:
    slug = slugify(title)
    safe_id = "imported-" + uuid.uuid4().hex[:16]
    doc = {
        "_type": "post",
        "_id": safe_id,
        "title": title,
        "slug": {"_type": "slug", "current": slug},
        "description": build_description(paragraphs),
        "tags": build_tags(title),
        "readTime": estimate_read_time(paragraphs),
        "publishedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "body": paragraphs_to_portable_text(paragraphs),
    }

    mutation = {"mutations": [{"createIfNotExists": doc}, {"patch": {"id": safe_id, "set": {k: v for k, v in doc.items() if k != "_id"}}}]}
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_TOKEN}",
    }
    resp = requests.post(SANITY_URL, json=mutation, headers=headers)
    return resp


def main():
    if API_TOKEN == "YOUR_SANITY_WRITE_TOKEN":
        print("❌  กรุณาแก้ API_TOKEN ในไฟล์นี้ก่อนรัน")
        print("   ไปที่ https://www.sanity.io/manage → project → API → Tokens")
        sys.exit(1)

    docx_files = sorted(INPUT_DIR.glob("*.docx"))
    if not docx_files:
        print(f"❌  ไม่พบไฟล์ .docx ใน {INPUT_DIR}")
        sys.exit(1)

    for docx in docx_files:
        print(f"📄  กำลังประมวลผล: {docx.name}")
        try:
            paragraphs = extract_paragraphs(docx)
        except (zipfile.BadZipFile, KeyError) as e:
            print(f"   ⚠️  ข้ามไฟล์นี้: {e}")
            continue

        resp = import_post(docx.stem, paragraphs)

        if resp.status_code in (200, 201):
            print(f"   ✅  นำเข้าสำเร็จ: {docx.stem}")
        else:
            print(f"   ❌  ล้มเหลว ({resp.status_code}): {resp.text[:200]}")

    print("\n🎉  เสร็จแล้ว! เปิด Sanity Studio เพื่อตรวจสอบบทความ")


if __name__ == "__main__":
    main()
