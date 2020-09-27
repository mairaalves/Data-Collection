const axios = require('axios');
const {groupProductDump, isImageValid} = require('../index');

jest.mock('axios');
axios.get.mockImplementation((url) => {
    const check = url[url.length - 5]%5;
    return Promise.resolve(check ? {status:200}: {status:404});
}) 

describe('handle product dump', () => {

    it('should group product dump by productId', async () => {
        const grouped = await groupProductDump(productDumpArray);
        expect(grouped).toEqual(productDumpArrayGrouped);
    });

    it('returns false when sending an invalid image', async () => {
        const result = await isImageValid(invalidImage);
        expect(result).toBeFalsy();
    });

    it('returns true when sending an valid image', async () => {
        const result = await isImageValid(validImage);
        expect(result).toBe(true);
    });

});

const invalidImage = 'http://localhost:4567/images/10.png';
const validImage = 'http://localhost:4567/images/7.png';

const productDumpArray = [
    {productId: 'pid1', image: 'http://localhost:4567/images/63157.png'},
	{productId: 'pid2', image: 'http://localhost:4567/images/190891.png'},
	{productId: 'pid2', image: 'http://localhost:4567/images/83386.png'},
	{productId: 'pid2', image: 'http://localhost:4567/images/159145.png'},
	{productId: 'pid1', image: 'http://localhost:4567/images/116223.png'},
	{productId: 'pid1', image: 'http://localhost:4567/images/116812.png'},
	{productId: 'pid1', image: 'http://localhost:4567/images/141040.png'},
	{productId: 'pid2', image: 'http://localhost:4567/images/171990.png'},
	{productId: 'pid2', image: 'http://localhost:4567/images/107763.png'}
];

const productDumpArrayGrouped = [
    {
      productId: 'pid1',
      images: [
        'http://localhost:4567/images/63157.png',
        'http://localhost:4567/images/116223.png',
        'http://localhost:4567/images/116812.png'
      ]
    },
    {
      productId: 'pid2',
      images: [
        'http://localhost:4567/images/190891.png',
        'http://localhost:4567/images/83386.png',
        'http://localhost:4567/images/107763.png'
      ]
    }
];