function globalErrorHandling(app) {
  app.use((err, req, res, next) => {
    let { status, statusCode, content, code } = err;
    if (status == "fail" || code == 11000) {
      statusCode = statusCode || 404;
      content = content || "email address already exist";
      res.status(statusCode).json({
        status: "fail",
        message: content,
      });
    } else {
      console.log(err);
      res.status(500).json({
        status: "error",
      });
    }
  });
}
export default globalErrorHandling;
