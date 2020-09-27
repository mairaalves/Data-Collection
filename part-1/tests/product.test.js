const dbHandler = require('./db-handler');
const ProductListModel = require('../src/models/Product');
const CachedProduct = require('../src/models/CachedProduct');
const {ProductsService} = require('../src/products/products.services');


beforeAll(async () => await dbHandler.connect());
afterAll(async () => await dbHandler.closeDatabase());


describe('save product to database', () => {

    it('should let product be created correctly', async () => {
        const validProduct = new ProductListModel({products: productMock});
        const savedProduct = await validProduct.save();
        
        expect(savedProduct._id).toBeDefined();
        expect(savedProduct.products).toEqual(expect.arrayContaining(productMock));
    });

    it('should forbid second request if product on cache', async () => {
        await ProductsService.saveProduct(productMock);
        const result = await ProductsService.saveProduct(productMock);
        expect(result.error.code).toBe(403);
    });

    it('should expire product after n seconds', async () => {
        await ProductsService.saveProduct(productMock);

        const dateIndex = (await CachedProduct.listIndexes())
            .filter(item => item.hasOwnProperty('expireAfterSeconds'))[0];
            
        expect(dateIndex.expireAfterSeconds).toBe(600);
    });
});


const productMock = [{'id': '123', 'name': 'mesa'}];
