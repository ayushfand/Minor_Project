# Who Speaks Matters — Reviewer-Aware Text Modeling for E-Commerce Sales Prediction

> **Minor Project · IIIT Bhopal · Dept. of CSE · 2026**

This project analyses Amazon product-review datasets to answer a single question: **does _who_ writes a review matter as much as _what_ they write?**  
We combine **Network Graph Centrality (PageRank)** with **NLP-based Review Quality Scoring (BERT / Sentence-Transformers)** to build a composite reviewer-influence metric and study its causal effect on product sales rank using a Two-Stage Least Squares (2SLS) regression framework.

---

## Project Team

| Role | Name |
|---|---|
| **Supervisor** | Dr. Supriyo Mandal |
| **Students** | Ayush Fand (23U02101) · Jai Chakkarwar (23U02102) |

---

## Key Features

- **Bipartite Graph Construction** — Users ↔ Products relationship from raw review data.
- **One-Mode Projection** — Chronological user → user influence graph (if User A reviews before User B on the same product, an edge A → B is created).
- **PageRank Centrality** — Identifies the most influential reviewers in the projected graph.
- **BERT-Based Review Quality** — Computes a weighted quality score per review using:
  - **Semantic Score (40 %)** — Sentence diversity via BERT embeddings.
  - **Helpfulness Score (30 %)** — Community vote ratio.
  - **Structural Score (20 %)** — Word / sentence count normalised.
  - **Consistency Score (10 %)** — Cosine similarity between summary and full review body.
- **Combined Score** — `Centrality × Quality` → a single 0–1 reviewer influence metric.
- **Visualisation** — Monthly trend plots (PageRank × Quality) for the top products, plus a verification export for manual checks.
- **Presentation Generator** — A Node.js script (`qwert.js`) that auto-generates a polished `.pptx` slide deck for the project using `pptxgenjs`.

---

## Folder Structure

```text
Minor_Project/
│
├── Data/                           # (Git-ignored) Place raw datasets here
│                                   #   e.g.  Data/Electronics.txt  (old TXT format)
│                                   #   or    dataset/Electronics.json  (new JSON-lines format)
│
├── output/                         # (Git-ignored) Auto-created at runtime
│   ├── submission.csv              #   PageRank scores per user
│   ├── review_quality_scores.csv   #   BERT quality scores per review
│   ├── product_value_over_time.png #   Monthly value trend plot
│   └── verification_data.csv       #   Raw merged data for manual verification
│
├── src/                            # Core Python modules
│   ├── load_data.py                #   JSON-lines dataset loader
│   ├── preprocess.py               #   Column mapping & cleaning
│   ├── build_graph.py              #   Bipartite graph + user projection
│   ├── pagerank.py                 #   PageRank computation & normalisation
│   ├── quality_score.py            #   Lightweight quality scorer (SentenceTransformer)
│   ├── bert.py                     #   Full BERT quality pipeline (diversity + consistency + relevance)
│   ├── plot_results.py             #   Merge scores & plot monthly product value trends
│   └── export_verification_data.py #   Export raw merged data for manual verification
│
├── main.py                         # Entry point — Graph Modelling (PageRank) pipeline
├── qwert.js                        # Node.js script to generate the project presentation (.pptx)
├── requirements.txt                # Python dependencies
├── package.json                    # Node.js dependencies (pptxgenjs)
├── .gitignore
└── README.md
```

---

## Dataset

The project uses the **Amazon Product Reviews** dataset (Electronics category).

| Format | Expected path |
|---|---|
| JSON-lines (`.json`) | Used by `main.py` and `src/bert.py` — one JSON object per line |
| Plain-text key-value (`.txt`) | Used by `src/quality_score.py` |

> **Download:** <https://nijianmo.github.io/amazon/index.html>  
> Place the file under a `Data/` or `dataset/` directory and update the path in `main.py` / `src/bert.py` accordingly.

---

## Setup & Installation

### 1. Python environment

```bash
# (Recommended) Create a virtual environment
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

# Install all Python dependencies
pip install -r requirements.txt
```

### 2. Node.js (only for presentation generation)

```bash
npm install
```

---

## Usage

### Graph Modelling — PageRank Pipeline

Builds the bipartite and projection graphs, computes PageRank, and saves results to `output/submission.csv`.

```bash
python main.py
```

### Review Quality — Lightweight Scorer

Uses `SentenceTransformer` to score reviews by semantic relevance, helpfulness, and reasoning depth. Outputs to `output/quality_scores.csv`.

```bash
python src/quality_score.py
```

### Review Quality — Full BERT Pipeline

Computes a richer quality score with diversity, consistency, and product relevance components. Outputs to `output/review_quality_scores.csv`.

```bash
python src/bert.py
```

### Plot Results

Merges PageRank scores with quality scores and plots the monthly average product value for the top-2 products.

```bash
python src/plot_results.py
```

### Export Verification Data

Exports the raw merged dataset (PageRank + quality) for the top-2 products so calculations can be verified manually.

```bash
python src/export_verification_data.py
```

### Generate Presentation

Creates a styled `.pptx` slide deck summarising the project.

```bash
node qwert.js
```

---

## Methodology Overview

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Load Amazon  │────▶│  Preprocess   │────▶│  Build Graph  │
│   Dataset     │     │   & Clean     │     │  (Bipartite)  │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                          ┌───────────────────────┤
                          ▼                       ▼
                  ┌──────────────┐       ┌──────────────┐
                  │  One-Mode    │       │ BERT Quality  │
                  │  Projection  │       │   Scoring     │
                  └──────┬───────┘       └──────┬───────┘
                         │                      │
                         ▼                      │
                  ┌──────────────┐              │
                  │   PageRank   │              │
                  │  Centrality  │              │
                  └──────┬───────┘              │
                         │                      │
                         └──────────┬───────────┘
                                    ▼
                           ┌──────────────┐
                           │   Combined   │
                           │  Score (0-1) │
                           └──────┬───────┘
                                  │
                                  ▼
                         ┌────────────────┐
                         │  2SLS Regress. │
                         │ + Latency Anal.│
                         └────────────────┘
```

---

## Results Highlights

- **NePS (reviewer influence) and review quality** peak their effect on sales rank at **2–4 months** post-review, confirming the latency hypothesis.
- The combined influence metric **outperforms** raw rating averages and sentiment scores alone.
- Feature importance varies by product category — digital cameras lean on reviewer influence, while cell phones shift toward sentiment in later months.

---

## Technologies Used

| Tool | Purpose |
|---|---|
| **Python 3.10+** | Core language |
| **Pandas / NumPy** | Data wrangling & numerical computation |
| **NetworkX** | Graph construction & PageRank |
| **Sentence-Transformers (HuggingFace)** | BERT sentence embeddings for semantic scoring |
| **Scikit-learn** | Cosine similarity, normalisation |
| **NLTK** | Sentence tokenisation |
| **Matplotlib / Seaborn** | Visualisation |
| **tqdm** | Progress bars |
| **PyTorch** | Backend for Sentence-Transformers |
| **pptxgenjs (Node.js)** | Automated presentation generation |

---

## References

1. Abbasimehr, H. et al. (2020). *Optimized LSTM model for demand forecasting.* Computers & Industrial Engineering, 143.  
2. Archak, N., Ghose, A., Ipeirotis, P.G. (2011). *Pricing power from consumer reviews.* Management Science, 57(8).  
3. Baek, H., Ahn, J., Choi, Y. (2012). *Helpfulness of online consumer reviews.* Intl. Journal of Electronic Commerce, 17(2).  
4. Chevalier, J.A., Mayzlin, D. (2006). *Word of mouth on sales: Online book reviews.* Journal of Marketing Research, 43(3).  
5. Chintagunta, P.K. et al. (2010). *Online user reviews and movie box office performance.* Marketing Science, 29(5).  
6. Hansen, D.L. et al. (2020). *PageRank and Eigenvector Centrality.* Analyzing Social Media Networks.  

---

## License

ISC
