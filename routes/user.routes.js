const express = require("express");
const {
  createUser,
  getUser,
  getAllUsers,
  login,
  deleteUser,
  update,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

const userRouter = express.Router();

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a user account
 *     description: Allows the creation of a new user's account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@email.com
 *               password:
 *                 type: string
 *                 example: 123gfghsdhfe67@
 *               name:
 *                 type: string
 *                 example: John Doe
 *               username:
 *                 type: string
 *                 example: johndoe123
 *               age:
 *                 type: integer
 *                 example: 12
 *             required:
 *               - email
 *               - password
 *               - name
 *               - username
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid data
 */
userRouter.post("/create", createUser);

userRouter.post("/login", login);
userRouter.get("/user", auth, getUser);
userRouter.get("/", getAllUsers);
/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Deletes a user account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid user ID
 */
userRouter.delete("/delete/:id", deleteUser);
userRouter.patch("/update/:id", update);

module.exports = userRouter;
