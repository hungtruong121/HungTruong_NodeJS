const { json } = require("body-parser");
const Film = require("../models/Film.model");

module.exports.postFilm = (req, res) => {
  console.log(req.body);
  const newFilm = new Film({
    page: req.body.page,
    name: req.body.name,
    link: req.body.link,
    author: req.body.author,
    show: true,
    hl: false
  });
  newFilm.save();
  console.log(json(newFilm))
  res.status(201).json(newFilm);
};

module.exports.getFilm = (req, res) => {
  Film.find({}, (err, films) => {
    if (err) throw err;

    res.status(200).send(films);
  });
};

module.exports.getFilmById = (req, res) => {
  const id = req.params.id;
  console.log(id)
  Film.find({ _id: id }, (err, film) => {
    if (err) console.log(err);
    res.status(200).send(film);
  });
};

module.exports.getOnePage = (req, res) => {
  const { no } = req.params;
  let moviesOnePage = [];
  Film.find({}, (err, films) => {
    if (err) throw err;
    moviesOnePage = films.filter((item, index) => {
      if (index < no * 5 && index >= (no - 1) * 5) return item;
    });
    res.status(200).send(moviesOnePage);
  });
};

module.exports.deleteFilm = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Film.find({ _id: id })
    .deleteOne()
    .exec((err, result) => {
      console.log('hello')
      if (err) console.log(err);

      console.log(result);
    })
  res.status(204).send(id);
};
module.exports.updateFilm = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const film = Film.where({ _id: id });

  if (film.name != req.body.name) {
    film.updateOne({ $set: { name: req.body.name } }).exec();
  }
  if (film.link != req.body.link) {
    film.updateOne({ $set: { link: req.body.link } }).exec();
  }
  if (film.author != req.body.author) {
    film.updateOne({ $set: { author: req.body.author } }).exec();
  }

  res.status(200).send(req.body);
};