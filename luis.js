'use strict';

const builder = require('botbuilder');

module.exports = [
    (session, args, next) => {
        const location = builder.EntityRecognizer.findEntity(args.intent.entities, 'location');

        if(location) {
            next({response: location.entity});
        } else {
            builder.Prompts.text(session, 'Where was it?');
        }
    },
    (session, results, next) => {
        // the location will be in results.response
        const location = results.response;
        session.endConversation(`We'll start looking near ${location}`);
    },
]