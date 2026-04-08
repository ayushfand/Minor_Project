import networkx as nx

def compute_pagerank(G):
    print("Running PageRank...")
    pr = nx.pagerank(G, weight='weight', max_iter=50)
    return pr