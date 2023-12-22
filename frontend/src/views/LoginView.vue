<script>
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    if (route.query["token_spotify"]) {
      localStorage.setItem("token_spotify", route.query["token_spotify"]);
      router.push("/");
    }
  },
};
</script>

<template>
  <main class="login-screen">
    <!-- <a href="https://nextjs-api-zeta-amber.vercel.app/api/login"> -->
    <!-- <a href="http://localhost:3005/api/login"> -->
    <a href="http://localhost:3000/api/login">
      <button class="spotify-button">Login to Spotify</button>
    </a>
  </main>
</template>

<style>
.login-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.spotify-button {
  width: 202px;
  height: 50px;
  background-color: green;
  font-size: 18px;
  font-weight: 700;
  border-radius: 20px;
  border-color: black;
  color: white;
  cursor: pointer;
}
.spotify-button a {
  text-decoration: none;
}
</style>
