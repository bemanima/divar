const autoBind = require("auto-bind");
const createHttpError = require("http-errors");

const { OptionMessage } = require("./option.message");
const OptionModel = require("./option.model");
const { default: slugify } = require("slugify");
const categoryService = require("../category/category.service");
const { isValidObjectId } = require("mongoose");
const { isTrue, isFalse } = require("../../common/utils/functions");

class OptionService {
  #model;
  #categoryService;

  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryService = categoryService;
  }

  async create(optionDto) {
    const category = await this.#categoryService.checkExistsById(
      optionDto.category
    );

    optionDto.category = category._id;

    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: "_",
      lower: true,
    });

    await this.alreadyExistsByCategoryAndKey(optionDto.key, category._id);

    if (optionDto?.enum && typeof optionDto.enum === "string") {
      optionDto.enum = optionDto.enum.split(",");
    } else if (!Array.isArray(optionDto.enum)) optionDto.enum = [];

    if (isTrue(optionDto?.required)) optionDto.required = true;

    if (isFalse(optionDto?.required)) optionDto.required = false;

    const option = await this.#model.create(optionDto);

    return option;
  }

  async update(id, optionDto) {
    const existOption = await this.checkExistsById(id);

    if (optionDto.category && isValidObjectId(optionDto.category)) {
      const category = await this.#categoryService.checkExistsById(
        optionDto.category
      );
      optionDto.category = category._id;
    } else {
      delete optionDto.category;
    }

    if (optionDto.key) {
      optionDto.key = slugify(optionDto.key, {
        trim: true,
        replacement: "_",
        lower: true,
      });

      const categoryId = optionDto?.category ?? existOption.category;

      await this.alreadyExistsByCategoryAndKey(optionDto.key, categoryId);
    }

    if (optionDto?.enum && typeof optionDto.enum === "string") {
      optionDto.enum = optionDto.enum.split(",");
    } else if (!Array.isArray(optionDto.enum)) delete optionDto.enum;

    if (isTrue(optionDto?.required)) optionDto.required = true;
    else if (isFalse(optionDto?.required)) optionDto.required = false;
    else delete optionDto?.required;

    return await this.#model.updateOne({ _id: id }, { $set: optionDto });
  }

  async findAll() {
    const options = await this.#model
      .find({}, { __v: 0 }, { sort: "-1" })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);

    return options;
  }

  async findById(id) {
    return await this.checkExistsById(id);
  }

  async removeById(id) {
    await this.checkExistsById(id);

    return await this.#model.deleteOne({ _id: id });
  }

  async findByCategoryId(categoryId) {
    return await this.#model
      .find({ category: categoryId }, { __v: 0 }, { sort: "-1" })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
  }

  async findByCategorySlug(slug) {
    return await this.#model.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $addFields: {
          categorySlug: "$category.slug",
          categoryName: "$category.name",
          categoryIcon: "$category.icon",
        },
      },
      {
        $project: {
          category: 0,
          __v: 0,
        },
      },
      {
        $match: {
          categorySlug: slug,
        },
      },
    ]);
  }

  async checkExistsById(id) {
    const category = await this.#model.findById(id);

    if (!category) throw new createHttpError.NotFound(OptionMessage.NotFound);

    return category;
  }

  async alreadyExistsByCategoryAndKey(key, category) {
    const isExist = await this.#model.findOne({ category, key });

    if (isExist)
      throw new createHttpError.Conflict(OptionMessage.AlreadyExists);

    return null;
  }
}

module.exports = new OptionService();
