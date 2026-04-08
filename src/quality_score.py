import pandas as pd
from tqdm import tqdm
from sentence_transformers import SentenceTransformer, util
import re
import os

# Load lightweight model
model = SentenceTransformer('all-MiniLM-L6-v2')

# ----------- PARSER -----------
def parse_reviews(file_path, limit=None):
    reviews = []
    review = {}

    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()

            if line == "":
                if review:
                    reviews.append(review)
                    review = {}
                    if limit and len(reviews) >= limit:
                        break
                continue

            key, value = line.split(":", 1)
            review[key.strip()] = value.strip()

    return pd.DataFrame(reviews)


# ----------- FEATURES -----------

def semantic_score(text, title):
    emb1 = model.encode(text, convert_to_tensor=True)
    emb2 = model.encode(title, convert_to_tensor=True)
    return float(util.cos_sim(emb1, emb2))


def helpfulness_score(helpfulness):
    try:
        num, den = map(int, helpfulness.split('/'))
        return num / den if den != 0 else 0
    except:
        return 0


def reasoning_score(text):
    length = len(text.split())
    sentences = len(re.split(r'[.!?]', text))

    # normalize
    length_score = min(length / 100, 1)
    sentence_score = min(sentences / 5, 1)

    return 0.6 * length_score + 0.4 * sentence_score


# ----------- MAIN SCORE -----------

def compute_quality(df):
    scores = []

    for _, row in tqdm(df.iterrows(), total=len(df)):
        text = row.get("review/text", "")
        title = row.get("product/title", "")
        helpfulness = row.get("review/helpfulness", "0/0")

        S = semantic_score(text, title)
        G = helpfulness_score(helpfulness)
        R = reasoning_score(text)

        Q = 0.4*S + 0.35*G + 0.25*R

        scores.append(Q)

    df["quality_score"] = scores
    return df


# ----------- RUN -----------

if __name__ == "__main__":
    df = parse_reviews("../Data/Electronics.txt", limit=20000)  # LIMIT for testing

    df = compute_quality(df)

    os.makedirs("../output", exist_ok=True)
    df.to_csv("../output/quality_scores.csv", index=False)
    print("Done!")