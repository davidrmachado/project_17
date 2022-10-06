const fs = require('fs');

const router = require('express').Router();

const path = require('path');

const talkerpath = path.resolve(__dirname, '../talker.json');

router.get('/', async (_req, res) => {
    try {
      const data = await fs.readFileSync(talkerpath);
      res.status(200).json(JSON.parse(data));
      return data;
  } catch (error) {
    console.error(`Erro na leitura do arquivo: ${error}`);
  }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    try {
      const data = fs.readFileSync(talkerpath);
      const talkerData = JSON.parse(data).find((talker) => talker.id === Number(id));
      if (talkerData) {
        res.status(200).json(talkerData);
      } else {
        res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
    } catch (error) {
      console.error(`Erro na leitura do arquivo: ${error}`);
    }
});

module.exports = router;
