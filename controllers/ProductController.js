import asyncHandler from "../middlewares/async";
import Product from "../models/ProductModel";
import cloudinary from "cloudinary";
import { NotFound } from "../utilis/NotFound";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export const getProducts = asyncHandler(async (req, res, next) => {
  const keyWord = req.query.keyWord;

  if (keyWord) {
    const searchItem = keyWord
      ? { name: { $regex: keyWord, $options: "i" } }
      : {};

    const searchProduct = await Product.find(searchItem);

    res.status(200).send({
      status: "success",

      data: { results: searchProduct, count: searchProduct.length },
    });
  } else {
    res.status(200).send({ status: "success", data: res.advanceResults });
  }
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).populate({
    path: "Reviews",
    select: "title text",
  });

  if (!product) throw NotFound(res);
  res.status(200).send({ status: "success", data: product });
});

export const createProduct = asyncHandler(async (req, res, next) => {
  if (!req.files)
    throw res.status(400).send({ status: "error", message: "Foto yok" });

  const file = JSON.parse(JSON.stringify(req.files)).files;
  const data = JSON.parse(req.body.data);

  if (!file.mimetype === "image/jpeg")
    throw res
      .status(400)
      .send({ status: "error", message: "Dosya tipi hatası" });

  if (file.size > process.env.FILE_UPLOAD_SIZE)
    throw res
      .status(400)
      .send({ status: "error", message: "Dosya boyutu hatası" });

  cloudinary.v2.uploader.upload(
    file.tempFilePath,
    {
      use_filename: true,
      folder: "products",
      upload_preset: "ml_default",
      format: "jpg",
      resource_type: "image",
    },
    async function (error, result) {
      if (error)
        throw res
          .status(409)
          .send({ status: "fail", message: "Oluşturma hatası" });

      const product = await Product.create({
        ...data,
        productImage: result.url,
      }).catch((e) => console.log(e));

      if (!product)
        throw res
          .status(400)
          .send({ status: "fail", message: "Ürün oluştutulamadı!" });
      res.status(200).send({ status: "success", data: product });
    }
  );
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const editProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true, runValidators: true }
  );

  if (!editProduct) throw NotFound(res);
  const updatedProduct = await Product.findById(req.params.productId);
  res.status(200).send({ status: "success", data: updatedProduct });
});

export const removeProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  if (!product) throw NotFound(res);

  await product.remove();
  res.status(200).send({ status: "success", message: "Ürün güncellendi!" });
});
