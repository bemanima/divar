const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const categoryService = require("../category/category.service");
const { Types } = require("mongoose");
const { PostMessage } = require("./post.message");
const { getAddressDetail } = require("../../common/utils/http");
const { removePropertyInObject } = require("../../common/utils/functions");
const utf8 = require("utf8");

class PostController {
  #service;
  #categoryModel;
  #categoryService;

  constructor() {
    autoBind(this);
    this.#service = postService;
    this.#categoryModel = CategoryModel;
    this.#categoryService = categoryService;
  }

  async createPostPage(req, res, next) {
    try {
      let { slug } = req.query;
      let showBack = false;
      let match = { parent: null };

      let categories, category;
      let options;

      if (slug) {
        slug = slug.trim();

        category = await this.#categoryService.checkExistsBySlug(slug);

        options = await this.#service.getCategoryOption(category._id);

        if (options.length === 0) options = null;

        match = {
          parent: category._id,
        };
        showBack = true;
      }

      categories = await this.#categoryModel.aggregate([
        {
          $match: match,
        },
      ]);

      res.render("./pages/panel/create-post.ejs", {
        categories,
        showBack,
        category,
        options,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const {
        title_post: title,
        description: content,
        lat,
        lng,
        category,
      } = req.body;

      const images = req?.files?.map((image) => image?.path?.slice(7));
      const { address, city, district, province } = await getAddressDetail(
        lat,
        lng
      );

      const options = removePropertyInObject(req.body, [
        "title_post",
        "description",
        "lat",
        "lng",
        "category",
        "images",
      ]);

      for (let key in options) {
        const value = options[key];

        delete options[key];
        key = utf8.decode(key);

        options[key] = value;
      }

      await this.#service.create({
        title,
        content,
        coordinate: [lat, lng],
        category: new Types.ObjectId(category),
        images,
        options,
        address,
        province,
        city,
        district,
      });

      res.json({
        message: PostMessage.Created,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
