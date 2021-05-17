const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://api.datamuse.com'
});

const partsOfSpeach = {
  n: 'noun',
  v: 'verb',
  adj: 'adjective',
  adv: 'adverb'
};

export const oxfordAPI = {
  async search(text) {
    const res = await instance.get(`/words?max=10&md=d,p,r&ipa=1&sp=${text}*`);

    return res.data
      .map(item => {
        return {
          ...item,
          defs: item.defs ? item.defs.map(i => i.replace(/^.+\t/g, '')) : [],
          tags: item.tags.reduce(
            (acc, tag) => {
              if (partsOfSpeach[tag] && partsOfSpeach[tag] !== 'noun') {
                acc.part_of_speach = partsOfSpeach[tag];
              }
              if (tag.match(/ipa_pron/)) {
                acc.ipa_pron = `[ ${tag.replace(/ipa_pron:/, '')} ]`;
              }
              return acc;
            },
            { part_of_speach: 'noun' }
          )
        };
      })
      .sort((a, b) => a.word.localeCompare(b.word));
  }
};
