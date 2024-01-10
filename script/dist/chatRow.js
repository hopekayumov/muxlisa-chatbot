import {appendChild, createElement} from "./helpers.js";

export const chatRow = (leftRight = 'right', message = '', redirectLink = '', linkText = '') => {
    const row = createElement('div', 'chat__row');
    const messageDate = createElement("div", 'message_date')
    const messageContent = createElement('div', `chat__${leftRight}`, leftRight === 'left' ? '' : message);

    if (leftRight === 'left') {
        const chatBotIcon = createElement('div', 'chat__bot-icon');
        const chatText = createElement('div', 'chat__text');
        const b = createElement('b', '', 'Operator');
        const span = createElement('span', '', ' Muxlisa AI');
        const p = createElement('p', '', message);


        if (redirectLink !== '' && !Array.isArray(redirectLink)) {
            const text = linkText === '' ? redirectLink : linkText;
            const link = createElement('a', 'chat__link', text);
            link.setAttribute('href', redirectLink);
            link.target = '_blank';
            appendChild(chatText, b, span, p, link);
        } else if (Array.isArray(redirectLink) && redirectLink.length !== 0) {
            const linkWrap = createElement('div', 'chat__link-wrap');
            redirectLink.forEach((linkItem) => {
                const link = createElement('a', 'chat__link', linkItem);
                link.setAttribute('href', linkItem);
                link.target = '_blank';
                appendChild(linkWrap, link);
            });
            appendChild(chatText, b, span, p, linkWrap);
        } else {
            appendChild(chatText, b, span, p);
        }
        appendChild(messageContent, chatBotIcon, chatText);
    }

    if(leftRight === "right") {
        const userLocale = navigator.language;
        const isRussian = userLocale.startsWith('ru');

        const currentDate = new Date();
        const options = {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            ...(isRussian && { locale: 'ru' })
        };

        messageDate.textContent = currentDate.toLocaleDateString(userLocale, options);
        messageDate.style.fontSize = "12px"
        messageContent.style.fontSize = "16px"
        messageDate.style.color = "#445069"

        messageContent.prepend(messageDate);
    }

    row.appendChild(messageContent);

    return row;
}