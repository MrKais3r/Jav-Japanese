import os, re, json

base_dir = "/Users/akshit/Documents/GitHub/Jav-Japanese/sourcesite/Genki edition 3/lessons-3rd/lesson-1"
out_data = {}

def parse_mc(text):
    """Extract multiple-choice QA pairs from a Genki HTML file using simple line scanning."""
    results = []
    i = 0
    lines = text.splitlines()
    n = len(lines)

    while i < n:
        line = lines[i]

        # Look for a question line
        q_match = re.search(r"question\s*:\s*'(.*?)'|question\s*:\s*\"(.*?)\"", line)
        if q_match:
            question = (q_match.group(1) or q_match.group(2) or "").replace("\\'", "'").replace('\\"', '"')

            # Now scan ahead for the answers block (within max 20 lines)
            answers = []
            correct = None
            j = i + 1
            in_answers = False
            while j < min(i + 25, n):
                aline = lines[j]
                if "answers" in aline:
                    in_answers = True
                if in_answers:
                    # Extract all quoted strings from this line
                    for m in re.finditer(r"['\"]([^'\"]+)['\"]", aline):
                        val = m.group(1)
                        if val.startswith("A") and correct is None:
                            correct = val[1:]
                            answers.append(val[1:])
                        else:
                            answers.append(val)
                    # End of answers block
                    if "]" in aline and in_answers:
                        break
                j += 1

            if question and correct and len(answers) >= 2:
                results.append({
                    "id": len(results) + 1,
                    "character": question,
                    "prompt": "Choose the correct answer:",
                    "options": answers,
                    "answer": correct
                })

        i += 1

    return results if results else None


for f in sorted(os.listdir(base_dir)):
    p = os.path.join(base_dir, f, "index.html")
    if os.path.exists(p) and ("grammar" in f or "culture" in f):
        with open(p, "r", encoding="utf-8") as file:
            mc = parse_mc(file.read())
            if mc:
                key = f"lesson1_{f.replace('-', '_')}"
                out_data[key] = mc
                print(f"  {key}: {len(mc)} questions")

with open("genki_parser.json", "w", encoding="utf-8") as jf:
    json.dump(out_data, jf, indent=2, ensure_ascii=False)

print(f"\nDone. Parsed {len(out_data)} sections.")
