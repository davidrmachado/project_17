const fs = require('fs');
const router = require('express').Router();
const path = require('path');

router.get('/', async (_req, res) => {
    try {
      const talkerpath = path.resolve(__dirname, '../talker.json');
      const data = await fs.readFileSync(talkerpath);
      res.status(200).json(JSON.parse(data));
      return data;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
});

module.exports = router;
