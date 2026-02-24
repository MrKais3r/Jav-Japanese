import json

with open("genki_parser.json", "r", encoding="utf-8") as f:
    data = json.load(f)

out = []
for section_key, questions in sorted(data.items()):
    clean_qs = []
    for q in questions:
        char = q["character"].replace("\\'", "'").replace('\\"', '"').replace("\\\\", "").strip()
        # skip image-style references
        if "{!IMG" in char:
            continue
        clean_qs.append({
            "id": q["id"],
            "character": char,
            "prompt": q.get("prompt", "Choose the correct answer:"),
            "options": q["options"],
            "answer": q["answer"]
        })
    if clean_qs:
        out.append((section_key, clean_qs))

print(f"Sections to write: {len(out)}")
for k, v in out:
    print(f"  {k}: {len(v)} questions")
