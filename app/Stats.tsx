"use client"

import { use } from 'react'
import {useState} from "react";

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function Stats(props: {
    params: Params
    searchParams: SearchParams
}) {
    const [name, setName] = useState("");
    const searchParams = use(props.searchParams);

    const code = searchParams.code;
    console.log(code);

    const AUTH_GITHUB_ID = process.env.AUTH_GITHUB_ID;

    const AUTH_GITHUB_SECRET = process.env.AUTH_GITHUB_SECRET;

    const data = async () => {
        try {
            const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${AUTH_GITHUB_ID}&client_secret=${AUTH_GITHUB_SECRET}&code=${code}`, { headers: {
                "Allow-Control-Allow-Origin": "http://localhost:3000/",
            }});
            console.log(response);
            const data = response.body;
            const string = await new Response(data).text();
            const a = string.substring(13, 53);
            console.log(a);

            const users = await fetch("https://api.github.com/user", {
                headers: {Authorization: `Bearer ${a}`}
            })
            const user_info = await users.json();
            console.log(user_info);
            setName(user_info["login"]);
            console.log(name);
        }
        catch (error){
            console.error("Failed to access github", error)
        }
    }

    void data();


    return (
        <div>
            <p>{name}</p>
        </div>
    )
}