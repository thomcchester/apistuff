myApp.factory("MovieService", ["$http", function($http){
    var data = {};
    var options = {
	       geo: 'country name',
	        date: 'yyyymm',
	         keywords: ['some', 'list', 'of', 'keywords'],
	          category: 'some category'
          } ;

googleTrends.apiMethod(options)
.then(function(results){
	console.log("Here are your google trend results!", results);
})
.catch(function(err){
	console.log("there was an error :(", err);
});

    var postMovie = function(data){
        $http.post("/movie", data).then(function(response){
            console.log("MOVIE SAVED! ", response);
            getMovies();
        });
    };

    var getMovies = function(){
        $http.get("/movie").then(function(response){
            console.log(response.data);
            data.response = response.data;
        });
    };

    return {
        postMovie : postMovie,
        getMovies : getMovies,
        data : data,
        options : options
    };
}]);
