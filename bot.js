const builder = require('botbuilder');

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector, require('./qadialog.js'));

bot.recognizer(new builder.LuisRecognizer(process.env.LUIS_MODEL));
bot.dialog('LostRunner', require('./luis.js'))
    .triggerAction({matches:'LostRunner'});

module.exports = bot;