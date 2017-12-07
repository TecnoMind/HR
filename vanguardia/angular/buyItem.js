angular.module('vanguardiaPostLoader')
	   .directive('buyItem', function(){
	return {
		restrict: 'A',
		link: linkFunction,
	}
	
function linkFunction(scope, element, attrs){
  element.hover(function(){
   var marginTopBasedOnElementHeight = Math.round(element.height() - (element.height() * (element.height() > 100 && element.height() < 500   ? 0.40 : 0.45)));
    element.children().children().append('<div id="buyButton" style="margin-top:'+marginTopBasedOnElementHeight+ 'px;border: 1px ridge white; background-color:black"><input style="font:designova_ss_regular, sans-serif;  margin-bottom:0!important" type="button" value="Comprar"/></div>');
   angular.element('#buyButton').hover(function(){
    angular.element(this).css('background-color', '#fb472e').css('color', 'white');
   }, function(){
    angular.element(this).css('background-color', 'black').css('color', 'white');
   })
  }, function() {
   angular.element('#buyButton').remove();
  });
 }
	
});