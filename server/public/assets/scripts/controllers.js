myApp.controller("AddController", ["$scope", "$http", "MovieService", function($scope, $http, MovieService){
    $scope.movies = {};
    $scope.data = [];

    var options = {
	geo: 'country name',
	date: 'yyyymm',
	keywords: ['some', 'list', 'of', 'keywords'],
	category: 'some category'
}

googleTrends.apiMethod(options)
.then(function(results){
	console.log("Here are your google trend results!", results);
})
.catch(function(err){
	console.log("there was an error :(", err);
});
    $scope.search = function(data){
      console.log("We are going to go look for ", data);
      $http.get("http://www.omdbapi.com/?t=" + data.name + "&y=&plot=full&r=json").then(function(response){
          console.log(response.data);
          $scope.data = [];
          $scope.data.push(response.data);
      });
    };

    $scope.addMovie = function(data){
        console.log(data);

        var postObject = {};
        postObject.Title = data.Title;
        postObject.Runtime = data.Runtime;
        postObject.Rated = data.Rated;
        postObject.Actors = data.Actors;
        postObject.Plot = data.Plot;

        MovieService.postMovie(postObject);
    };
}]);

myApp.controller("ShowController", ["$scope", "MovieService", function($scope, MovieService){
    MovieService.getMovies();

    $scope.data = MovieService.data;
}]);
