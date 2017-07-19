# net-particle

demo可参考 [index.html](https://github.com/FrankQiu94/net-particle/blob/master/index.html) 文件

js文件为 [index.js](https://github.com/FrankQiu94/net-particle/tree/master/dist)

调用方法为  

  		var moveBalls = new MoveBalls("#cs", {  
    		total: 400,  
			color: "#942158",  
			size: 2  
  		});

其中  
第一个参数为 `canvas` 的id名，  
第二个参数为一个对象，三个属性 `total` , `color` 和 `size` 分别为粒子总数，粒子颜色和粒子大小（像素）,颜色可接受 `#000000` 十六进制或者 `rgba()` 亦或是 `red` 等颜色名。  

第一个参数为必选项，第二个参数为可选项，默认值为  

		option = {
		  total: 300,
		  color: "#AAAAAA",
		  size: 2
		}