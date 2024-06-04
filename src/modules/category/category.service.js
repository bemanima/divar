const autoBind = require("auto-bind");

const CategoryModel = require("./category.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const { CategoryMessage } = require("./category.message");
const { default: slugify } = require("slugify");

class CategoryService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
  }

  async create(categoryDto) {
    if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
      const existCategory = await this.checkExistsById(categoryDto.parent);

      categoryDto.parent = existCategory._id;
      categoryDto.parents = [
        ...new Set(
          [existCategory._id.toString()]
            .concat(existCategory.parents.map((id) => id.toString()))
            .map((id) => new Types.ObjectId(id))
        ),
      ];
    }

    if (categoryDto?.slug) {
      categoryDto.slug = slugify(categoryDto.slug);

      await this.alreadyExistsBySlug(categoryDto.slug);
    } else {
      categoryDto.slug = slugify(categoryDto.name);
    }

    const category = await this.#model.create(categoryDto);

    return category;
  }

  async findAll() {
    return await this.#model.find({
      parent: { $exists: false },
    });
  }

  async checkExistsById(id) {
    const category = await this.#model.findById(id);

    if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);

    return category;
  }

  async checkExistsById(id) {
    const category = await this.#model.findById(id);

    if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);

    return category;
  }

  async checkExistsBySlug(slug) {
    const category = await this.#model.findOne({ slug });

    if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);

    return category;
  }

  async alreadyExistsBySlug(slug) {
    const category = await this.#model.findOne({ slug });

    if (category)
      throw new createHttpError.Conflict(CategoryMessage.AlreadyExists);

    return null;
  }
}

module.exports = new CategoryService();
