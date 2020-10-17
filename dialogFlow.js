const dialogFlow = require('dialogflow');

const configs = require('./configs/claudia-heindrick-bot');

const { project_id, private_key, client_email } = configs;

const sessionClient = new dialogFlow.SessionsClient({
  projectId: project_id,
  credentials: {
    private_key: private_key,
    client_email: client_email,
  },
});

async function sendMessage(chatId, message) {
  const sessionPath = sessionClient.sessionPath(project_id, chatId);
  const request = {
    session: sessionPath,
    queryInput: {},
  };

  const textQueryInput = {
    text: {
      text: message,
      languageCode: 'pt-BR',
    },
  };

  const eventQueryInput = {
    event: {
      name: 'start',
      languageCode: 'pt-BR',
    },
  };

  request.queryInput = message === '/start' ? eventQueryInput : textQueryInput;

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  const { fulfillmentText, intent, parameters } = result;
  const { displayName } = intent;
  const { fields } = parameters;

  return {
    text: fulfillmentText,
    intent: displayName,
    fields: fields,
  };
}

//sendMessage('123123', 'oi');
module.exports.sendMessage = sendMessage;
