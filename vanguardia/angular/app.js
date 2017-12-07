angular.module('vanguardiaPostLoader', ['facebook', 'ui.router'])
       .config(function(FacebookProvider, $stateProvider, $urlRouterProvider){
            FacebookProvider.init('1647701538872485');
            $stateProvider
                .state('main',{
                    url: '/inicio',
				    templateUrl: './index.html'
                })
                .state('main.menu', {
                    url: '/menu',
                    templateUrl: './sidemenu.html',
					resolve: {
						posts: function($timeout, facebookPosts, $q){
							 return facebookPosts.loadPhotos();
						},
						videos: function(facebookPosts){
							return facebookPosts.loadVideos();
						}
					},
				    controller: 'MainCtrl'
                })
                .state('main.menu.coleccion',{
                    url: '/coleccion',
                    templateUrl: './main.html',
                    controller: 'FBImageCtrl'
                })
                .state('main.menu.videos', {
                    url: '/pasarelas',
                    templateUrl: './shows.html',
                    controller: 'FBVideoCtrl',
                    params: {
                        video: null
                    }
                })
                .state('main.menu.about',{
                    url: '/acercade',
                    templateUrl: 'about.html'
                })  
                .state('main.menu.contact', {
                    url: '/contacto',
                    templateUrl: './contact.html'
                })  
                .state('main.menu.tops', {
                    url: '/tops',
                    templateUrl: './tops.html',
                     controller: function($scope, $stateParams, $filter,  externalJsLoader){
						 $scope.header = $stateParams.product !== "" ?  $filter('initialToCapitalFilter')($stateParams.product) : 'Tops';
						 var filteredPosts = $filter('productCategoryFilter')($scope.$parent.posts, $stateParams.product);
						 $scope.topPhotosPosts =  filteredPosts.length > 0 ? filteredPosts : $scope.$parent.posts;
						 externalJsLoader.loadContainer('tops');
                     },
                     params:{
                         product: ''
                     }
                })  
                .state('main.menu.bottoms', {
                    url: '/bottoms',
                    templateUrl: './bottoms.html',
                    controller: function($scope, $stateParams, $filter,  externalJsLoader){
						$scope.header =$stateParams.product2 !== "" ?  $filter('initialToCapitalFilter')($stateParams.product2) : 'Bottoms';
						var filteredPosts =  $filter('productCategoryFilter')($scope.$parent.posts, $stateParams.product2);
						$scope.bottomsPhotosPosts =filteredPosts.length > 0 ? filteredPosts : $scope.$parent.posts;
						externalJsLoader.loadContainer('bottoms');
                    },
                    params:{
                        product2: ''
                    }
                });  
	
                $urlRouterProvider.otherwise('/inicio/menu/coleccion');

       })
       .factory('externalJsLoader', function($timeout){
           return {
			   showPreloader: showPreloader,
			   hidePreloader: hidePreloader,
               loadContainer: loadContainer,
               loadParallax: loadParallax,
			   loadFilter: loadFilter
           }
		   
		   function showPreloader(){
			   function show(){
					$("#preloader").fadeIn();
					$('#mastwrap').css('visibility', 'hidden');
					$('body, html').addClass('preloader-running');
			   }
			   
			   $timeout(show, 100);
		   }
	
		  function hidePreloader(){
			  	function hide(){
					$("#preloader").fadeOut();
					$("#preloadervideo").delay(1000).fadeOut(1000);
					$('body, html').removeClass('preloader-running');
					$('body, html').addClass('preloader-done');
					$("#mastwrap").delay(1000).css('visibility',
						'visible');
				}
			  
			  	$timeout(hide, 2000);
			  
		  }

           function loadParallax(parallax){

              	 function checkWindow(){
              	   if (!device.tablet() && !device.mobile()) {
              	       //Activating Parallax effect if non-mobile device is detected
              	       $(window).bind('load', function() {
              	           parallaxInit();
              	       });
              	      
              	      
              	   } else {
              	       //Dectivate Parallax effect if mobile device is detected (bg image is displayed)
              	       $('.parallax, .parallax-layer').addClass('no-parallax');
              	   }   
              	 }
	
	             //Initialize Each Parallax Layer  
	             function parallaxInit(parallax) {
	                 var parallaxSelector = '#parallax'+parallax.charAt(0).toUpperCase().concat(parallax.slice(1));
	                 $(parallaxSelector).stellar({
	                     positionProperty: 'transform',
	                     horizontalOffset: false
	                 });
	             }
	
	             $timeout(function(){
	                 parallaxInit(parallax);
	             }, 100);
           }

           function loadContainer(containerName){

               $timeout(loadIsotope, 100);

               function loadIsotope(){
               var containerSelector = '#works-container-'+containerName;
               var $container1 = $(containerSelector);
                         $container1.imagesLoaded( function() {
                             //init isotope once all images are loaded
                             $container1.isotope({
                                 // options
                                 itemSelector: '.works-item',
                                 layoutMode: 'masonry',
                                 transitionDuration: '0.8s'
                             });

                             //forcing a perfect masonry layout after initial load
                             setTimeout(function() {
                                 $container1.isotope('layout');
                             }, 100);
                             
                             // triggering filtering
                             $('.works-filter li a').on('click', function() {
                                 $('.works-filter li a').removeClass('active');
                                 $(this).addClass('active');
                                 
                                 var selector = $(this).attr('data-filter');
                                 $container1.isotope({
                                     filter: selector
                                 });
                                 setTimeout(function() {
                                     $container1.isotope('layout');
                                 }, 700);
                                 return false;
                             });
                             
                             //Isotope ReLayout on Window Resize event.
                             $(window).on('resize', function() {
                                 $container1.isotope('layout');
                             });
                             
                             //Isotope ReLayout on device orientation changes
                             window.addEventListener("orientationchange", function() {
                                 $container1.isotope('layout');
                             }, false);
                     });
               }

          }
		
		function loadFilter() {
			function attachJQFilterEvent(){
				 (function( $ ){
					   $.fn.filterPanelTrigger = function() {
							if($(".works-filter-panel").is(":hidden"))
							{
								$('.works-filter-panel').slideDown();
								$('.filter-notification a').empty().append( "Ocultar Filtros" );
							}
							else{
								$('.works-filter-panel').slideUp();
								$('.filter-notification a').empty().append( "Mostrar Filtros" );
							}
					   }; 
					})( jQuery );
				
					$('.filter-notification a').on('click', function(){
						$().filterPanelTrigger();
					});

					$('.works-filter li a').on('click', function(){
						console.log('filter activated')
						$('.works-filter li a').removeClass('filter-active');
						$(this).addClass('filter-active');
						$('html, body').animate({
							scrollTop: $("#works-container").offset().top-100
						}, 1000);
					});
				}
		
				$timeout(attachJQFilterEvent, 100);
			}
       })
       .run(function($rootScope, externalJsLoader, $state){
		   $rootScope.$on('$stateChangeStart', function(event){
			  $rootScope.$broadcast('loadingd:started');
			  externalJsLoader.showPreloader();
		   });
           $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromParams, fromState){
			   externalJsLoader.hidePreloader();
			   
			   $rootScope.$broadcast('loading:completed');
			   
			   if(toState.name === 'main.menu.coleccion'){
				   externalJsLoader.loadFilter();
			   }
               if(toState.name === 'main.menu.coleccion' || toState.name === 'main.menu.tops' || toState.name === 'main.menu.bottoms' || toState.name === 'main.menu.shoes'
                || toState.name === 'main.menu.accesorios'){
                    externalJsLoader.loadContainer(toState.name.split('.')[2]);
                }else if(toState.name === 'main.menu.about' || toState.name === 'main.menu.contact'){
                    externalJsLoader.loadParallax(toState.name.split('.')[2]);
                }
           });
       })
       .controller('MainCtrl', function ($scope,  $state, posts, videos,  externalJsLoader, randomize){
    
            function goToVideoSection(videoToShow){
                $state.go('main.menu.videos', {video: videoToShow});
            }
	
		    function goToProducts(product){
					if(product.type === 'tops')
							$state.go( 'main.menu.tops',  {product: product.name});
					else
							$state.go('main.menu.bottoms', {product2: product.name});
            }
	
			function activateLoading(){
				$scope.loadIsComplete = false;
			}
	
			function disableLoading(){
				$scope.loadIsComplete = true;
			}
			
			$scope.posts = posts;
		    $scope.videos = videos;
			$scope.loadIsComplete = true;
            $scope.goToVideoSection = goToVideoSection;
			$scope.goToProducts = goToProducts;
			$scope.products = [{name: 'camisas', type: 'tops'}, {name: 'playeras', type: 'tops'},{name: 'sacos', type: 'tops'}, {name: 'pantalones', type: 'bottoms'}, {name: 'ropa interior', type: 'bottoms'}, {name: 'zapatos', type: 'bottoms'}, {name: 'accesorios', type: 'bottoms'}];
	
	
			$scope.$on('loading:started', activateLoading);
			$scope.$on('loading:completed', disableLoading);

        });
