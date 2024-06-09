const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router();

router.post("/", optionController.create);
router.get("/", optionController.findAll);
router.get("/:id", optionController.findById);
router.delete("/:id", optionController.removeById);
router.put("/:id", optionController.update);
router.get("/by-category/:categoryId", optionController.findByCategoryId);
router.get("/by-category-slug/:slug", optionController.findByCategorySlug);

module.exports = {
  OptionRouter: router,
};
