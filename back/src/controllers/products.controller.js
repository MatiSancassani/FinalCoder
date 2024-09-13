import {
  getAllProductsService,
  getProductByIdService,
  addProductService,
  updateProductService,
  deleteProductService,
} from "../services/products.services.js";

import config from "../config.js";

export const getProduct = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(200).send({ origin: config.SERVER, payload: products });
  } catch (err) {
    res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    // const product = await getByIdService(pid);
    const product = await getProductByIdService(pid);
    if (!product) {
      res.status(404).send({ msg: "El producto no existe" });
    }
    res.status(200).send({ origin: config.SERVER, payload: product });
  } catch (err) {
    console.log("getById ->", err);
    res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const productBody = req.body;
    const thumbnail = req.file ? `${config.SERVER_UPLOAD_PATH}/${req.file.filename}` : '';
    const producto = { ...productBody, owner: req.user.email, thumbnail };

    const product = await addProductService(producto);
    res.status(200).send({
      origin: config.SERVER,
      payload: { msg: "Producto agregado exitosamente", product },
    });
  } catch (err) {
    console.log("add ->", err);
    res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const { _id, ...rest } = req.body;
    const { email } = req.user;

    const product = await getProductByIdService(pid);

    if (product.owner !== email) {
      return res.status(403).send({ msg: "No puedes editar un producto que no te pertenece" });
    } else {
      const producto = await updateProductService(pid, rest);
      res.status(200).send({ origin: config.SERVER, payload: { msg: "Producto editado", producto } });
    }

  } catch (err) {
    console.log("update ->", err);
    res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const { email, rol } = req.user;

    if (rol === "admin") {
      await ProductsRepository.removeProduct(pid);
      return res.status(200).send({ origin: config.SERVER, payload: { msg: "Producto eliminado" } });
    }

    const product = await getProductByIdService(pid);

    if (product.owner !== email) {
      return res.status(403).send({ msg: "No puedes eliminar un producto que no te pertenece" });
    } else {
      const producto = await deleteProductService(pid);
      res.status(200).send({ origin: config.SERVER, payload: { msg: "Producto eliminado", producto } });
    }
  } catch (err) {
    console.log("remove ->", err);
    res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
  }
};
