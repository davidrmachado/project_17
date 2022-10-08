const fs = require('fs');

const router = require('express').Router();

const path = require('path');

const talkerpath = path.resolve(__dirname, '../talker.json');

const { validationAuthorization, validationName, validationAge,
  validationTalk, validationWatched, validationRate } = require('../middleware/validationTalker');

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

router.post('/',
  validationAuthorization,
  validationName,
  validationAge,
  validationTalk,
  validationWatched,
  validationRate,
  async (req, res) => {
    const resp = JSON.parse(fs.readFileSync(talkerpath));
    const id = resp.length + 1;
    const addedTalker = {
      id,
      ...req.body,
    };
    if (req.body) {
      await fs.writeFileSync(talkerpath, JSON.stringify([...resp, addedTalker]));
      return res.status(201).json(addedTalker);
    }
});

module.exports = router;
