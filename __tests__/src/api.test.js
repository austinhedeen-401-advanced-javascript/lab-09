'use strict';

const {server} = require('../../src/app');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);

describe('Categories API', () => {

  const endpoint = '/api/v1/categories/';
  const testCategory = {
    name: 'Category 1',
    description: 'A simple category'
  };
  const testCategoryTwo = {
    name: 'Category 2',
    description: 'Another category'
  };
  const updateDescription = {
    description: 'Updated description!'
  };
  let categoryOneId;

  test('Creating a new category should return 200 and the created object', () => {
    return mockRequest
      .post(endpoint)
      .send(testCategory)
      .then(response => {
        categoryOneId = response.body._id;
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testCategory.name);
      });
  });

  test('Fetching a category should return 200 and the object', () => {
    return mockRequest.get(endpoint + categoryOneId).send()
      .then(response => {
        categoryOneId = response.body._id;
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testCategory.name);
      });
  });

  test('Fetching all categories should return 200 and the array of saved objects', () => {
    return mockRequest.get(endpoint).send()
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.count).toEqual(1);
        expect(response.body.results[0]._id).toEqual(categoryOneId);

        return mockRequest.post(endpoint).send(testCategoryTwo);
      })
      .then(() => mockRequest.get(endpoint).send())
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.count).toEqual(2);
      });
  });

  test('Updating a category should return 200 and the updated object', () => {
    return mockRequest.put(endpoint + categoryOneId).send(updateDescription)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.description).toEqual(updateDescription.description);
      });
  });

  test('Deleting a category should return 200 and the deleted object', () => {
    return mockRequest.delete(endpoint + categoryOneId).send()
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testCategory.name);
      });
  });

});

describe('Products API', () => {

  const endpoint = '/api/v1/products/';
  const testProduct = {
    name: 'Product 1',
    description: 'A simple product',
    price: 4.99,
    category: 'Category 1'
  };
  const testProductTwo = {
    name: 'Product 2',
    description: 'Another product',
    price: 10.00,
    category: 'Category 2'
  };
  const updateDescription = {
    description: 'Updated description!'
  };
  let productOneId;

  test('Creating a new product should return 200 and the created object', () => {
    return mockRequest
      .post(endpoint)
      .send(testProduct)
      .then(response => {
        productOneId = response.body._id;
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testProduct.name);
      });
  });

  test('Fetching a product should return 200 and the object', () => {
    return mockRequest.get(endpoint + productOneId).send()
      .then(response => {
        productOneId = response.body._id;
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testProduct.name);
      });
  });

  test('Fetching all products should return 200 and the array of saved objects', () => {
    return mockRequest.get(endpoint).send()
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.count).toEqual(1);
        expect(response.body.results[0]._id).toEqual(productOneId);

        return mockRequest.post(endpoint).send(testProductTwo);
      })
      .then(() => mockRequest.get(endpoint).send())
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.count).toEqual(2);
      });
  });

  test('Updating a product should return 200 and the updated object', () => {
    return mockRequest.put(endpoint + productOneId).send(updateDescription)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.description).toEqual(updateDescription.description);
      });
  });

  test('Deleting a product should return 200 and the deleted object', () => {
    return mockRequest.delete(endpoint + productOneId).send()
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testProduct.name);
      });
  });

});
