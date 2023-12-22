import { apiPaths } from "@/api/apiPath";
async function fetchWebApi(token_spotify, endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token_spotify}`,
    },
    method,
    body: JSON.stringify(body),
  });
  const result = await res.json();

  return await result;
}

onmessage = async (event) => {
  const message = event.data;

  if (message.type === "token") {
    const spotify_token = message.payload;
    const responseTop = await fetchWebApi(
      spotify_token,
      apiPaths.topTracks,
      "GET",
    );

    const topResult = {};
    console.log("responseTop workerjs: ", responseTop);
    const topTrackPromises = responseTop.items.map((track) => {
      return fetchWebApi(
        spotify_token,
        apiPaths.getTrackFeature + track.id,
        "GET",
      ).then((response) => {
        console.log("worker: ", response);
        if (response.error) {
          console.error("API 请求失败");
        } else {
          Object.keys(response).forEach((key) => {
            console.log("key: ", key);
            if (response[key] > 0 && response[key] < 1) {
              if (topResult.key) {
                topResult[key] = topResult[key] + response[key];
              } else {
                topResult[key] = response[key];
              }
            }
          });
        }
      });
    });

    Promise.all(topTrackPromises)
      .then(() => {
        Object.keys(topResult).forEach((key) => {
          topResult[key] = topResult[key] / responseTop.items.length;
        });

        postMessage({
          type: "top success",
          payload: topResult,
        });
      })
      .catch((error) => {
        console.error("Promise.all错误: ", error);
      });

    const responseRecent = await fetchWebApi(
      spotify_token,
      apiPaths.recentPlay,
      "GET",
    );

    const recentResult = {};
    console.log("responseTop workerjs: ", responseTop);
    const recentTrackPromises = responseRecent.items.map((track) => {
      return fetchWebApi(
        spotify_token,
        apiPaths.getTrackFeature + track.track.id,
        "GET",
      ).then((response) => {
        console.log(response);
        if (response.error) {
          console.error("API 请求失败");
        } else {
          Object.keys(response).forEach((key) => {
            console.log("key: ", key);
            if (response[key] > 0 && response[key] < 1) {
              if (recentResult.key) {
                recentResult[key] = recentResult[key] + response[key];
              } else {
                recentResult[key] = response[key];
              }
            }
          });
        }
      });
    });

    Promise.all(recentTrackPromises)
      .then(() => {
        Object.keys(recentResult).forEach((key) => {
          recentResult[key] = recentResult[key] / responseRecent.items.length;
        });
        postMessage({
          type: "recent success",
          payload: recentResult,
        });
      })
      .catch((error) => {
        console.error("Promise.all错误: ", error);
      });
  }
};
