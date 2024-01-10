import { BASE_URL, responseFormatter } from "./helpers.js";

// const MOCK_RESPONSE = {
//     "assistant": {
//         "main_response": {
//             "response": "Xorijga doimiy yashashga chiqishni rasmiylashtirish uchun O‘zbekiston Respublikasining xorijdagi diplomatik vakolatxona va konsullik muassasasiga murojaat qilishingiz mumkin. Bu xizmat orqali ariza beruvchi chet elda doimiy yashashga qolishi uchun murojaat qilishi mumkin. Xizmat mutlaqo bepuldir. Arizalar bir ish kunida vakolatli organ tomonidan ko‘rib chiqiladi. Batafsil ma'lumot uchun quyidagi havolaga murojaat qiling: (",
//             "LinkText": "Xorijga doimiy yashashga chiqishni rasmiylashtirish",
//             "LinkURL": "https://my3.gov.uz/uz/service/864",
//             "Title": "Xorijga doimiy yashashga chiqishni rasmiylashtirish uchun O‘zbekiston Respublikasining xorijdagi diplomatik vakolatxona va konsullik muassasasiga murojaat qilishingiz mumkin. Bu xizmat orqali ariza beruvchi chet elda doimiy yashashga qolishi uchun murojaat qilishi mumkin. Xizmat mutlaqo bepuldir. Arizalar bir ish kunida vakolatli organ tomonidan ko‘rib chiqiladi."
//         },
//         "additional_services": [
//             {
//                 "response": "Xorijga doimiy yashashga chiqishni rasmiylashtirish Batafsil: Bu xizmat orqali ariza beruvchi chet elda doimiy yashashga qolishi uchun O‘zbekiston Respublikasining xorijdagi diplomatik vakolatxona va konsullik muassasasiga murojaat qilishi mumkin. Xizmat mutlaqo bepul. Arizalar bir ish kunida vakolatli organ tomonidan ko‘rib chiqiladi. link:",
//                 "LinkText": null,
//                 "LinkURL": null,
//                 "Title": "Xorijga doimiy yashashga chiqishni rasmiylashtirish"
//             },
//             {
//                 "response": "Chet tilini bilish darajasini aniqlash Batafsil: Xizmatdan foydalanib, o‘zingiz istagan chet tili uchun imtihon topshirishga ariza yuborishingiz mumkin. Imtihon kuni va joyi bilim va malakalarni baholash agentligi tomonidan arizaga ilova qilib beriladi.  link:",
//                 "LinkText": null,
//                 "LinkURL": "https://my3.gov.uz/uz/service/559",
//                 "Title": "Chet tilini bilish darajasini aniqlash"
//             },
//             {
//                 "response": "Xalqaro yo‘llarda tashish (XYT) daftarchasidan foydalanish uchun ruxsatnomani bekor qilish Batafsil: Xizmatdan foydalanib, xalqaro yo‘llarda tashish daftarchasidan foydalanish uchun ruxsatnomani bekor qilishingiz mumkin. Arizalar 2 ish kuni mobaynida O‘zbekiston Respublikasi Davlat bojxona qo‘mitasi tomonidan ko‘rib chiqiladi.  link:",
//                 "LinkText": null,
//                 "LinkURL": "https://my3.gov.uz/uz/service/556",
//                 "Title": "Xalqaro yo‘llarda tashish (XYT) daftarchasidan foydalanish uchun ruxsatnomani bekor qilish"
//             }
//         ]
//     }
// }

// with xhr
export function sentMessage(message = '') {
    return new Promise(function block(resolve, reject) {
        const xhr = new XMLHttpRequest();
        const URL = BASE_URL + '/api/gov/gov-asisant/';
        // const URL = 'https://jsonplaceholder.typicode.com/todos/';

        const body = JSON.stringify({
            "message": message
        });

        xhr.open('POST', URL, true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 400) {
                const response = JSON.parse(xhr.response || '{}');
                resolve(responseFormatter(response));
                // resolve(responseFormatter(response));
            } else {
                reject(`Ошибка соединения`);
            }
        };

        xhr.onerror = function () {
            reject(`Ошибка соединения`);
        };

        xhr.send(body);
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