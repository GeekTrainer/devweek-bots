'use strict';

const request = require('request');

module.exports = (session, args, next) => {
    session.sendTyping();
    const question = session.message.text;
    const bodyText = JSON.stringify({question: question});
    const uri = `https://westus.api.cognitive.microsoft.com/qnamaker/v1.0/knowledgebases/${process.env.KBID}/generateAnswer`;
    console.log(uri);

    request.post(uri, { body: bodyText }, (err, code, body) => {
        if(err) {
            console.log(err);
            session.endConversation('Sorry, something went wrong.');
        } else {
            const response = JSON.parse(body);

        }
    }).setHeader('Ocp-Apim-Subscription-Key', process.env.SUBSCRIPTION_KEY);
};