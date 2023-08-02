import { checkLoginStatus } from "../../utils/check_login_status.js";
import { OAuth } from "../../service/oauth.js";
import { userInfo } from "../../modules/user.js";

export async function getAuthStatus() {
  const authStatus = document.getElementById("auth-status");

  const loginStatus = await checkLoginStatus();
  authStatus.innerHTML = "";

  if (loginStatus) {
    const img = document.createElement("img");
    img.src = userInfo.profile_image_url;
    img.alt = "프로필";
    img.classList.add("profile-img");
    const button = document.createElement("a");
    button.type = "button";
    button.classList.add("btn", "btn-dark");
    button.innerText = "로그아웃";
    authStatus.appendChild(img);
    authStatus.appendChild(button);
    button.addEventListener("click", () => OAuth.logout());
  } else {
    const newImage = document.createElement("img");
    newImage.src = "src/assets/kakao_login_medium.png";
    newImage.alt = "카카오 로그인";
    authStatus.appendChild(newImage);
    newImage.addEventListener("click", () => OAuth.login());
  }
}
