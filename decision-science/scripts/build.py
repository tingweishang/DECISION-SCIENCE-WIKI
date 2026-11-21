"""Build public Wiki data from reviewed notes and privately extracted PDF pages."""
import hashlib
import json
from pathlib import Path
import sys

root = Path(__file__).resolve().parents[1]
pages = json.loads(Path(sys.argv[1]).read_text())
sources = Path(sys.argv[2])
expected = [8, 14, 28, 22, 14, 14]
assert [len(group) for group in pages] == expected, "Unexpected PDF page counts"
manifest = []
for i, group in enumerate(pages, 1):
    assert [page["page"] for page in group] == list(range(1, len(group)+1))
    assert all(page["text"].strip() for page in group)
    pdf = sources / f"Lecture {i}.pdf"
    manifest.append(dict(lecture=i, pages=len(group), sha256=hashlib.sha256(pdf.read_bytes()).hexdigest()))

entries = []
for line in (root / 'knowledge.tsv').read_text().splitlines():
    slug, lecture, span, title, keywords, answer, formula = line.split('|')
    lecture = int(lecture)
    start, end = map(int, span.split('-'))
    assert 1 <= start <= end <= expected[lecture-1], (slug, span)
    entries.append(dict(id=slug, lecture=lecture, start=start, end=end,
                        title=title, keywords=keywords, answer=answer, formula=formula))
assert len({entry['id'] for entry in entries}) == len(entries)
assert {entry['lecture'] for entry in entries} == set(range(1, 7))
(root / 'docs/data.js').write_text('window.wikiData = ' + json.dumps(dict(sources=manifest, entries=entries), ensure_ascii=False, indent=2) + ';\n')
print(f'PASS {len(manifest)} PDFs, {sum(expected)} extracted pages, {len(entries)} reviewed entries')
