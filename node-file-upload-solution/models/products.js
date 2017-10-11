var nextUserImageId = 0;

function Products() {
	this.productList = [];
}

Products.prototype.addProduct = function(params, filename) {
	this.productList.push({
		title: params.title,
		price: params.price,
		quantity: params.quantity,
		fileName: '/images/user-images/' + filename,
		thumbnail: '/images/user-images/thumbnails/' + filename,
		id: nextUserImageId++
	});

	console.log(JSON.stringify(this.productList))
};

Products.prototype.findById = function(id) {
	for (var i = 0; i < this.productList.length; i++) {
		if (parseInt(id) === this.productList[i].id) {
			return this.productList[i];
		}
	}
};


module.exports = new Products();