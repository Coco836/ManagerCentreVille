import json
import os


def load_json_data():
    # Chemin relatif au fichier JSON depuis le fichier handlers.py
    json_path = os.path.join(os.path.dirname(__file__), 'blog_articles.json')

    # Ouvrir et lire le fichier JSON
    with open(json_path, 'r') as file:
        data = json.load(file)

    return data

def get_articles_preview(articles):
    articles_preview = sorted(
        [
            {
                "id": article["id"], "title": article["title"], "date": article["date"],
                "preview": article["preview"], "author": article["author"], "image": article["image"]
            } for article in articles
        ],
        key=lambda x: x["id"],
        reverse=True
    )
    return articles_preview[0], articles_preview[1:]

def get_latest_articles_preview(articles, current_article_id):
    articles_preview = sorted(
        [
            {
                "id": article["id"], "title": article["title"], "date": article["date"],
                "preview": article["preview"], "image": article["image"]
            } for article in articles if article["id"] != current_article_id
        ],
        key=lambda x: x["id"],
        reverse=True
    )[:3]
    return articles_preview
