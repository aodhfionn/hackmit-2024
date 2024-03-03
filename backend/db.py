import json
from post_obj import Post

POSTS_DB = "posts.json"

def append_post(post):
    post_json = {
        "title": post.title,
        "author": post.author,
        "location_state": post.location_state,
        "location_city": post.location_city,
        "description": post.description
    }

    data = []

    try:
        with open(POSTS_DB, 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        # If the file does not exist, it will be created in write mode later
        print("File not found. It will be created.")
    except json.JSONDecodeError:
        # If the file is empty or has invalid JSON, start with an empty list
        print("Invalid JSON or empty file. Starting with an empty list.")

    data.append(post_json)

    try:
        with open(POSTS_DB, 'w') as file:
            json.dump(data, file, indent=4)
    except IOError as e:
        print(f"An IO error occurred: {e}")


def get_posts_by_state(state: str):
    try:
        with open(POSTS_DB, 'r') as file:
            # Load the data from the JSON file
            data = json.load(file)
    except FileNotFoundError:
        # If the file does not exist, return an empty list
        return []
    except json.JSONDecodeError:
        # If the file is empty or has invalid JSON, return an empty list
        return []

    # Filter the posts by the specified state
    filtered_posts = [post for post in data if post['location_state'] == state]
    return filtered_posts


def get_posts_by_cities(posts: list, cities: list):
    # Filter posts that are in any of the specified cities
    filtered_posts = [post for post in posts if post['location_city'] in cities]

    return filtered_posts

def get_all_posts():
    try:
        with open(POSTS_DB, 'r') as file:
            # Load the data from the JSON file
            data = json.load(file)
            return data
    except FileNotFoundError:
        # If the file does not exist, return an empty list
        return []
    except json.JSONDecodeError:
        # If the file is empty or has invalid JSON, return an empty list
        return []

def get_all_descriptions(posts: list):
    descriptions = [post['description'] for post in posts]

    return descriptions
    
def get_post_by_ai_output(output: str):
    try:
        with open(POSTS_DB, 'r') as file:
            posts = json.load(file)
    except FileNotFoundError:
        # If the file does not exist, return an empty list
        print("File not found. Returning an empty list.")
        return []
    except json.JSONDecodeError:
        # If the file is empty or has invalid JSON, return an empty list
        print("Invalid JSON or empty file. Returning an empty list.")
        return []

    filtered_posts = [post for post in posts if post['description'].lower() in output.lower()]
    return filtered_posts