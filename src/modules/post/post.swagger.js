/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post module and routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *              CreatePost:
 *                  type: object
 *                  required:
 *                      -   name
 *                      -   icon
 *                  properties:
 *                      name:
 *                          type: string
 *                          default: ""
 *                      icon:
 *                          type: string
 *                          default: ""
 */

/**
 * @swagger
 *
 * /post:
 *  post:
 *      summary: create new Post
 *      tags:
 *          -   Post
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CreatePost"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CreatePost"
 *      responses:
 *          201:
 *              description: created
 */
