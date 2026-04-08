# Minor Project: Product Review Analysis & Graph Modeling

This project analyzes product review datasets (like Amazon product reviews) to evaluate user influence via network graph theory and to calculate the content quality of individual reviews using Natural Language Processing.

## Project Team
* **Project Guidance:** Supriyo Mandal 
* **Working Students:** Ayush Fand and Jai Chakrawar

## What We Have Done So Far
This codebase is divided into two major logical branches: **Graph Modeling** and **Text Quality Assessment**.

### 1. Network Graph & Centrality (`main.py`)
This pipeline focuses on the structural patterns of how users buy and review items to determine who is influencing whom.

* **Bipartite Graph (User to Product):** We first parse the dataset and map direct relationships. If a user reviews a product, they are connected. This gives us our baseline graph structure (`SS1`).
* **One-Mode Projection Graph (User to User):** We group the data by products and sort by time. By isolating the timeline, we project the graph structure entirely onto the users. If User A reviews a product *before* User B reviews the same product, an edge is created: `User A -> User B`. This represents a chronological chain of influence (`SS2`).
* **PageRank Centrality:** We apply Google's PageRank algorithm to this Projection Graph. Users who consistently review products early (and thus have many outgoing "influence" edges to subsequent buyers) receive high centrality scores, marking them as influential trendsetters. Results are outputted to `output/submission.csv`.

### 2. Review Quality Score (`src/quality_score.py`)
This is an independent analysis pipeline focused entirely on the written content metric, evaluating *how good* the reviews actually are. We compute an overarching `Quality Score` out of three weighted metrics:
* **Semantic Score (40%):** We use a Machine Learning Embedding model (`SentenceTransformer`) to calculate the cosine similarity between the review text and the product title, ensuring the review stays on topic.
* **Helpfulness Score (35%):** Using the dataset's native helpfulness ratio.
* **Reasoning Score (25%):** Using NLP logic to measure sentence length and grammatical structural volume, ensuring the review is elaborate rather than a short stub.

Computed scores are then evaluated against the dataset and exported to `output/quality_scores.csv`.

## Setup & Running
1. Make sure required libraries are installed:
   ```bash
   pip install -r requirements.txt
   ```
2. To run the Graph Modeling (PageRank calculation):
   ```bash
   python main.py
   ```
3. To run the Review Quality Score calculation:
   ```bash
   python src/quality_score.py
   ```
