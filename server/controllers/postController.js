//const mongoose = require("mongoose");
//Схемы документов
const Post = require("../Mongoose/post");
//Подключение к базе
// const mongoconnect = "mongodb://trepachev:Pervil-9@localhost:27017/trtest1";
// const mongoconnectoptions = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// };

module.exports = {
  //принять изменения пользователя
  selectPostStr: (req, res) => {
    console.log(
      `Поиск поста содержащего следующую строку:${req.query.findstr}`
    );
    let findStr = req.query.findstr;
    //mongoose.connect(mongoconnect, mongoconnectoptions);
    Post.find(function (error, listPost) {
      if (error) {
        console.log("Ошибка!!!");
        return console.error(error);
      } else {
        console.log("нет ошибки");
        let filteredListPost = [];
        let reg = new RegExp(`${findStr}`, "i");
        listPost.forEach((elem) => {
          if (reg.test(elem.textPost)) {
            filteredListPost.push(elem);
          }
        });
        return res.status(200).json({
          filteredListPost,
        });
      }
    });
  },
  changePost: (req, res) => {
    console.log(`Изменения поста с id:${req.params.id} применены`);

    // подключение
    //mongoose.connect(mongoconnect, mongoconnectoptions);

    Post.updateOne(
      { _id: req.params.id },
      { textPost: req.body.textPost },
      function (err, result) {
        mongoose.disconnect();
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          return res.status(200).json({
            mmm: "всё хорошо!!",
          });
        }
      }
    );
  },
  ///////////////////////////////////////////////////////////////

  addPost: async (req, res) => {
    console.log("Добавление сообщения в базу");
    // подключение
    //await mongoose.connect(mongoconnect, mongoconnectoptions);

    const addPost = new Post({
      textPost: req.body.textPost,
    });
    await addPost.save(function (err) {
      if (err) {
        console.log(`Ошибка при добавлении поста ${addPost}`);
        console.log(err);
        return res
          .status(404)
          .json({ message: "Ошибка при добавлении поста в базу" });
      } else {
        console.log(`Сохранен объект:${addPost}`);
        return res.status(200).json({
          addPost,
        });
      }
    });
    //mongoose.disconnect();???????????????????
  },
  deletePost: (req, res) => {
    const id = req.params.id;

    //mongoose.connect(mongoconnect, mongoconnectoptions);
    Post.findByIdAndDelete(id, function (err, post) {
      //mongoose.disconnect();

      if (err) return console.log(err);

      console.log("Удален Post ", post);
      res.status(200).json({
        message: "Сообщение успешно удалено",
      });
    });
  },
  //Получение списка всех постов из базы ////////////
  listPost: (req, res) => {
    console.log("Получение списка сообщений из базы");
    //mongoose.connect(mongoconnect, mongoconnectoptions);
    Post.find(function (error, listPost) {
      if (error) {
        console.log("Ошибка!!!");
        return console.error(error);
      } else {
        console.log("нет ошибки");
        return res.status(200).json({
          listPost,
        });
      }
    });
    // mongoose.disconnect();
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  //получаем post по его id
  selectPostId: (req, res) => {
    const post_id = req.params.id;
    console.log(post_id);
    // подключение
    // mongoose.connect(mongoconnect, mongoconnectoptions);

    Post.findById(post_id, function (err, post) {
      // mongoose.disconnect();
      if (err) {
        console.log(err);
        return res.status(222);
      } else {
        console.log("Пост успешно выбран по id");

        return res.json({
          post,
        });
      }
    });
  },
};
