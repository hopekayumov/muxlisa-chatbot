import { BASE_URL, responseFormatter } from "./helpers.js";

let voiceMessage = null
export async function sentAudio(audioBlob) {
    try {
        const URL = `https://api.muxlisa.uz/v1/api/services/stt/`;
        const formData = new FormData();
        formData.append('token', 'u0QbNDnxJGXCJOtRw5ZtfhnyBXxqs6GvUys_rpal')
        formData.append('audio', audioBlob);

        console.log(formData.get("audio"))

        const response = await axios.post(URL, formData);

        if (response.status === 200) {
            const responseData = response.data;
            console.log();
            voiceMessage = responseData.message.result.text
            return responseData.message.result.text;
        } else {
            throw new Error('Failed to send audio.');
        }
    } catch (error) {
        console.error('Error sending audio:', error);
        throw error;
    }
}

export function sentMessage(message = '') {
    const URL = `${BASE_URL}/api/gov/gov-asisant/`;

    const content = voiceMessage ? voiceMessage : message;

    return axios.post(URL, { message: content }, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
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