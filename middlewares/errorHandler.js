export const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(404).send({
      status: "Error",
      error: `Resource is not found`,
    });
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    const arrayIntoString = message.join(",");
    return res.status(400).send({ status: "Error", error: arrayIntoString });
  }

  if (err.code === 11000) {
    return res
      .status(409)
      .send({ status: "Error", error: "Dublicate value entered" });
  }

  res.status(err.status || 500).send({ status: "Error", error: err.message });
};
