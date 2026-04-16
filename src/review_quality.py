import pandas as pd
import numpy as np
import re
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import nltk
from nltk.tokenize import sent_tokenize

import nltk
nltk.download('punkt')
nltk.download('punkt_tab')

# Load model once
model = SentenceTransformer('all-MiniLM-L6-v2')


# -----------------------------
# Load Data (TXT parser)
# -----------------------------
def load_data(file_path, limit=20000):
    data = []
    review = {}

    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()

            if not line:
                if review:
                    data.append(review)
                    review = {}
                    if limit is not None and len(data) >= limit:
                        break
                continue

            # Need to handle lines without a colon gracefully
            if ":" in line:
                key, value = line.split(":", 1)
                review[key.strip()] = value.strip()

    if review and (limit is None or len(data) < limit):
        data.append(review)

    return pd.DataFrame(data)


# -----------------------------
# Cleaning
# -----------------------------
def clean_text(text):
    text = str(text)
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'[^a-zA-Z0-9., ]', '', text)
    return text.strip()


# -----------------------------
# Helpfulness
# -----------------------------
def parse_helpfulness(helpfulness):
    try:
        helpful, total = helpfulness.split('/')
        return int(helpful) / (int(total) + 1)
    except:
        return 0.0


# -----------------------------
# Semantic Scores
# -----------------------------
def compute_semantic_scores(text, summary, title):
    sentences = sent_tokenize(text)
    if len(sentences) == 0:
        return 0, 0, 0

    sent_embs = model.encode(sentences)

    # Diversity
    sim_matrix = cosine_similarity(sent_embs)
    diversity = 1 - np.mean(sim_matrix)

    # Summary consistency
    text_emb = model.encode(text)
    summary_emb = model.encode(summary)
    consistency = cosine_similarity([text_emb], [summary_emb])[0][0]

    # Product relevance
    title_emb = model.encode(title)
    relevance = cosine_similarity([text_emb], [title_emb])[0][0]

    return diversity, consistency, relevance


# -----------------------------
# Structural Score
# -----------------------------
def compute_structural_score(text):
    words = text.split()
    sentences = sent_tokenize(text)

    length_score = min(len(words) / 100, 1)
    sentence_score = min(len(sentences) / 10, 1)

    return 0.5 * length_score + 0.5 * sentence_score


# -----------------------------
# Label Mapping
# -----------------------------
def quality_label(score):
    if score >= 0.8:
        return "Excellent"
    elif score >= 0.6:
        return "Good"
    elif score >= 0.3:
        return "Average"
    else:
        return "Low"


# -----------------------------
# MAIN EXECUTION
# -----------------------------
def main():

    print("Loading dataset...")
    df = load_data("../Data/Electronics.txt")

    scores = []
    labels = []

    print("Computing quality scores... (this may take time ⏳)")

    for _, row in df.iterrows():

        text = clean_text(row.get('review/text', ''))
        summary = clean_text(row.get('review/summary', ''))
        title = clean_text(row.get('product/title', ''))

        helpfulness = parse_helpfulness(row.get('review/helpfulness', '0/0'))

        diversity, consistency, relevance = compute_semantic_scores(
            text, summary, title
        )

        semantic_score = (diversity + relevance) / 2
        structural_score = compute_structural_score(text)

        final_score = (
            0.4 * semantic_score +
            0.3 * helpfulness +
            0.2 * structural_score +
            0.1 * consistency
        )

        scores.append(final_score)
        labels.append(quality_label(final_score))

    df['quality_score'] = scores
    df['quality_label'] = labels

    # Normalize
    df['quality_score'] = (
        df['quality_score'] - df['quality_score'].min()
    ) / (df['quality_score'].max() - df['quality_score'].min())

    print("Saving output...")
    df.to_csv("../output/review_quality_scores.csv", index=False)

    print("Done ✅ Output saved at ../output/review_quality_scores.csv")


if __name__ == "__main__":
    main()