const autoBind = require("auto-bind");

const PostModel = require("./post.model");
const createHttpError = require("http-errors");
const { PostMessage } = require("./post.message");
const OptionModel = require("../option/option.model");

class CategoryService {
  #model;
  #optionModel;

  constructor() {
    autoBind(this);
    this.#model = PostModel;
    this.#optionModel = OptionModel;
  }

  async create(dto) {
    return await this.#model.create(dto);
  }

  async getCategoryOption(categoryId) {
    const options = await this.#optionModel.find({ category: categoryId });

    return options;
  }

  async checkExistsById(id) {
    const post = await this.#model.findById(id);

    if (!post) throw new createHttpError.NotFound(PostMessage.NotFound);

    return post;
  }
}

module.exports = new CategoryService();
