import { appendChild, createElement } from './helpers.js';

export function chatBotOpenBtn() {
    const chatBotBtns = createElement('div', 'chat-bot__btns');
    const openBtn = createElement('button', 'chat-bot__btn');
    openBtn.dataset.open = 'true';
    const closeBtn = createElement('button', 'chat-bot__btn');
    closeBtn.dataset.close = 'true';

    appendChild(chatBotBtns, openBtn, closeBtn);

    return chatBotBtns;
}