import openai, json, db

openai.api_key = "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"

def get_post_by_query(posts: list, userprompt: str):
    try:
        prompt = "Out of the following descriptions: "+str(db.get_all_descriptions(posts))
        res = str(openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": " is most similar to this summary: "+userprompt+" \nONLY RESPOND WITH THE EXACT DESCRIPTION"}
            ]
        ))

        jres = json.loads(res)

        return db.get_post_by_ai_output(str(jres["choices"][0]["message"]["content"]))
    except openai.error.RateLimitError:
        return 5