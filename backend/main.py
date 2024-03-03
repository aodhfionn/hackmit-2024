import uvicorn
from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import Response
from fastapi.responses import JSONResponse
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import db, gptapi
from post_obj import Post

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


class PostData(BaseModel):
    title: str
    author: str
    location_state: str
    location_city: str
    description: str

headers = {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":"GET, POST, OPTIONS"}

@app.post("/create_post")
async def create_post(request: Request, data: PostData):
    db.append_post(Post(data.title, data.author,
        data.location_state, data.location_city, data.description))
        
    return JSONResponse(status_code=200,
                    content={},
                    headers=headers)
        
@app.get("/get_posts")
async def get_posts(request: Request):
    return JSONResponse(status_code=200,
                        content=db.get_all_posts(),
                        headers=headers)
        
class GetPostData(BaseModel):
    state: str
    cities: list
    
@app.post("/get_posts_specified")
async def get_posts_specified(request: Request, data: GetPostData):
    if len(data.cities) == 0 or (len(data.cities) == 1 and data.cities[0] == ""):
        return JSONResponse(status_code=200,
                            content=db.get_posts_by_state(data.state),
                            headers=headers)
        
    return JSONResponse(status_code=200,
                        content=db.get_posts_by_cities(db.get_posts_by_state(data.state), data.cities),
                        headers=headers)
                        
                        

class AIPostData(BaseModel):
    posts: list
    query: str
    
@app.post("/get_posts_ai")
async def get_posts_ai(request: Request, data: AIPostData):
    c = gptapi.get_post_by_query(data.posts, data.query)
    if c == 5: # GPT rate limit
        return JSONResponse(status_code=429, 
                        content={},
                        headers=headers)
                        
    return JSONResponse(status_code=200,
                        content=c,
                        headers=headers)
    
    
    