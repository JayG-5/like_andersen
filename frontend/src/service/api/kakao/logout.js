import { userInfo } from "../../../modules/user.js";

export async function logout(url) {
  try {
    Object.keys(userInfo).forEach((key) => delete userInfo[key]);
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
  } catch (error) {}
  window.location.pathname = "/";
}
