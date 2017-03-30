(function(angular) {
// 创建首页模块
	angular
		.module('douban.home_page', ['ngRoute'])
		.config(['$routeProvider',function($routeProvider) {
			$routeProvider.when('/home_page', {
				// 路径是相对于 index.html 页面的
				templateUrl: './home_page/view.html',
			})
				.otherwise("/home_page")
		}])
})(angular);