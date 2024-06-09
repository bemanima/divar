/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth module and routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: User mobile field
 *                      default: ""
 *          CheckOtp:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: User mobile field
 *                      default: ""
 *                  code:
 *                      type: string
 *                      description: User otp code
 *                      default: ""
 */

/**
 * @swagger
 *
 * /auth/send-otp:
 *  post:
 *      summary: login with OTP in this end-point
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/SendOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/SendOTP"
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /auth/check-otp:
 *  post:
 *      summary: check user otp code
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOtp"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOtp"
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /auth/logout:
 *  get:
 *      summary: logout user
 *      tags:
 *          -   Auth
 *      responses:
 *          200:
 *              description: success
 */
