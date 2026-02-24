import re, json

base = '/Users/akshit/Documents/GitHub/Jav-Japanese/sourcesite/Genki edition 3/lessons-3rd/lesson-1'

def parse_all_from_file(name):
    path = f'{base}/{name}/index.html'
    with open(path, 'r', encoding='utf-8') as fp:
        text = fp.read()
    
    results = []
    i = 0
    lines = text.splitlines()
    n = len(lines)

    while i < n:
        line = lines[i]
        q_match = re.search(r"question\s*:\s*(.*)", line)
        if q_match:
            raw_q = q_match.group(1).strip()
            # Handle variable-based questions: q + 'text' or a + 'text'
            var_match = re.match(r"^\w+\s*\+\s*'(.*?)'", raw_q)
            if var_match:
                question = var_match.group(1)
                # Determine if it's a Q-form or A-form based on prefix variable
                if raw_q.startswith("q "):
                    question = "Q: " + question
                elif raw_q.startswith("a "):
                    question = "A: " + question
            else:
                # Clean up literal question strings
                question = raw_q.strip("'\"").replace("\\'", "'")

            # Scan for answers block (within 20 lines)
            answers = []
            correct = None
            j = i + 1
            in_answers = False
            while j < min(i + 25, n):
                aline = lines[j]
                if 'answers' in aline:
                    in_answers = True
                if in_answers:
                    for m in re.finditer(r"'([^']+)'", aline):
                        val = m.group(1)
                        if val.startswith("A") and correct is None and len(val) > 1:
                            correct = val[1:]
                            answers.append(val[1:])
                        else:
                            answers.append(val)
                    if "]" in aline and in_answers:
                        break
                j += 1

            if question and correct and len(answers) >= 2:
                results.append({
                    "id": len(results) + 1,
                    "character": question.replace("{!IMG|", "[Clock Image ").replace("}", "]").replace("<br>", " | "),
                    "prompt": "Choose the correct answer:",
                    "options": answers,
                    "answer": correct
                })

        i += 1

    return results

# Audit all files
all_data = {}
for name in ['grammar-4', 'grammar-5', 'grammar-9']:
    data = parse_all_from_file(name)
    all_data[name] = data
    print(f"\n=== {name}: {len(data)} valid MCQs ===")
    for q in data:
        print(f"  [{q['id']}] Q: {q['character'][:60]}")
        print(f"       ✓ {q['answer'][:50]}")

with open('full_grammar_audit.json', 'w', encoding='utf-8') as f:
    json.dump(all_data, f, indent=2, ensure_ascii=False)

print("\nSaved to full_grammar_audit.json")
