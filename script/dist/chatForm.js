import { appendChild, createElement } from "./helpers.js";

export const chatBotForm = () => {
  const chatForm = createElement('form', 'chat__form');
  chatForm.id = 'chat-bot-form';
  const textarea = createElement('textarea', 'chat__input');
  textarea.name = 'message_chat_bot';
  textarea.id = 'message_chat_bot';
  textarea.cols = '30';
  textarea.rows = '10';
  textarea.placeholder = 'Savolingiz...';
  const chatFormBtns = createElement('div', 'chat__form-btns');
  const chatFormSendBtn = createElement('button', 'chat__form-send-btn');
  const chatFormSendVoiceBtn = createElement('button', 'chat__form-send-voice-btn');

  appendChild(chatFormBtns, chatFormSendBtn, chatFormSendVoiceBtn);
  appendChild(chatForm, textarea, chatFormBtns)

  return chatForm;
}