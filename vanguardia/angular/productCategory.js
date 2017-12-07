angular.module('vanguardiaPostLoader')
    .filter('productCategoryFilter',
        function () {
            return function (products, category) {
				function productsWithCategory(product){
					var productCategory = product.productCategory;
					if(productCategory === category)
						return true;
				}
				
				return products.filter(productsWithCategory);
         };
 });
