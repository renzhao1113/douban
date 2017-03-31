(function(angular){
	angular
		.module("douban.list_page",["ngRoute"])
		.config(["$routeProvider",function ($routeProvider) {
			$routeProvider.when("/list/:movieType",{
				templateUrl:"./movie_list/view.html",
				controller:"listPageCtrl"
			})
		}])
		.controller("listPageCtrl",["$scope","$routeParams","$window","$document",function ($scope,$routeParams,$window,$document) {

			var movieType = $routeParams.movieType;
			console.log(movieType);

			//获取上一个页面的hash值, 如果没有,那么就等于当前页面的hash值
			var prevPage = $window.sessionStorage.getItem("currentPage")?JSON.parse($window.sessionStorage.getItem("currentPage")).movieType:movieType;
			//判断当前的hash和上一个hash值是不是相等,若不相等,意味着请求的是不同页面,就要将开始页设置为0
			//否则就是同一个页面
			if(movieType != prevPage){
				$scope.start = 0;
			}else{
				$scope.start = $window.sessionStorage.getItem("currentPage")?JSON.parse($window.sessionStorage.getItem("currentPage")).start:0;// 发送请求时规定从第几条信息开始, 0 即第一条
			}
			$scope.count = 5;			// 每次请求回来的条目数量
			// 利用JSONP获取数据
			JSONP("http://api.douban.com/v2/movie/"+movieType,{
				start : $scope.start,
				count : $scope.count,
				kewords : $scope.keywords,
				callback : "getMovies"
			},function (data) {
				// console.log(data);
				$scope.movieList = data;
				// $scope.isLoading = false;
				$scope.page = Math.ceil(data.total/data.count);			//分页总数
				$scope.currentPage = data.start / data.count + 1;				//计算是第几页了
				$window.sessionStorage.setItem("currentPage",JSON.stringify({start:data.start,movieType: movieType}));  //记录当前是第几页了和当前在哪个页面
				$scope.$apply();//通知angular数据已经发生改变,需要进行刷新
				loading();
			});

			function loading() {
				var imgs = document.querySelectorAll(".moviePhoto");
				var loadings = document.querySelectorAll(".sk-cube-grid")
				for (var i = 0; i < imgs.length; i++) {
					loadings[i].style.display = "block";
					imgs[i].style.display = "none";
				}
			}

			//上一页/下一页
			$scope.changePage = function (cur) {
				// 每次切换页面是移除上一次的图片
				loading();
				console.log(cur)
				// 将当前页面赋值给start
				$scope.start = cur;
				//开始的条目发生改变之后,再次发送请求获取数据
				JSONP("http://api.douban.com/v2/movie/"+movieType,{
					start : $scope.start,
					count : $scope.count,
					kewords : $scope.keywords,
					callback : "getMovies"
				},function (data) {
					// console.log(data);
					$scope.movieList = data;
					// $scope.isLoading = false;
					$scope.page = Math.ceil(data.total/data.count);			//分页总数
					$scope.currentPage = data.start / data.count + 1;				//计算是第几页了
					$window.sessionStorage.setItem("currentPage",JSON.stringify({start:data.start,movieType: movieType}));  //记录当前是第几页了和当前在哪个页面
					$scope.$apply();//通知angular数据已经发生改变,需要进行刷新
					loading();
				});
			}
		}])
		//自定义图片加载指令
		.directive("imgLoad",function () {
			return{
				// templateUrl:"./movie_list/imgs.html",
				restrict : "A",  //限定改指令为attribute
				//这里的element指的是img-load这个指令所在的图片元素
				link: function (scope,element) {
					element.on("load",function () {
						// scope.isLoading = false;
						element[0].style.display = "block";
						element[0].nextSibling.nextSibling.style.display = "none";
						// scope.$apply();
					})
				}
			}
		})
})(angular)