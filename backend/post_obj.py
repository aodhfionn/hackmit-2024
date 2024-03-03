class Post:
    title = None
    author = None
    location_state = None
    location_city = None
    description = None
    
    def __init__(self, title: str, 
                author: str, location_state: str,
                location_city: str, description: str):
        self.title = title
        self.author = author
        self.location_state = location_state
        self.location_city = location_city
        self.description = description