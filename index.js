const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogFlow');
const youtube = require('./youtube');

const token = '1318640746:AAHSQh0QKZ_KfJ0Az-wtR2d-WltbLT-q3Kk';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const { id } = msg.chat;
  const chatId = id;
  let textResponse = '';

  if (!msg.text.includes('start')) {
    const dfResponse = await dialogflow.sendMessage(
      chatId.toString(),
      msg.text
    );
    textResponse = dfResponse.text;

    if (dfResponse.intent === 'Body-Builder') {
      textResponse = await youtube.searchVideoURL(
        msg.text,
        textResponse,
        dfResponse.fields.corpo.stringValue
      );
    }
  } else {
    textResponse = 'Comece a buscar seus treinos enviando "treino de braços"';
  }

  bot.sendMessage(chatId, textResponse);
});
