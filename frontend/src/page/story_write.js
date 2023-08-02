import { API } from "../service/api.js";
import { getParams } from "../utils/get_params.js";

export function storyWritePage() {
  const page = getParams("p");
  const data = JSON.parse(sessionStorage.getItem(`story_prompt_${page}`));
  sessionStorage.clear();
  const editorForm = document.createElement("form");
  editorForm.classList.add("editor-form");
  if (data.img_url) {
    const thumbnail = document.createElement("img");
    thumbnail.classList.add("thumbnail", "card");
    thumbnail.src = data.img_url;
    thumbnail.art = "thumbnail";
    editorForm.appendChild(thumbnail);
  }
  const titleGroup = document.createElement("div");
  titleGroup.classList.add("form-group");
  editorForm.appendChild(titleGroup);
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "제목";
  titleGroup.appendChild(titleLabel);
  const titleInput = document.createElement("input");
  titleInput.name = "title";
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("class", "form-control");
  titleInput.setAttribute("name", "title");
  titleInput.setAttribute("required", true);
  titleGroup.appendChild(titleInput);
  const editordiv = document.createElement("div");
  editordiv.id = "editor";
  editordiv.innerHTML = data.response;
  editorForm.appendChild(editordiv);
  const editor = toastui.Editor.factory({
    el: editordiv,
    initialEditType: "wysiwyg",
    height: "600px",
  });

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("class", "btn btn-primary");
  submitButton.textContent = "작성 완료";

  editorForm.appendChild(submitButton);

  editorForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {
      title: titleInput.value,
      body: editor.getMarkdown(),
      story: page,
      thumbnail: data.img_url,
    };
    const response = await API.board.write(body);
    if (response) {
      return (window.location.href = `/post.html?p=${response.request}`);
    }
    return (window.location.href = `/index.html`);
  });

  return editorForm;
}
