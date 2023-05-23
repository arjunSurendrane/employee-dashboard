function globalErrorHandling(app) {
  app.use(({ status, statusCode, content }, req, res, next) => {
    if (status == "fail") {
      res.status(statusCode).json({
        status,
        message: content,
      });
    } else {
      res.status(500).json({
        status: "error",
      });
    }
  });
}
export default globalErrorHandling;
