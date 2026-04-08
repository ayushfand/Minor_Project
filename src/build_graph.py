from collections import defaultdict
import networkx as nx

def build_product_reviews(df):
    product_reviews = defaultdict(list)

    for product, user, time in zip(
        df['product/productId'],
        df['review/userId'],
        df['review/time']
    ):
        product_reviews[product].append((user, time))

    return product_reviews


def build_bipartite_graph(df):
    # This creates the Graph from SS1 (User - Product Bipartite Graph)
    B = nx.Graph()
    
    for _, row in df.iterrows():
        user = row['review/userId']
        product = row['product/productId']
        time = row['review/time']
        
        # Add nodes with type info
        B.add_node(user, type='user')
        B.add_node(product, type='product')
        
        # Add edge (review)
        B.add_edge(user, product, time=time)
        
    return B


def build_user_graph(product_reviews, max_reviews_per_product=50):
    G = nx.DiGraph()

    for product, reviews in product_reviews.items():

        if len(reviews) > max_reviews_per_product:
            reviews = reviews[:max_reviews_per_product]

        reviews.sort(key=lambda x: x[1])

        for i in range(len(reviews)):
            ui, ti = reviews[i]

            for j in range(i+1, len(reviews)):
                uj, tj = reviews[j]

                if G.has_edge(ui, uj):
                    G[ui][uj]["weight"] += 1
                else:
                    G.add_edge(ui, uj, weight=1)

    return G