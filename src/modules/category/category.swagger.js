/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category module and routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *              CreateCategory:
 *                  type: object
 *                  required:
 *                      -   name
 *                      -   icon
 *                  properties:
 *                      name:
 *                          type: string
 *                          default: ""
 *                      slug:
 *                          type: string
 *                          default: ""
 *                      icon:
 *                          type: string
 *                          default: ""
 *                      parent:
 *                          type: string
 *                          default: ""
 */

/**
 * @swagger
 *
 * /category:
 *  post:
 *      summary: create new category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateCategory"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateCategory"
 *      responses:
 *          201:
 *              description: created
 */

/**
 * @swagger
 *
 * /category:
 *  get:
 *      summary: get all categories
 *      tags:
 *          -   Category
 *      responses:
 *          200:
 *              description: success
 */
