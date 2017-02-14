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
            if(response.score > 50) {
                session.endConversation(response.answer);
            } else if (response.score > 0) {
                session.send(`I'm not exactly sure if this is right, but here is what I know.`);
                session.endConversation(response.answer);
            } else {
                session.endConversation(`Sorry, I don't have the answer to that question.`);
            }
        }
    }).setHeader('Ocp-Apim-Subscription-Key', process.env.SUBSCRIPTION_KEY);
};