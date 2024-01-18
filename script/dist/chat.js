import { chatBotForm } from "./chatForm.js";
import { appendChild, createElement } from "./helpers.js";

export function chat() {
  const chatBotChat = createElement('div', 'chat-bot__chat');
  const chat = createElement('div', 'chat');
  const chatContent = createElement('div', 'chat__content');
  const chatRow = createElement('div', 'chat__row');
  const chatLeft = createElement('div', 'chat__left');
  const chatBotIcon = createElement('div', 'chat__bot-icon');
  const chatText = createElement('div', 'chat__text');
  const b = createElement('b', '', 'Operator ');
  const span = createElement('span', 'chat__text-operator', 'Muxlisa AI');

  // Greeting
  const chatGreetingTitle = createElement("div", "greetingTitle","Assalomu Alaykum ");
  const chatGreetingIcon = createElement("div", "wave", "👋 ");
  const chatGreetingText = createElement("div", "greetingText", " Sizga qanday yordam bera olamiz?")
  const p = createElement('div', "greeting");
  appendChild(p, chatGreetingTitle, chatGreetingIcon, chatGreetingText)


  p.style.fontSize = "16px"
  const chatForm = chatBotForm();


  appendChild(chatText, b, span, p);

  appendChild(chatLeft, chatBotIcon, chatText);
  appendChild(chatRow, chatLeft);
  appendChild(chatContent, chatRow);
  appendChild(chat, chatContent, chatForm);
  appendChild(chatBotChat, chat);

  return chatBotChat;
}
