`/**
 * Created by 任钊 on 2017/3/18.
 */
(function (angular) {
	angular
		.module("douban.details_page", ["ngRoute"])
		.config(["$routeProvider","$locationProvider", function ($routeProvider,$locationProvider) {
			$routeProvider.when("/details/:id", {
				templateUrl: "./movie_details/view.html",
				controller: "detailsPageCtrl"
			})
			$locationProvider.hashPrefix("");//取消默认前缀
		}])
		.controller("detailsPageCtrl", ["$scope", "$routeParams", function ($scope, $routeParams) {
			JSONP("http://api.douban.com/v2/movie/subject/"+$routeParams.id,{
				start : 0,
				count : 20,
				callback : "getMovieDetails"
			},function (data) {
				$scope.details = data;
				$scope.$apply();
				console.log(data);
			});
		}])
})(angular)