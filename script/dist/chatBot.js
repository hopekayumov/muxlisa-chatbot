import { sentMessage } from "./api.js";
import { chatRow } from "./chatRow.js";
import { appendChild, closeWithKeyDown } from "./helpers.js";
import { template } from "./template.js";

export class ChatBot {
    body = document.body;
    visible = false;

    constructor() {
        this.render();
    }

    render() {
        this.destroy();

        const chatBot = document.createElement("div");
        chatBot.id = "chat-bot";
        chatBot.className = "chat-bot";
        chatBot.dataset.visible = this.visible;
        // chatBot.insertAdjacentElement("beforeend", template());
        chatBot.appendChild(template());
        chatBot.addEventListener("click", this.handleClick.bind(this));
        this.chatBot = chatBot;
        this.body.insertAdjacentElement("beforeend", chatBot);

        this.scrollToBottom();
    }

    handleClick(event) {
        const { target } = event;
        const { open, close } = target.dataset;

        if (open) {
            this.open();
        } else if (close) {
            this.close();
        }
    }

    open() {
        this.chatBot.dataset.visible = 'true';
        const chatBotInput = this.chatBot.querySelector('#message_chat_bot');
        if (chatBotInput) {
            chatBotInput.focus()
        }
        this.formAddSubmitEvent();
        this.escapeCloseHandle(true);
    }

    close() {
        this.escapeCloseHandle(false);
        this.chatBot.dataset.animation = 'true';
        const timeoutId = setTimeout(() => {
            this.chatBot.dataset.visible = 'false';
            this.chatBot.dataset.animation = 'false';
        }, 450);
        // clearTimeout(timeoutId);
    }

    destroy() {
        this.body.querySelector("#chat-bot")?.remove();
        this.chatBot = null;
    }

    escapeClickHandle = closeWithKeyDown.bind(this);
    escapeCloseHandle(visible) {
        window.addEventListener("keyup", this.escapeClickHandle);

        if (!visible) {
            window.removeEventListener("keyup", this.escapeClickHandle);
        }
    }

    scrollToBottom() {
        const chat = this.chatBot.querySelector(".chat__content");
        if (chat) {
            chat.scrollTop = chat.scrollHeight;
        }
    }

    formAddSubmitEvent() {
        const form = this.body.querySelector("#chat-bot-form");
        const chatInput = form.querySelector("#message_chat_bot");

        if (form) {
            form.addEventListener("submit", (event) => {
                this.onSubmit.call(this, event);
            });
        }

        if (chatInput) {
            chatInput.addEventListener("keydown", (event) => {
                if (event.code === "Enter" || event.code === "NumpadEnter") {
                    event.preventDefault();
                    const args = {
                        target: form,
                        preventDefault: () => { },
                    };
                    this.onSubmit.call(this, args);
                }
            });
        }
    }

    async onSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const messageInput = form?.querySelector("#message_chat_bot");
        const messageInputValue = messageInput?.value ?? "";

        const chatList = form.previousElementSibling;

        if (messageInputValue && messageInputValue.trim()) {
            messageInput.value = "";
            const userMessageRow = chatRow("right", messageInputValue);
            appendChild(chatList, userMessageRow);
            this.scrollToBottom();
            try {
                const response = await sentMessage(messageInputValue);
                const {type, text} = response || {};
                if (type === 'string') {
                    const messageChatBot = text;
                    const botMessageRow = chatRow("left", messageChatBot);
                    appendChild(chatList, botMessageRow);
                } else if (type === 'object') {
                    const { responses } = response || {};
                    const rows = responses.map((responseItem) => {
                        const { text: messageText, linkUrl, linkText } = responseItem || { text: '', linkUrl: '', linkText: '' };
                        const botMessageRow = chatRow("left", messageText, linkUrl, linkText);
                        if (responseItem?.element) {
                            appendChild(botMessageRow.querySelector('.chat__text'), responseItem?.element);
                        }
                        return botMessageRow;
                    });
                    appendChild(chatList, ...rows);
                    this.scrollToBottom();
                } 
            } catch (error) {
                console.log(error);
            } finally {
                console.log("end.");
            }
        }
    }
}
