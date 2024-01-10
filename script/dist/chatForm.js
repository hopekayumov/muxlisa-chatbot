import { appendChild, createElement } from "./helpers.js";
import { ChatBot } from "./chatBot.js";

export const chatBotForm = () => {
  let isRecording = false;
  let mediaRecorder = null;
  let recordedAudio = null;


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
  const recordAudioBtn = createElement('button', 'chat__form-send-voice-btn');

  recordAudioBtn.addEventListener('click', async () => {
    const chatBot = new ChatBot();
    await chatBot.recordAndSendAudio();
  });

  appendChild(chatFormBtns, chatFormSendBtn, recordAudioBtn);
  appendChild(chatForm, textarea, chatFormBtns);

  return chatForm;
}
