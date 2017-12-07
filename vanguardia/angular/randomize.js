angular.module('vanguardiaPostLoader')
       .factory('randomize', function(){
	return {
		getRandomizedCategory: getRandomizedCategory
	};
	
	function getRandomizedCategory(categories){
		var randomCategoryNumber = Math.round(Math.random() * ((categories.length - 1) - 0) + 0);
		return categories[randomCategoryNumber];
	}
	
});