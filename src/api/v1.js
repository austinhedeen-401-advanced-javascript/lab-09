'use strict';

const cwd = process.cwd();

const express = require('express');

const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);

const router = express.Router();

router.param('model', modelFinder.load);

router.get('/api/v1/models', (request, response) => {
  modelFinder.list()
    .then(models => response.status(200).json(models));
});

router.get('/api/v1/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});

/**
 * Get an object of the result count and a list of records.
 * @route GET /api/v1/:model
 * @returns {object} 200 { count: 2, results: [ {}, {} ] }
 * @returns {Error}  500 - Server error
 */
router.get('/api/v1/:model', handleGetAll);

/**
 * Create a model instance and return the created record.
 * @route POST /api/v1/:model
 * @returns {object} 200 - A model record
 * @returns {Error}  500 - Server error
 */
router.post('/api/v1/:model', handlePost);

/**
 * Get a record matching the given id.
 * @route GET /api/v1/:model/:id
 * @returns {object} 200 - A model record
 * @returns {Error}  500 - Server error
 */
router.get('/api/v1/:model/:id', handleGetOne);

/**
 * Update the record with the matching id.
 * @route PUT /api/v1/:model/:id
 * @returns {object} 200 - A model record
 * @returns {Error}  500 - Server error
 */
router.put('/api/v1/:model/:id', handlePut);

/**
 * Delete the record matching the id.
 * @route DELETE /api/v1/:model/:id
 * @returns {object} 200 - The deleted record
 * @returns {Error}  500 - Server error
 */
router.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers
function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function handleGetOne(request,response,next) {
  request.model.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function handlePost(request,response,next) {
  request.model.create(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handlePut(request,response,next) {
  request.model.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
