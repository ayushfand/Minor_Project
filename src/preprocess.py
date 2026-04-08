def preprocess(df):
    df = df[['product/productId', 'review/userId', 'review/time']]

    df = df[df['review/userId'] != 'unknown']

    df['review/time'] = df['review/time'].astype('int32')

    return df