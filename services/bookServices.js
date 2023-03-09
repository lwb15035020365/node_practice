const Book = require("../models/Book");
const { Op } = require('sequelize');

//新增
exports.addBook = async function (obj) {
  const ins = await Book.create(obj);
  return ins.toJSON();
};

//删除
exports.deleteBook = async function (id) {
  return await Book.destroy({
    where: {
      id,
    },
  });
};

//更新
exports.updateBook = async function (id, obj) {
  return await Book.update(obj, {
    where: {
      id,
    },
  });
};


//通过id获取
exports.getBookById = async function (id) {
  const result = await Book.findByPk(id);
  if (result) return result;
  return null;
}


//获取所有书籍（分页）
exports.getBooks = async function (page = 1, limit = 10, keywords = "") {
  const result = await Book.findAndCountAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${keywords}%`,
          }
        },
        {
          author: {
            [Op.like]: `%${keywords}%`
          }
        }
      ]
    },
    offset: (page - 1) * limit,
    limit: +limit
  });
  return {
    total: result.count,
    data: JSON.parse(JSON.stringify(result.rows))
  }
}