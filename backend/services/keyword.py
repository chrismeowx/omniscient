from keybert import KeyBERT

kw_model = KeyBERT()

def extract_keyword(text):
    keywords = kw_model.extract_keywords(text, keyphrase_ngram_range=(1, 1), stop_words='english')
    if keywords:
        return keywords[0][0]  
    return text 
