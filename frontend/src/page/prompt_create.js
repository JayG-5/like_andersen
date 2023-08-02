import { API } from "../service/api.js";

let chat = [
  {
    writer: "bot",
    text: "안녕하세요. 동화 작성을 위한 프롬프트 생성 봇입니다.",
  },
  {
    writer: "bot",
    text: "동화 작성을 위해 주제, 등장인물, 배경, 스토리, 교훈을 작성해주세요.",
  },
  {
    writer: "bot",
    text: `우선 주제를 작성해주세요.
  주제는 가능한한 명확하고 간결하게 작성하는 것이 좋습니다.
  주제는 해당 동화의 핵심 아이디어 또는 이야기의 주요 주제를 나타내야 합니다.

  예)
  "웅덩이의 비밀"
  "마법의 숲을 탐험하는 용기 있는 모험가"
  "소심한 드래곤의 용감한 모험"`,
    label: "주제",
    key: "theme",
  },
];

let botChat = [
  {
    writer: "bot",
    text: "좋아요. 이제 등장인물을 설정해볼까요?",
    label: "등장인물",
    key: "characters",
  },
  {
    writer: "bot",
    text: `좋아요! 동화의 배경을 설명해주세요.

  어떤 특별한 풍경과 땅이 있는지, 주요 도시나 마을이 어떻게 생겼는지, 그리고 주인공이 어떤 환경에 처해있는지 등을 설명해주세요.`,
    label: "배경",
    key: "background",
  },
  {
    writer: "bot",
    text: `좋아요! 동화의 스토리 간략하게 작성해주세요. 
  주인공이 어떤 목표를 가졌는지, 도전과 시련을 겪으며 어떤 사건들이 발생하는지, 그리고 결말이 어떻게 이루어지는지 등을 포함하여 스토리를 작성해주세요.`,

    label: "스토리",
    key: "plot",
  },
  {
    writer: "bot",
    text: `좋아요! 동화의 교훈을 간단하게 작성해주세요. 이 이야기에서 주인공이 어떤 가치를 배우게 되는지, 전달하고싶은 교훈을 작성해주세요.`,
    label: "교훈",
    key: "moral",
  },
  {
    writer: "bot",
    text: `모든 준비가 끝났어요! 아래와 같은 내용으로 동화의 프롬프트를 작성하겠습니다.
    
    잠시만 기다려주세요!!`,
  },
];

let characters = [];

const prompt = {};

function createStoryPromptForm(label, key) {
  const form = document.createElement("form");
  form.classList.add("story-prompt-form");

  const topicFormGroup = document.createElement("div");
  topicFormGroup.classList.add("form-group");

  const topicLabel = document.createElement("label");
  topicLabel.textContent = label;

  const topicInput = document.createElement("input");
  topicInput.setAttribute("type", "text");
  topicInput.setAttribute("class", "form-control");
  topicInput.setAttribute("name", key);
  topicInput.setAttribute("required", true);

  topicFormGroup.appendChild(topicLabel);
  topicFormGroup.appendChild(topicInput);

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("class", "btn btn-primary");
  submitButton.textContent = "작성 완료";

  form.appendChild(topicFormGroup);
  form.appendChild(submitButton);

  return form;
}
function createRadioButton(name, label, checked) {
  const radioLabel = document.createElement("label");

  const radioInput = document.createElement("input");
  radioInput.setAttribute("type", "radio");
  radioInput.setAttribute("name", name);
  radioInput.setAttribute("value", label.toLowerCase());
  if (checked) {
    radioInput.setAttribute("checked", true);
  }

  radioLabel.appendChild(radioInput);
  radioLabel.appendChild(document.createTextNode(label));

  return radioLabel;
}

function createStoryPromptCharacterForm() {
  const form = document.createElement("form");
  form.classList.add("character-form", "gap-8");

  const nameGroup = document.createElement("div");
  nameGroup.classList.add("form-group");
  // 이름 입력
  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", `characterName`);
  nameLabel.textContent = "이름";

  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name", "name");
  nameInput.setAttribute("class", "form-control");
  nameInput.setAttribute("required", true);

  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  form.appendChild(nameGroup);

  const ageGroup = document.createElement("div");
  ageGroup.classList.add("form-group");
  // 나이 입력
  const ageLabel = document.createElement("label");
  ageLabel.textContent = "나이";

  const ageInput = document.createElement("input");
  ageInput.setAttribute("type", "text");
  ageInput.setAttribute("name", "age_range");
  ageInput.setAttribute("class", "form-control");
  ageInput.setAttribute("required", true);

  ageGroup.appendChild(ageLabel);
  ageGroup.appendChild(ageInput);
  form.appendChild(ageGroup);
  const genderGroup = document.createElement("div");
  genderGroup.classList.add("form-group");

  // 성별 입력 (라디오 버튼)
  const genderLabel = document.createElement("label");
  genderLabel.textContent = "성별";

  const maleRadio = createRadioButton(`gender`, "남자", false);
  const femaleRadio = createRadioButton(`gender`, "여자", false);

  genderGroup.appendChild(genderLabel);
  genderGroup.appendChild(maleRadio);
  genderGroup.appendChild(femaleRadio);
  form.appendChild(genderGroup);

  const descriptionGroup = document.createElement("div");
  descriptionGroup.classList.add("form-group");
  // 설명 입력
  const descriptionLabel = document.createElement("label");

  descriptionLabel.textContent = "인물 설명";

  const descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("class", "form-control");
  descriptionInput.setAttribute("name", "description");
  descriptionInput.setAttribute("required", true);

  descriptionGroup.appendChild(descriptionLabel);
  descriptionGroup.appendChild(descriptionInput);
  form.appendChild(descriptionGroup);

  const imageUrlGroup = document.createElement("div");
  imageUrlGroup.classList.add("form-group");
  // 이미지 URL 입력
  const imageUrlLabel = document.createElement("label");
  imageUrlLabel.textContent = "이미지 URL";

  const imageUrlInput = document.createElement("input");
  imageUrlInput.setAttribute("type", "text");
  imageUrlInput.setAttribute("name", "description_img");
  imageUrlInput.setAttribute("class", "form-control");

  imageUrlGroup.appendChild(imageUrlLabel);
  imageUrlGroup.appendChild(imageUrlInput);
  form.appendChild(imageUrlGroup);

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("class", "btn btn-secondary");
  submitButton.textContent = "추가";
  form.appendChild(submitButton);
  return form;
}

function message(data) {
  const message = document.createElement("div");
  message.classList.add(`${data.writer}-message`);
  if (data.text == null) {
    message.innerHTML = data.html;
  } else {
    message.innerText = data.text;
  }
  return message;
}

function badge(index, data) {
  // 부모 요소를 생성합니다.
  const parentSpan = document.createElement("span");
  parentSpan.classList.add(
    "badge",
    "d-flex",
    "align-items-center",
    "p-1",
    "pe-2",
    "text-light-emphasis",
    "bg-light-subtle",
    "border",
    "border-dark-subtle",
    "rounded-pill",
    "badge-span"
  );

  // 이미지 요소를 생성합니다.
  if (data.description_img) {
    const image = document.createElement("img");
    image.classList.add("rounded-circle", "me-1");
    image.setAttribute("width", "24");
    image.setAttribute("height", "24");
    image.setAttribute("src", data.description_img);
    image.setAttribute("alt", "");
    parentSpan.appendChild(image);
  }

  const text = document.createTextNode(data.name);

  const vrSpan = document.createElement("span");
  vrSpan.classList.add("vr", "mx-2");

  const anchor = document.createElement("a");
  anchor.setAttribute("href", "#");

  const clear = document.createElement("span");
  clear.classList.add("material-symbols-outlined");
  clear.innerText = "clear";

  clear.addEventListener("click", () => {
    characters.splice(index);

    const badgeSection = document.querySelector(".badge-section");
    badgeSection.innerHTML = "";
    badgeSection.appendChild(badgeList());
  });

  parentSpan.appendChild(text);
  parentSpan.appendChild(vrSpan);
  parentSpan.appendChild(anchor);
  parentSpan.appendChild(clear);

  return parentSpan;
}
function badgeList() {
  const container = document.createElement("div");
  container.classList.add("badge-list-container");

  for (const i in characters) {
    container.appendChild(badge(i, characters[i]));
  }
  return container;
}

function inputMessage(data) {
  const messageBox = document.createElement("div");
  messageBox.classList.add("user-message");
  if (data.key != "characters") {
    const form = createStoryPromptForm(data.label, data.key);
    messageBox.appendChild(form);
    form.addEventListener("submit", async (event) => {
      const parent = messageBox.parentElement;
      event.preventDefault();
      const formData = new FormData(event.target);
      prompt[data.key] = formData.get(data.key);
      if (parent) {
        parent.removeChild(messageBox);
      }
      form.reset();
      const nextStep = botChat.shift();
      const userChat = {
        writer: "user",
        text: prompt[data.key],
      };
      chat.push(userChat);
      parent.appendChild(message(userChat));
      chat.push(nextStep);
      parent.appendChild(message(nextStep));
      if (botChat.length == 0) {
        try {
          const storyResponse = await API.story.write(prompt);
          const storyId = storyResponse.result;
          const storyPrompt = await API.story.chatbot(storyId);
          sessionStorage.setItem(
            `story_prompt_${storyId}`,
            JSON.stringify(storyPrompt)
          );
          window.location.href = `/write.html?p=${storyId}`;
        } catch (e) {
          console.log(e);
          parent.appendChild(
            message({
              writer: "bot",
              text: "프롬프트 생성에 실패했습니다!",
            })
          );
        }
        return;
      }
      parent.appendChild(
        inputMessage({
          label: nextStep.label,
          key: nextStep.key,
        })
      );

      window.scroll({
        top: document.body.scrollHeight,
        behavior: "smooth", // 부드러운 스크롤을 원할 경우 추가 (선택 사항)
      });
    });
  } else {
    const form = createStoryPromptCharacterForm();
    messageBox.appendChild(form);

    const badgeSection = document.createElement("section");
    badgeSection.classList.add("badge-section");
    messageBox.appendChild(badgeSection);
    const submitSection = document.createElement("section");
    submitSection.classList.add("submit-section");
    messageBox.appendChild(submitSection);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const parent = messageBox.parentElement;
      const formData = new FormData(event.target);
      const characterData = {
        name: formData.get("name"),
        age_range: formData.get("age_range"),
        is_male: formData.get("gender") == "남자" ? true : false,
        description: formData.get("description"),
        description_img: formData.get("description_img"),
      };
      characters.push(characterData);
      badgeSection.innerHTML = "";
      badgeSection.appendChild(badgeList());
      form.reset();
      if (!submitSection.innerHTML.length) {
        const submitButton = document.createElement("button");
        submitButton.setAttribute("class", "btn btn-primary");
        submitButton.textContent = "작성 완료";

        submitSection.appendChild(submitButton);
        submitSection.addEventListener("click", () => {
          prompt[data.key] = characters;
          if (parent) {
            parent.removeChild(messageBox);
          }
          form.reset();
          const nextStep = botChat.shift();
          const userChat = {
            writer: "user",
            text: characters.map((e) => e.name),
          };
          chat.push(userChat);
          parent.appendChild(message(userChat));
          chat.push(nextStep);
          parent.appendChild(message(nextStep));
          parent.appendChild(
            inputMessage({
              label: nextStep.label,
              key: nextStep.key,
            })
          );
        });
      }

      window.scroll({
        top: document.body.scrollHeight,
        behavior: "smooth", // 부드러운 스크롤을 원할 경우 추가 (선택 사항)
      });
    });
  }
  return messageBox;
}

export function storyCreatePage() {
  const container = document.createElement("div");
  container.classList.add("chat-box");
  for (const i in chat) {
    container.appendChild(message(chat[i]));
  }
  container.appendChild(
    inputMessage({
      label: chat[chat.length - 1].label,
      key: chat[chat.length - 1].key,
    })
  );
  return container;
}
