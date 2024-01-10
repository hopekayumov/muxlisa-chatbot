import { appendChild, createElement } from './helpers.js';

export function header() {
  const chatBotTop = createElement('div', 'chat-bot__top');
  const chatBotLogo = createElement('div', 'chat-bot__logo');
  const title = createElement('h4', 'chat-bot__title', 'Salom Mehmon');
  const subText = createElement('p', 'chat-bot__subtext', `Menga o'zingiz qiziqtirgan savollaringizni berishingiz mumkin`);
  const chatBotCloseBtn = createElement('button', 'chat-bot__close-btn');
  chatBotCloseBtn.dataset.close = 'true';
  
  appendChild(chatBotTop, chatBotLogo, title, subText, chatBotCloseBtn);

  return chatBotTop;
}