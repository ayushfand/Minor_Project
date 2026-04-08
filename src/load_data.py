import pandas as pd

def load_sample_data(file_path, max_records=20000):
    records = []
    current = {}
    count = 0

    with open(file_path, 'r', encoding='latin-1') as f:
        for line in f:
            line = line.strip()

            if not line:
                if current:
                    records.append(current)
                    current = {}
                    count += 1

                    if count >= max_records:
                        break
                continue

            if ":" in line:
                key, value = line.split(":", 1)
                current[key.strip()] = value.strip()

    if current and count < max_records:
        records.append(current)

    print("Loaded records:", len(records))
    return pd.DataFrame(records)