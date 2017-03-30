(function (angular) {
// "use strict";
// start your ride
// 主模块，用于加载其他所有的模块
	angular
		.module('douban', [
			'douban.home_page',
			'douban.list_page',
			'douban.details_page',
			 // 'moviecat.top250',
			 // 'moviecat.coming_soon'*/
		])

})(angular);