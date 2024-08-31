import { getUserByEmailService, registerUserService } from "../services/users.services.js";
import { createHash, isValidPassword } from "../utils/bcryptPassword.js";
import { generateToken } from "../utils/jsonwebtoken.js";
import { createCartService } from "../services/carts.services.js";

import config from "../config.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmailService(email);
    if (!user) return res.status(400).json({
      success: false,
      message: "Email incorrecto",
    })

    const validPassword = isValidPassword(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Password incorrecta",
      });
    }

    const { _id, name, lastName, rol, cart_id } = user;
    const jwt = generateToken({ _id, name, lastName, email, rol, cart_id });

    res.cookie("token", jwt, { httpOnly: true, secure: true, sameSite: 'None' });

    return res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      user: { _id, name, lastName, email, rol, cart_id },
      jwt,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error en el servidor. Por favor, inténtelo de nuevo más tarde.",
      error: err.message,
    })
  }
};

export const createUser = async (req, res) => {
  try {
    req.body.password = createHash(req.body.password);

    const cart = await createCartService();
    console.log(cart);
    req.body.cart_id = cart._id;

    const response = await registerUserService(req.body);

    const { _id, name, lastName, email, rol } = response;
    const jwt = generateToken({ _id, name, lastName, email, rol });

    res.status(200).send({ origin: config.SERVER, payload: response, jwt });
  } catch (err) {
    console.log(err);
    res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
  }
};
