from src.load_data import load_sample_data
from src.preprocess import preprocess
from src.build_graph import build_product_reviews, build_user_graph, build_bipartite_graph
from src.pagerank import compute_pagerank

import pandas as pd
import os

def main():
    file_path = "data/Electronics.txt"

    # Step 1: Load data
    df = load_sample_data(file_path, max_records=20000)

    # Step 2: Preprocess
    df = preprocess(df)

    print("After preprocessing:", df.shape)

    # Step 3: Build Bipartite Graph (from SS1)
    B = build_bipartite_graph(df)
    print("--- Bipartite Graph (User to Product) ---")
    print("Total nodes:", B.number_of_nodes())
    print("Total edges:", B.number_of_edges())

    # Step 4: Build product reviews & Projection Graph (from SS2)
    product_reviews = build_product_reviews(df)
    G = build_user_graph(product_reviews)

    print("--- Projection Graph (User to User) ---")
    print("Graph Nodes:", G.number_of_nodes())
    print("Graph Edges:", G.number_of_edges())

    # Step 5: PageRank
    pagerank_scores = compute_pagerank(G)

    # Step 6: Save output
    pr_df = pd.DataFrame({
        "userId": list(pagerank_scores.keys()),
        "pagerank": list(pagerank_scores.values())
    })
    os.makedirs("output", exist_ok=True)
    pr_df.to_csv("output/submission.csv", index=False)

    print("Saved to output/submission.csv")


if __name__ == "__main__":
    main()