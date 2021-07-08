import axios from "axios";




export const authByGoogle=()=>{

    const axiosAPI =
axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token"), // 帶著 access token
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
      // access token -> 向 API 拿新的 token
      const refresh_token = localStorage.getItem("refresh_token");
      return axios
        .post("http://localhost:8000/accounts/token/refresh/", { refresh: refresh_token })
        .then((response) => {

          localStorage.setItem("access_token", response.data.access);
          axiosAPI.defaults.headers["Authorization"] = "Bearer " + response.data.access;
          originalRequest.headers["Authorization"] = "Bearer " + response.data.access;
          return axiosAPI(originalRequest);

        })
        .catch((err) => {
          // refresh token 過期 -> 直接當作完全沒有登入
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        });
    }
    return Promise.reject(error);
  }
);
}
