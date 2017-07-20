# net-particle

demo可参考 [index.html](https://github.com/FrankQiu94/net-particle/blob/master/demo/index.html) 文件

js文件为 [index.js](https://github.com/FrankQiu94/net-particle/tree/master/dist)

调用方法为：  
###第一步：创建canvas标签，定义一个id名，并放在一个div容器中

		<div class="container">
			<canvas id="cs">抱歉！您的浏览器版本较低，无法显示更好的效果！</canvas>
		</div>

###第二步：引入index.js包，随后创建MoveBalls的实例

		<script type="text/javascript" src="/js/index.js"></script>
		<script type="text/javascript">
			var moveBalls = new MoveBalls("#cs", {  
    			total: 400,  
				color: "#942158",  
				size: 2,
				width: "900px",
				height: "500px"
  			});
		</script>
  		

其中：  
第一个参数为 `canvas` 的id名，为必选项；   
第二个参数为一个选项对象，为可选项，具体如下表：  

<table style="border-collapse: collapse; text-align: center;">
  <thead>
    <tr>
      <th bgcolor="#FAEBD7">参数</th>
	  <th bgcolor="#FAEBD7">默认值</th>
      <th bgcolor="#FAEBD7">说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>total</td>
	  <td>300</td>
      <td>总粒子数</td>
    </tr>
    <tr>
      <td>size</td>
	  <td>2</td>
      <td>粒子大小，单位像素</td>
    </tr>
    <tr>
      <td>color</td>
	  <td>#AAAAAA</td>
      <td>粒子颜色，可以输入十六进制/颜色英文/rgb格式/HSL格式等</td>
    </tr>
    <tr>
      <td>width</td>
	  <td>父容器的宽度</td>
      <td>该canvas的宽</td>
    </tr>
    <tr>
      <td>height</td>
	  <td>父容器的高度</td>
      <td>该canvas的高</td>
    </tr>
  </tbody>
</table>
