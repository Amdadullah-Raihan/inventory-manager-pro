/**
 * Wraps an async route handler so that any thrown error
 * is forwarded to Express error-handling middleware via next(err).
 *
 * Usage:
 *   router.get("/", catchAsync(invoiceController.getAll));
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsync;
