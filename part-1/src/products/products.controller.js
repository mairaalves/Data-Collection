const {ProductsService} = require("./products.services");

const ProductsController = {
    async post(req, res) {
        const {productInfo} = req.body;
        const response = await ProductsService.saveProduct(productInfo);
        
        if (response.error){
            return res.status(response.error.code).send(response.error.message);
        }
        res.send('OK');
    }
}

module.exports = {ProductsController};