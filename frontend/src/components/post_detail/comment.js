import { API } from "../../service/api.js";
import { getParams } from "../../utils/get_params.js";
import { commentWirte } from "./comment_write.js";

export function postComment(response) {
  const dFlex = document.createElement("div");
  dFlex.classList.add("d-flex", "comment-container");

  const flexShrink = document.createElement("div");
  flexShrink.classList.add("flex-shrink-0");

  const commenterImage = document.createElement("img");
  commenterImage.classList.add("profile-img");
  commenterImage.src = response.user.profile_image_url;
  commenterImage.alt = "...";
  flexShrink.appendChild(commenterImage);

  const ms3 = document.createElement("div");
  ms3.classList.add("ms-1");

  const commenterNameDiv = document.createElement("div");
  commenterNameDiv.classList.add("fw-bold");
  commenterNameDiv.textContent = `${response.user.nickname} | ${Date(
    response.created_at
  )}`;
  ms3.appendChild(commenterNameDiv);

  const commentContentDiv = document.createElement("div");
  commentContentDiv.textContent = response.body;
  ms3.appendChild(commentContentDiv);

  const commentButtonDiv = document.createElement("div");
  commentButtonDiv.classList.add("button-list");
  ms3.appendChild(commentButtonDiv);

  const commentSection = document.createElement("div");
  commentSection.classList.add("comment-Section");
  ms3.appendChild(commentSection);

  const likeButton = document.createElement("button");
  likeButton.classList.add(
    "btn",
    response.is_like ? "btn-danger" : "btn-outline-danger"
  );
  commentButtonDiv.appendChild(likeButton);
  likeButton.addEventListener("click", async () => {
    await API.board.commentLike(response.id);
    location.reload();
  });

  const like = document.createElement("span");
  like.classList.add("material-symbols-outlined");
  like.innerText = "favorite";
  likeButton.appendChild(like);

  const likeText = document.createElement("span");
  likeText.innerText = response.like_set_length;
  likeButton.appendChild(likeText);

  const commentButton = document.createElement("button");
  commentButton.classList.add("btn", "btn-outline-primary");
  commentButtonDiv.appendChild(commentButton);

  commentButton.addEventListener("click", () => {
    commentSection.innerHTML = "";
    commentSection.appendChild(
      commentWirte(false, getParams("p"), response.id)
    );
  });

  const comment = document.createElement("span");
  comment.classList.add("material-symbols-outlined");
  comment.innerText = "comment";
  commentButton.appendChild(comment);

  const commentText = document.createElement("span");
  commentText.innerText = "댓글 작성";
  commentButton.appendChild(commentText);

  response.child_comments.forEach((e) => ms3.appendChild(postComment(e)));

  dFlex.appendChild(flexShrink);
  dFlex.appendChild(ms3);
  return dFlex;
}
