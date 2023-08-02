import { API, baseURL } from "./api.js";

export const OAuth = {
  login: () =>
    Kakao.Auth.authorize({
      redirectUri: baseURL.account.kakao.callback,
    }),
  logout: () => API.account.kakao.logout(),
  // 리다이렉트를 프론트로 바꾸고, 코드를
  // logout: () =>{
  //   Kakao.API.request({
  //     url: '/v1/user/unlink',
  //     success: function (response) {
  //       console.log(response)
  //     },
  //     fail: function (error) {
  //       console.log(error)
  //     },
  //   })
  //   Kakao.Auth.setAccessToken(undefined)
  // }
  // const win = window.open(
  //   `${baseURL}account/oauth/kakao/login/`,
  //   "snsPopup_self"
  //   // "titlebar=1, resizable=1, scrollbars=yes, width=600, height=650"
  // );
  // win.focus();

  // win.addEventListener("hashchange", (event) => {
  //   console.log("새로운 해시:", window.location.hash);
  //   // event.data에 JSON 응답이 있습니다.
  //   const jsonResponse = event.data;

  //   // 원래 창에서 JSON 응답 처리 또는 리다이렉트 등의 작업을 수행합니다.
  //   console.log("원래 창에서 받은 JSON 응답:", jsonResponse);

  //   // 예시로 2초 후 원래 창을 리다이렉트하는 코드입니다.
  //   setTimeout(() => {
  //     window.location.href = "https://www.example.com"; // 리다이렉트할 URL을 여기에 설정
  //   }, 2000); // 2초 후 리다이렉트
  // });
  // },
};
