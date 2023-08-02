import { API } from "../../service/api.js";

export function commentWirte(isPost, postId, id) {
  const form = document.createElement("form");
  form.classList.add("comment-write-form", "mb-4");

  const textarea = document.createElement("textarea");
  textarea.classList.add("form-control");
  textarea.rows = "3";
  textarea.placeholder = "댓글 작성";
  textarea.name = "body";
  const submit = document.createElement("input");
  submit.classList.add("btn", "btn-primary", "send-button");
  submit.type = "submit";
  submit.classList.add("btn");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    isPost
      ? await API.board.postComment(id, formData.get("body"))
      : await API.board.commentCommet(id, formData.get("body"));
    window.location.href = `/post.html?p=${postId}`;
  });

  form.appendChild(textarea);
  form.appendChild(submit);
  return form;
}
