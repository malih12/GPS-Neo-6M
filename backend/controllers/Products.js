import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
export const getProducts = async (req, res) => {
  try {
    let respone;
    if (req.role == "admin") {
      respone = await Products.findAll({
        attributes: ['uuid','name','price'],
        include: [
          {
            model: Users,
            attributes: ['uuid','email']
          },
        ],
      });
    } else {
      respone = await Products.findAll({
        attributes: ['uuid','name','price'],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ['uuid','email']
          },
        ],
      });
    }
    res.status(200).json(respone);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProducstById = (req, res) => {};

export const createProducts = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Products.create({
      name: name,
      price: price,
      userId: req.userId,
    });
    res.status(201).json({ msg: "product sukses dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updategetProducts = (req, res) => {};

export const deletetProducts = (req, res) => {};
