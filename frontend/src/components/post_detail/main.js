import { postComment } from "./comment.js";
import { commentWirte } from "../../components/post_detail/comment_write.js";
import { API } from "../../service/api.js";

export function postDetailMain(response) {
  const container = document.createElement("div");

  const article = document.createElement("article");

  const header = document.createElement("header");
  header.classList.add("mb-4");

  const title = document.createElement("h1");
  title.classList.add("fw-bolder", "mb-1");
  title.textContent = response.title;

  const metaContent = document.createElement("div");
  metaContent.classList.add("text-muted", "fst-italic", "mb-2");
  metaContent.textContent = `${response.user.nickname} | ${Date(
    response.created_at
  )}`;

  header.appendChild(title);
  header.appendChild(metaContent);

  response.hashtag_set.forEach((category) => {
    const categoryLink = document.createElement("a");
    categoryLink.classList.add(
      "badge",
      "bg-secondary",
      "text-decoration-none",
      "link-light",
      "me-2"
    );
    categoryLink.href = "#!";
    categoryLink.textContent = category;
    header.appendChild(categoryLink);
  });

  const postContent = document.createElement("section");
  postContent.classList.add("mb-5");
  postContent.innerHTML = marked(response.body);

  const ButtonDiv = document.createElement("div");
  ButtonDiv.classList.add("button-list", "justify-content-center");
  postContent.appendChild(ButtonDiv);

  const likeButton = document.createElement("button");
  likeButton.classList.add(
    "btn",
    response.is_like ? "btn-danger" : "btn-outline-danger"
  );
  ButtonDiv.appendChild(likeButton);
  likeButton.addEventListener("click", async () => {
    await API.board.postLike(response.id);
    location.reload();
  });

  const like = document.createElement("span");
  like.classList.add("material-symbols-outlined");
  like.innerText = "favorite";
  likeButton.appendChild(like);

  const likeText = document.createElement("span");
  likeText.innerText = response.like_set_length;
  likeButton.appendChild(likeText);

  article.appendChild(header);
  article.appendChild(postContent);

  container.appendChild(article);
  const section = document.createElement("section");
  section.classList.add("mb-5");

  const card = document.createElement("div");
  card.classList.add("card", "bg-light");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.appendChild(commentWirte(true, response.id, response.id));
  response.comment_set.forEach((e) => cardBody.appendChild(postComment(e)));

  card.appendChild(cardBody);
  section.appendChild(card);
  container.appendChild(section);
  return container;
}
