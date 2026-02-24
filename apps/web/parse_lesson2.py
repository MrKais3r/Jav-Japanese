import re
import json

base_path = '/Users/akshit/Documents/GitHub/Jav-Japanese/sourcesite/Genki edition 3/lessons-3rd/lesson-2'
sections = ['grammar-1', 'grammar-2', 'grammar-3', 'grammar-4', 'grammar-5', 'grammar-6', 'grammar-7', 'grammar-8', 'grammar-9', 'grammar-10', 'culture-1']

results = {}

def parse_html(file_path, sec):
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()

    mcqs = []
    
    # check for table
    table_match = re.search(r'(<table.*?</table>)', text, re.DOTALL)
    table_context = None
    if table_match:
        table_html = table_match.group(1)
        # very basic headers extraction
        headers = []
        rows = []
        # this is just to flag that we have a table, we can extract properly later if needed.
        # But wait, we can just use the audit logic to see what has tables.
        table_context = True 

    # Look for questions
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        q_match = re.search(r"question\s*:\s*(.*)", line)
        if q_match:
            raw_q = q_match.group(1).strip()
            
            # handle variables e.g. q + '...' or a + '...'
            var_match = re.match(r"^(\w+)\s*\+\s*'([^']*)'", raw_q)
            if var_match:
                prefix = "Q: " if var_match.group(1).startswith("q") else ("A: " if var_match.group(1).startswith("a") else "")
                question = prefix + var_match.group(2)
            else:
                question = raw_q.strip("',\"").replace("\\'", "'")
                
            question = question.replace("{!IMG|", "[Image: ").replace("}", "]").replace("<br>", " | ")
            
            answers = []
            correct = None
            j = i + 1
            in_answers = False
            while j < min(i + 25, len(lines)):
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

            if question and correct:
                mcqs.append({
                    "id": len(mcqs) + 1,
                    "prompt": "Choose the correct answer:",
                    "character": question,
                    "options": answers,
                    "answer": correct
                })
            i = j
        else:
            i += 1
            
    return mcqs, table_context

for sec in sections:
    try:
        mcqs, has_table = parse_html(f"{base_path}/{sec}/index.html", sec)
        results[sec] = {"mcqs": mcqs, "has_table": has_table}
    except Exception as e:
        print(f"Error in {sec}: {e}")

for sec in results:
    print(f"{sec}: {len(results[sec]['mcqs'])} MCQs, has_table: {results[sec]['has_table']}")

with open('l2_audit.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

