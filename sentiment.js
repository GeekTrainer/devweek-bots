'use strict';

const request = require('request');
const builder = require('botbuilder');

module.exports = [
    (session, args, next) => {
        builder.Prompts.text(session, 'What did you think of this event?');
    },
    (session, results, next) => {
        const requestBody = {
            "documents": [
                {
                    "language": "en",
                    "id": "sample-bot",
                    "text": results.response
                }
            ]
        };

        request.post('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
            { body: JSON.stringify(requestBody) },
            (err, code, responseBody) => {
                const sentimentResponse = JSON.parse(responseBody);
                const score = sentimentResponse.documents[0].score;
                if(score > .5) session.endConversation(`Glad you had a great time!`);
                else session.endConversation(`Sorry you didn't like it.`);
            })
            .setHeader('Ocp-Apim-Subscription-Key', process.env.SENTIMENT_KEY)
    }
];