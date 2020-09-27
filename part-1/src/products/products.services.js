const ProductList = require('../models/Product');
const CachedProduct = require('../models/CachedProduct');

const ProductsService = {
	async saveProduct(requestInfo) {
		const infoString = JSON.stringify(requestInfo);
		const productAlreadyExists = await CachedProduct
			.findOne({ productInfo: infoString }).exec();
		
		if(!productAlreadyExists){
			const newCache = new CachedProduct({productInfo: infoString});
			newCache.save();

			const newProductList = new ProductList({products: requestInfo});
			const response = await newProductList.save().catch(()=>{ 
				return {
					error:{
						code: 400,
						message: 'Bad Request'
					}
				}
			});
			
			return response;
		}		

		return {
			error:{
				code: 403,
				message: 'Forbidden'
			}
		};
	}
};

module.exports = {ProductsService}
