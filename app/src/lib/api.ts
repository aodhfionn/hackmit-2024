import { PostItemProps } from "./interfaces";

export const API = 'http://localhost:8000';

export async function getPosts(): Promise<PostItemProps[]> {
    try {
        const response = await fetch(`${API}/get_posts`, {
            method: "GET"
        });
        const data = await response.json();

        let postData: PostItemProps[] = [];
        for (let item of data) {
            postData.push({
                title: item.title,
                author: item.author,
                location_state: item.location_state,
                location_city: item.location_city,
                description: item.description
            })
        }
        
        return Promise.resolve(postData);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function createPost(props: PostItemProps): Promise<void> {
    try {
        const response = await fetch(`${API}/create_post`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: props.title,
                author: props.author,
                location_state: props.location_state,
                location_city: props.location_city,
                description: props.description
            })
        });

        // const response = await response.json();

        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function filterLocation(state: string, city: string): Promise<PostItemProps[]> {
    try {
        const response = await fetch(`${API}/get_posts_specified`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                state: state,
                cities: [city]
            })
        });
        const data = await response.json();

        let postData: PostItemProps[] = [];
        for (let item of data) {
            postData.push({
                title: item.title,
                author: item.author,
                location_state: item.location_state,
                location_city: item.location_city,
                description: item.description
            })
        }
        
        return Promise.resolve(postData);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function filterAi(prompt: string, posts: PostItemProps[]): Promise<PostItemProps[]> {
    try {
        const response = await fetch(`${API}/get_posts_ai`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                posts: posts,
                query: prompt
            })
        });
        const data = await response.json();

        let postData: PostItemProps[] = [];
        for (let item of data) {
            postData.push({
                title: item.title,
                author: item.author,
                location_state: item.location_state,
                location_city: item.location_city,
                description: item.description
            })
        }
        
        return Promise.resolve(postData);
    } catch (error) {
        return Promise.reject(error);
    }
}