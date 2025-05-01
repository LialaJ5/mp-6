
export default function Home() {
  const AUTH_GITHUB_ID = process.env.AUTH_GITHUB_ID;
  return (
      <main className="flex bg-pink-200 flex-col min-h-screen">
          <header className="bg-red-400 text-4xl p-4 font-bold">CS 391 OAuth</header>
          <div className="p-2 flex flex-col items-center">
            <h2 className="p-4 text-3xl">Sign-in</h2>
            <p className="p-4 text-2xl">Use the link below to sign into github!</p>
            <a href={`https://github.com/login/oauth/authorize?client_id=${AUTH_GITHUB_ID}`} className="p-4 text-2xl bg-red-400 underline rounded-2xl">Login</a>
          </div>
      </main>
  );
}
