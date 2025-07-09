const router = require("express").Router();
const authController = require("../controllers/auth/authController");

router.post(
  "/login",
  authController.login
  // #swagger.tags =['Auth']
  // #swagger.summary = 'Login User'
  /*  #swagger.parameters['login'] ={
                            in: 'body',
                                description: 'Api to login user',
                                schema: {
                                $ref:'#/definitions/login'}
                            }  */
);

router.post(
  "/reset-password",
  authController.resetPassword
  // #swagger.tags =['Auth']
  // #swagger.summary = 'Reset Password'
  /*  #swagger.parameters['user'] = {
                              in: 'body',
                              description: 'Api to reset password',
                              schema: {$ref:'#/definitions/resetPassword'}
                      } */
);

router.post(
  "/register",
  authController.register
  // #swagger.tags =['Auth']
  // #swagger.summary = 'Register User'
  /*  #swagger.parameters['register'] = {
                              in: 'body',
                              description: 'Api to register user',
                              schema: {$ref:'#/definitions/register'}
                      } */
);
module.exports = router;
