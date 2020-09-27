const fs = require('fs');
const readline = require('readline');
const path = require('path');
const axios = require('axios');

const convert = (file) => {

	return new Promise((resolve, reject) => {
		const stream = fs.createReadStream(file);
		stream.on('error', reject);

		const reader = readline.createInterface({
			input: stream
		});

		const array = [];

		reader.on('line', line => {
			array.push(JSON.parse(line));
		});
		reader.on('close', () => resolve(array));
	});
}

const getSanitizedDump = () => {
	convert(path.resolve(__dirname, 'input-dump'))
		.then(res => {
			groupProductDump(res);
		})
		.catch(err => console.error(err));
}


const groupProductDump = async (productArray) => {
	const groups = {};
	for (const product of productArray) {
		const groupId = product.productId;
		if (!groups[groupId]) {
			groups[groupId] = [];
		}
		const imageIsValid = await isImageValid(product.image);
		if(groups[groupId].length < 3){
			if(!groups[groupId].includes(product.image) && imageIsValid){
				groups[groupId].push(product.image);
			}
		}
	}
	productArray = [];
	for (const groupId in groups) {
	  productArray.push({productId: groupId, images: groups[groupId]});
	}

	return productArray;
}

const isImageValid = async (imgUrl) => {
	const result = await axios.get(imgUrl).then(res=> {
		if(res.status === 200) return true
		return false
	}).catch(()=>false);

	return result
}


module.exports = { groupProductDump, isImageValid, getSanitizedDump}
