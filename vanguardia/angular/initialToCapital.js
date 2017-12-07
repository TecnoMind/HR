angular.module('vanguardiaPostLoader')
			.filter('initialToCapitalFilter', function(){
		return function(word){
			return word.split(' ').map(function(word){
				return word.charAt(0).toUpperCase().concat(word.substr(1));
			}).join(' ');
		}
});