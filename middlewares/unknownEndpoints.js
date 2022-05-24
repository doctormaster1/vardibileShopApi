export const unknownEndpoint = () => {
  const error = new Error("Bilinmeyen Endpoint");
  error.status = 404;
  throw error;
};
