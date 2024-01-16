import {appendChild, BASE_URL, getFirstParagraph} from "./helpers.js";
import {chatRow} from "./chatRow.js";


let voiceMessage = null;
let voiceMessageAnswer = null;

export async function sendAudioAndConvert(audioBlob) {
    try {
        const sttURL = 'https://api.muxlisa.uz/v1/api/services/stt/';
        const ttsURL = 'https://api.muxlisa.uz/v1/api/services/tts/';

        const sttFormData = new FormData();
        sttFormData.append('token', 'u0QbNDnxJGXCJOtRw5ZtfhnyBXxqs6GvUys_rpal');
        sttFormData.append('audio', audioBlob);

        const sttResponse = await axios.post(sttURL, sttFormData);

        if (sttResponse.status === 200) {
            const sttResultText = sttResponse.data.message.result.text;

            const ttsFormData = new FormData();
            ttsFormData.append('token', 'u0QbNDnxJGXCJOtRw5ZtfhnyBXxqs6GvUys_rpal');
            const response = await sentMessage(sttResultText);
            ttsFormData.append('text', getFirstParagraph(response.assistant?.main_response));

            const ttsResponse = await axios.post(ttsURL, ttsFormData, {responseType: "blob"});
            const ttsAudioBlob = await ttsResponse.data;

            const audioElement = new Audio();
            audioElement.src = URL.createObjectURL(ttsAudioBlob);

            await audioElement.play();

            return {text: sttResultText, audio: ttsAudioBlob};
        } else {
            throw new Error('Failed to perform speech-to-text.');
        }
    } catch (error) {
        console.error('Error processing audio:', error);
        throw error;
    }
}

export async function sentMessage(message = '') {
    const chatList = document.body.querySelector(".chat__content");
    const botMessageRow = chatRow("left", "", "", "", true);
    appendChild(chatList, botMessageRow);
    const URL = `${BASE_URL}/api/gov/gov-asisant/`;
    try {
        const response = await axios.post(URL, {message: message}, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        voiceMessageAnswer = response.data;
        return voiceMessageAnswer;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    } finally {
        if (chatList.contains(botMessageRow)) {
            chatList.removeChild(botMessageRow);
        }
    }
}
