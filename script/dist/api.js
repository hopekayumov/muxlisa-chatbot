import {BASE_URL, getFirstParagraph, responseFormatter} from "./helpers.js";

let voiceMessage = null;
let voiceMessageAnswer = null;

export async function sendAudioAndConvert(audioBlob) {
    try {
        // STT API endpoint URL
        const sttURL = 'https://api.muxlisa.uz/v1/api/services/stt/';
        // TTS API endpoint URL
        const ttsURL = 'https://api.muxlisa.uz/v1/api/services/tts/';


        const sttFormData = new FormData();
        sttFormData.append('token', 'u0QbNDnxJGXCJOtRw5ZtfhnyBXxqs6GvUys_rpal');
        sttFormData.append('audio', audioBlob);

        const sttResponse = await axios.post(sttURL, sttFormData);

        if (sttResponse.status === 200) {
            const sttResultText = sttResponse.data.message.result.text;
            console.log(sttResultText)


            const ttsFormData = new FormData();
            ttsFormData.append('token', 'u0QbNDnxJGXCJOtRw5ZtfhnyBXxqs6GvUys_rpal');
            ttsFormData.append('text', getFirstParagraph(voiceMessageAnswer));
            console.log(voiceMessageAnswer)


            const ttsResponse = await axios.post(ttsURL, ttsFormData, {
                responseType: "blob"
            });

            const ttsAudioBlob = await ttsResponse.data;

            const audioElement = new Audio();
            audioElement.src = URL.createObjectURL(ttsAudioBlob);

            await audioElement.play();
            console.log(ttsAudioBlob)
            return {text: sttResultText, audio: ttsAudioBlob};
        } else {
            throw new Error('Failed to perform speech-to-text.');
        }
    } catch (error) {
        console.error('Error processing audio:', error);
        throw error;
    }
}

// export async function sentAudioResponse(text) {
//     try {
//         const URL = `https://api.muxlisa.uz/v1/api/services/tts/`;
//         const formData = new FormData();
//         formData.append('token', 'u0QbNDnxJGXCJOtRw5ZtfhnyBXxqs6GvUys_rpal')
//         formData.append('text', text);
//
//
//         const response = await axios.post(URL, formData);
//
//         if (response.status === 200) {
//             const responseData = response.data;
//             return responseData.message.result.text;
//         } else {
//             throw new Error('Failed to send audio.');
//         }
//     } catch (error) {
//         console.error('Error sending audio:', error);
//         throw error;
//     }
// }

export function sentMessage(message = '') {
    const URL = `${BASE_URL}/api/gov/gov-asisant/`;

    const content = voiceMessage ? voiceMessage : message;

    return axios.post(URL, {message: content}, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            voiceMessageAnswer = response.data
            console.log(getFirstParagraph(voiceMessageAnswer))
            return responseFormatter(response.data);
        })
        .catch(error => {
            console.error('Error sending message:', error);
            throw new Error('Failed to send message.');
        });
}


// with fetch
// export function sentMessage(message = '') {
//     const URL = BASE_URL + '/api/gov/gov-asisant/';

//     const body = JSON.stringify({
//         "message": message
//     });
//     return fetch(URL, {
//         headers: {
//             'Content-type': 'application/json'
//         },
//         method: 'POST',
//         body: body
//     });
// }