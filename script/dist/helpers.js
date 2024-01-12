export function closeWithKeyDown(event) {
    const KEY = "Escape";
    if (event.code === KEY) {
        this.close();
    }
}

export function getFirstParagraph(text) {
    const pattern = /^(.*?)[\r\n]{2}/s;
    const match = pattern.exec(text);
    if (match) {
        return match[1].trim();
    } else {
        return text;
    }
}

export async function recordAudio() {
    const sendVoice = document.querySelector(".chat__form-send-voice-btn");

    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        const mediaRecorder = new MediaRecorder(stream);
        let recordedChunks = [];

        mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        return new Promise((resolve) => {
            mediaRecorder.onstop = function () {
                const audioBlob = new Blob(recordedChunks, {type: 'audio/wav'});
                const audioFile = new File([audioBlob], "voice.wav", {type: "audio/wav"});
                resolve(audioFile);
            };

            mediaRecorder.start();

            sendVoice.addEventListener("click", () => {
                if (sendVoice.hasAttribute("recorded")) {
                    mediaRecorder.stop();
                    console.log("stopped")
                }
            });

        });
    } catch (error) {
        console.error('Error recording audio:', error);
        throw error;
    }
}


export const BASE_URL = 'https://mygov-bot.empty.uz';
// export const BASE_URL = "http://192.168.1.122:8000";

export const createElement = (
    elementName,
    className = "",
    textContent = ""
) => {
    const element = document.createElement(elementName);
    element.className = className;
    element.textContent = textContent;
    return element;
};

export const appendChild = (element, ...childs) => {
    childs.forEach((child) => {
        element.appendChild(child);
    });
};

export const responseFormatter = ({assistant} = {assistant: ""}) => {
    const key = typeof assistant;

    function responsesRemoveNull(responses) {
        return responses.map((response) => {
            if (response?.element) {
                return response;
            }

            const newItem = {
                text: "",
                linkText: response.Title ?? '',
                linkUrl: response.Link ?? "",
            };
            return newItem;
        });
    }

    switch (key) {
        case "string": {
            return {
                type: "string",
                text: assistant,
            };
        }
        case "object": {
            const responses = responsesRemoveNull([
                {
                    element: insertTextLink(assistant?.main_response),
                },
                ...assistant?.additional_services,
            ]);

            return {
                type: "object",
                responses,
            };
        }
        default:
            return "";
    }
};


function insertTextLink(str = "") {
    const links = [];
    const regExp = /https:\/\/\S+/g;
    const firstPar = /^(.*?)[\r\n]{2}/s;
    const combinedRegExp = new RegExp(`(${regExp.source})|(${firstPar.source})`, 'g');

    const texts = str.split(regExp);

    const [resultLink] = regExp.exec(str) || [];

    function recursion(str = "") {
        if (resultLink) {
            const linkElement = createElement("a", "", resultLink);
            linkElement.href = resultLink;
            linkElement.target = '_blank';
            links.push(linkElement);
        }

        let testResult = str.replace(combinedRegExp, "");
        if (regExp.test(testResult)) {
            recursion(testResult);
        }
    }

    recursion(str);

    const parentElement = document.createElement("div");

    const element = createElement("a", "wrapper");
    const title = createElement("p", "chat__title");
    title.style.marginBottom = "5px"
    title.style.fontSize = "16px"

    element.style.textDecoration = "none"
    element.style.color = "#000"

    if (resultLink) {
        element.style.textDecoration = "none"
        element.style.color = "blue"
    }


    texts.forEach((text, index) => {
        element.insertAdjacentText("beforeend", text.replace(combinedRegExp, ""));
        title.textContent = getFirstParagraph(str);

        if (resultLink) {
            element.href = resultLink;
            element.target = '_blank';
        }


        if (links[index]) {
            parentElement.appendChild(title);
            parentElement.appendChild(element);
            appendChild(parentElement);
        }
    });

    if (resultLink) {
        return parentElement
    } else {
        return element
    }
}
