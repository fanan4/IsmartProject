const ApiError = require("./apiError");

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) =>
      next(new ApiError({ error: err.message, stack: err.stack }, 500))
    );
  };
};
