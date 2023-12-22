import { useRouter } from "vue-router";

export default async function fetchWebApi(endpoint, method, body) {
  const data = JSON.parse(localStorage.getItem(endpoint));
  if (data && data.expiresIn > new Date().getTime()) {
    // data is not expired
    return data.value;
  } else {
    // data is expired
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token_spotify")}`,
      },
      method,
      body: JSON.stringify(body),
    });
    if (res.status === 401) {
      // clean cookie
      document.cookie =
        "token_spotify=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      const router = useRouter();
      // clean localStorage
      localStorage.removeItem("token_spotify");
      router.push("/login");
      return;
    }
    const result = await res.json();
    const expiresIn = new Date().getTime() + 60 * 60 * 1000;
    localStorage.setItem(
      endpoint,
      JSON.stringify({
        value: result,
        expiresIn: expiresIn,
      }),
    );
    return await result;
  }
}
