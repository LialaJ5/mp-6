/*import Stats from "../Stats";

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function CallbackPage(props: {
    params: Params
    searchParams: SearchParams
}) {
    return (
        <div>
            <p>Name:</p>
            <Stats params={props.params} searchParams={props.searchParams} />
        </div>
    )
}*/
"use client"
import { use } from 'react'
import {useEffect, useState} from 'react';
import response from "../data";

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function Page(props: {
    params: Params
    searchParams: SearchParams
}) {
    const searchParams = use(props.searchParams);

    const code = searchParams.code;

    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [bio, setBio] = useState("");
    const [p, setP] = useState("");
    const [followers, setFollowers] = useState("");

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const data = await response(code);
                    if (data != undefined) {
                        setName(data[0]);
                        setLink(data[1]);
                        setBio(data[2]);
                        setP(data[3]);
                        setFollowers(data[4]);
                    }
                    console.log(data);
                } catch (error) {
                    console.error("Error fetching books", error);
                }
            };

            void fetchData();
        }, [code]);

    return (
        <main className="flex bg-pink-200 flex-col min-h-screen">
            <header className="bg-red-400 text-4xl p-4 font-bold">CS 391 OAuth</header>
            <div className="p-2 items-center">
                <p className="p-4 text-3xl font-bold">Welcome back, {name}</p>
                <p className="p-4 text-2xl">See your profile page here: <a href={link} className="underline italic">Page</a></p>
                <p className="p-4 text-2xl">Bio (if you have one): {bio}</p>
                <p className="p-4 text-2xl">You have {p} public repos.</p>
                <p className="p-4 text-2xl">You have {followers} followers. Impressive!</p>
            </div>
        </main>
    )
}

    /*
    let data_user : string | null | undefined = null;

    const code = searchParams.code;

    const AUTH_GITHUB_ID = process.env.AUTH_GITHUB_ID;

    const AUTH_GITHUB_SECRET = process.env.AUTH_GITHUB_SECRET;

    const data = async () => {
        try {
            const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${AUTH_GITHUB_ID}&client_secret=${AUTH_GITHUB_SECRET}&code=${code}`);
            const data = response.body;
            const string = await new Response(data).text();
            const a = string.substring(13, 53);
            console.log(a);

            const users = await fetch("https://api.github.com/user", {
                headers: {Authorization: `Bearer ${a}`}
            })
            const user_info = await users.json();
            data_user = user_info["login"];
            console.log(data_user);
            return data_user;
        }
        catch (error){
            console.error("Failed to access github", error)
        }
    }

    return (
        <div>
            <p>{data_user}</p>
        </div>
    )
}*/