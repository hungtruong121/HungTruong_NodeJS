const express = require('express');
const router = express.Router();

const controller = require('../controller/film.controller');

router.post('/', controller.postFilm);
router.get('/', controller.getFilm);
router.get('/page/:no', controller.getOnePage);
router.get('/:id', controller.getFilmById);
router.delete('/:id', controller.deleteFilm);
router.put('/:id', controller.updateFilm);

module.exports = router;