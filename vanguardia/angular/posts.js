angular.module('vanguardiaPostLoader')
			  .factory('facebookPosts',  function(Facebook, randomize, $q){
			return {
				loadPhotos: loadPhotos,
				loadVideos: loadVideos
			}
	
			function loadFacebookPhotos(){
			  var deferred = $q.defer();
				
               Facebook.api('/vanguardia.ensenada?fields=posts{message,full_picture}&access_token=1647701538872485|ad0dccdcc8d179ffc944b6628defaa96', function(postsFbResponse){
					deferred.resolve( postsFbResponse.posts.data.filter(function(post){
						if(post.message)
								post.productCategory = randomize.getRandomizedCategory([{name: 'camisas', type: 'tops'}, {name: 'playeras', type: 'tops'},{name: 'sacos', type: 'tops'}, {name: 'pantalones', type: 'bottoms'}, {name: 'ropa interior', type: 'bottoms'}, {name: 'zapatos', type: 'bottoms'}, {name: 'accesorios', type: 'bottoms'}]).name;
						return post.message && post.message.includes('#Queusarashoy');
					}));
				});
				
				return deferred.promise;
			};
				 
			function loadVideos(){
				  var deferred = $q.defer();
				
				    Facebook.api('/vanguardia.ensenada/videos?fields=source,description&access_token=1647701538872485|ad0dccdcc8d179ffc944b6628defaa96', function(videosFbResponse){
                        deferred.resolve(filterFashionShowVideos(videosFbResponse.data));
                    });
				
					return deferred.promise;
		 	};
	
		    function filterFashionShowVideos(videos){
                function videosAboutFashionShow(video){
                    if(video.description.includes('pasarela') || video.description.includes('Pasarela')){
                        var fashionShowYears = video.description.split(/[^\d]/).filter(function(n){if((n>=1900)&&(n<=3000))return n});
                        var seasons = video.description.split(' ').filter(function(w){if(w == 'Primavera' || w == 'Verano' || w == 'Otoño' || w == 'Invierno' || w == 'primavera' || w == 'verano' || w == 'otoño' || w == 'invierno') return w;  });
                        
                        video.descriptionLink = fashionShowYears && seasons ? fashionShowYears[0] + ' - ' + fashionShowYears[1] + ' / ' + seasons[0].charAt(0).toUpperCase().concat(seasons[0].substr(1)) + ' - ' + seasons[1][0].charAt(0).toUpperCase().concat(seasons[1].substr(1))
                         : 'Pasarela Vanguardia';
                        
                        return true;
                    }
                }
                
                return  videos.filter(videosAboutFashionShow);
            }
	
		   function loadPhotos(){
			   return loadFacebookPhotos();
            }
});