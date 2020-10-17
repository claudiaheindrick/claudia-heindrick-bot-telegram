const YouTube = require('youtube-node');
const config = require('./configs/youtube-config');

const { key } = config;
const youtube = new YouTube();
youtube.setKey(key);

// youtube.search('Séries históricas', 5, (error, results) => {
//   if (!error) {
//     console.log(JSON.stringify(results));
//   } else {
//     console.log(JSON.stringify(error));
//   }
// });

async function searchVideoURL(searchMessage, message, queryText) {
  return new Promise((resolve, _) => {
    youtube.search(searchMessage, 4, function (error, result) {
      if (error) {
        resolve('Não foi possível encontrar um vídeo no momento');
      } else {
        const videoIds = result.items
          .map((item) => item.id.videoId)
          .filter((item) => item);

        const youtubeLinks = videoIds
          .map((videoId) => `https://www.youtube.com/watch?v=${videoId}`)
          .join(', ');

        resolve(`${message} ${youtubeLinks}`);
      }
    });
  });
}

module.exports.searchVideoURL = searchVideoURL;
