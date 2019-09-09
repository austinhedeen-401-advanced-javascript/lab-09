'use strict';
/**
 * @module
 */

/**
 * Middleware to handle 500 responses if the server experiences an error.
 * @param req - Request object
 * @param res - Response object
 * @param next - Calls the next middleware function
 */
module.exports = (err, req, res, next) => {
  let error = { error: err };
  res.status(500).json(error).end();
};
