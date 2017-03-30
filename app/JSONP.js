/**
 * Created by 任钊 on 2017/3/18.
 */
function JSONP(url,params,callback) {
	var script = document.createElement("script");
	var url = url+"?q="+params.kewords+"&start="+params.start+"&count="+params.count+"&callback="+params.callback;
	console.log(url)
	script.src = url;
	document.head.appendChild(script);
	window[params.callback] = function (data) {
		callback(data)
	}
	document.head.removeChild(script);
	delete params.callback;
}