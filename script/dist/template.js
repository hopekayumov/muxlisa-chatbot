import { chat } from "./chat.js";
import { chatBotOpenBtn } from "./chatBotOpenBtn.js";
import { header } from "./header.js";
import { appendChild, createElement } from "./helpers.js";

export function template() {
    const content = document.createDocumentFragment();
    const chatBotContainer = createElement('div', 'chat-bot__container');
    const headerElement = header();
    const chatElement = chat();
    const chatBotBtns = chatBotOpenBtn();

    appendChild(chatBotContainer, headerElement, chatElement);
    appendChild(content, chatBotContainer, chatBotBtns);

    return content;
}