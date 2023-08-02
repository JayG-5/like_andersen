import { getAuthStatus } from "./components/nav/auth.js";
import { postDetailPage } from "./page/post_detail.js";
import { dashboardPage } from "./page/dashboard.js";
import { storyCreatePage } from "./page/prompt_create.js";
import { storyWritePage } from "./page/story_write.js";

async function render() {
  const currentPath = window.location.pathname;
  switch (currentPath) {
    case "/post.html":
      return postDetailPage();
    case "/create.html":
      return storyCreatePage();
    case "/write.html":
      return storyWritePage();
    default:
      return dashboardPage();
  }
}

getAuthStatus();
const html = await render();
document.getElementById("main").appendChild(html);
