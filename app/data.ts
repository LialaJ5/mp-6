"use server"

export default async function response(code: string | string[] | undefined) {
    const AUTH_GITHUB_ID = process.env.AUTH_GITHUB_ID;

    const AUTH_GITHUB_SECRET = process.env.AUTH_GITHUB_SECRET;

    const data = async () : Promise<string[] | undefined> => {
        try {
            const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${AUTH_GITHUB_ID}&client_secret=${AUTH_GITHUB_SECRET}&code=${code}`);
            const data = response.body;
            const string = await new Response(data).text();
            console.log(string);
            const a = string.substring(13, 53);
            console.log(a);

            const users = await fetch("https://api.github.com/user", {
                headers: {Authorization: `Bearer ${a}`}
            })
            const user_info = await users.json();
            const data_n = user_info["login"];
            const data_link = user_info["html_url"];
            const data_bio = user_info["bio"];
            const data_p = user_info["public_repos"] === undefined ? 0 : user_info["public_repos"].toString();
            const data_follo = user_info["followers"] === undefined ? 0 : user_info["followers"].toString();
            return [data_n, data_link, data_bio, data_p, data_follo];
        }
        catch (error){
            console.error("Failed to access github", error)
        }
    }
    const data_user = await data();
    return data_user;
}