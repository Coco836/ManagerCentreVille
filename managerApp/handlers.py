import json
import os


def load_json_data():
    # Chemin relatif au fichier JSON depuis le fichier handlers.py
    json_path = os.path.join(os.path.dirname(__file__), 'blog_articles.json')

    # Ouvrir et lire le fichier JSON
    with open(json_path, 'r') as file:
        data = json.load(file)

    return data
