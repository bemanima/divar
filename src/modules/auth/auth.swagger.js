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
