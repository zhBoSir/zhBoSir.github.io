// 用自执行函数（函数执行完，里面的变量就会销毁），防止变量污染。
// 柱状图1
(function() {
	// 1.实例化对象
	var myChart = echarts.init(document.querySelector('.bar .chart'))
	// 2.指定配置项和数据
	var option = {
		color: ['#2f89cf'],  // 配置图表的颜色
		// 提示框组件
		tooltip: {
			trigger: 'axis',  // 触发类型:坐标轴触发
			axisPointer: {  // 坐标轴指示器配置项
				type: 'shadow'  // 指示器类型是阴影。默认值是'line'
			}
		},
		// 网格组件
		grid: {
			left: '0%',
			top: '10px',
			right: '0%',
			bottom: '4%',
			containLabel: true  // containLabel表示grid区域是否包含坐标轴的刻度标签。   grid.left grid.right grid.top grid.bottom grid.width grid.height 决定的是包括了坐标轴标签在内的所有内容所形成的矩形的位置。   这常用于『防止标签溢出』的场景，标签溢出指的是，标签长度动态变化时，可能会溢出容器或者覆盖其他组件。
		},
		xAxis: [
			{
				type: 'category',  // 坐标轴类型。  'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
				data: [
					'旅游行业',
					'教育培训',
					'游戏行业',
					'医疗行业',
					'电商行业',
					'社交行业',
					'金融行业'
				],
				axisLine: {  // 坐标轴轴线
					show: false
				},
				axisTick: {  // 坐标轴刻度相关设置
					alignWithLabel: true  // 保证刻度线和标签中间对齐
				},
				axisLabel: {  // 坐标轴刻度标签的相关设置
					color: 'rgba(255, 255, 255, .6)',
					fontSize: '12'
				}
			}
		],
		yAxis: [
			{
				type: 'value',  // y
				axisLabel: {  // 坐标轴刻度标签的相关设置
					color: 'rgba(255, 255, 255, .6)',
					fontSize: '12'
				},
				axisLine: {
					lineStyle: {  // 坐标轴轴线设置
						color: 'rgba(255, 255, 255, .1)',
						width: 2
					}
				},
				splitLine: {  // 坐标轴在 grid 区域中的分隔线
					lineStyle: {
						color: 'rgba(255, 255, 255, .2)'
					}
				}
			}
		],
		series: [  // 系列列表。每个系列通过 type 决定自己的图表类型
			{
				name: '直接访问',
				type: 'bar',
				data: [200, 300, 300, 900, 1500, 1200, 600],
				barWidth: '35%',
				itemStyle: {  // 图形样式
					barBorderRadius: 5
				}
			}
		]
	}
	// 3.把配置项给实例对象
	myChart.setOption(option)
	// 4.图表跟随屏幕大小自动适应
	window.addEventListener('resize', function() {
		myChart.resize()
	})
})();

// 自执行函数如果后面还有代码，要在结尾处加上“;”，不然后面的代码会报错。

// 柱状图2
(function() {
	var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
	// 1.实例化对象
	var myChart = echarts.init(document.querySelector('.bar2 .chart'))
	// 2.指定配置项和数据
	var option = {
		// 网格组件
		grid: {
			left: '22%',
			top: '10%',
			bottom: '10%'
		},
		xAxis: {
			show: false  // 不显示x轴的相关信息
		},
		yAxis: [  // yAxis如果是两个对象，说明有左右两个y轴
			{
				type: 'category',
				data: ['HTML5', 'CSS3', 'javaScript', 'vue', 'node'],
				axisTick: {
					show: false  // 不显示刻度
				},
				axisLabel: {
					color: '#fff'  // 标签颜色
				},
				axisLine: {
					show: false  // 隐藏y轴
				}
			},
			{
				data: [702, 350, 610, 793, 664],
				axisTick: {
					show: false  // 不显示刻度
				},
				axisLabel: {
					color: '#fff'  // 标签颜色
				},
				axisLine: {
					show: false  // 隐藏y轴
				}
			}
		],
		series: [  // 系列列表。每个系列通过 type 决定自己的图表类型
			{
				name: '条',
				type: 'bar',
				data: [70, 34, 60, 78, 69],
				itemStyle: {
					barBorderRadius: 20,
					color: function(params) {
						// 颜色通过函数动态取得，因为数据data有5个，所以这里会打印5次params。通过params里的dataIndex属性可以动态给每个柱子设置颜色
						// console.log(params)
						return myColor[params.dataIndex]
					}
				},
				barWidth: 10,  // 柱条的宽度，不设时自适应
				barCategoryGap: 50,  // 同一系列的柱间距离
				yAxisIndex: 0,  // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
				label: {  // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
					show: true,
					position: 'inside',  // 标签的位置
					formatter: '{c}%'  // 标签内容格式器  字符串模板 模板变量有：{a}：系列名。{b}：数据名。{c}：数据值。
				}
			},
			{
				name: '框',
				type: 'bar',
				data: [100, 100, 100, 100, 100],
				barWidth: 15,
				barCategoryGap: 50,
				yAxisIndex: 1,
				itemStyle: {
					color: 'none',
					borderColor: '#00c1de',
					borderWidth: 3,
					barBorderRadius: 15
				}
			}
		]
	}
	// 3.把配置项给实例对象
	myChart.setOption(option)
	// 4.图表跟随屏幕大小自动适应
	window.addEventListener('resize', function () {
		myChart.resize()
	})
})();

// 折线图1
(function() {
	var yearData = [
		{
			year: "2020", // 年份
			data: [
				// 两个数组是因为有两条线
				[24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
				[40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
			]
		},
		{
			year: "2021", // 年份
			data: [
				[123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
				[143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
			]
		}
	]
	// 1. 实例化对象
	var myChart = echarts.init(document.querySelector(".line .chart"));
	// 2.指定配置
	var option = {
		color: ['#00f2f1', '#ed3f35'],  // 通过color来修改两条线的颜色
		tooltip: {
			trigger: 'axis'
		},
		legend: {  // 图例
			// 如果series对象有name值，则legend可以不用写data
			textStyle: {  // 图例组件的文字颜色
				color: '#4c9bfd'
			},
			right: '10%'  // 这里的10%必须加引号
		},
		grid: {
			top: '20%',
			left: '3%',
			right: '4%',
			bottom: '3%',
			show: true,  // 是否显示【直角坐标系】网格
			borderColor: '#012f4a',
			containLabel: true  // 包含刻度文字在内
		},
		xAxis: {
			type: 'category',
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
			boundaryGap: false,  // 坐标轴两边留白策略
			axisTick: {
				show: false  // 去除刻度线
			},
			axisLabel: {
				color: '#4c9bfd'  // 标签颜色
			},
			axisLine: {
				show: false  // 去除轴线
			}
		},
		yAxis: {
			type: 'value',
			axisTick: {
				show: false
			},
			axisLabel: {
				color: '#4c9bfd'
			},
			axisLine: {
				show: false
			},
			splitLine: {  // 坐标轴在 grid 区域中的分隔线
				lineStyle: {
					color: '#012f4a'
				}
			}
		},
		series: [
			{
				name: '新增粉丝',
				type: 'line',
				smooth: true,  // 是否平滑曲线显示
				data: yearData[0].data[0]
			},
			{
				name: '新增游客',
				type: 'line',
				smooth: true,
				data: yearData[0].data[1]
			}
		]
	}
	// 3.把配置项给实例对象
	myChart.setOption(option)
	// 4.图表跟随屏幕大小自动适应
	window.addEventListener('resize', function () {
		myChart.resize()
	})
	
	// 点击年份切换效果
	var aList = document.querySelectorAll('.h2 a')
	aList.forEach((item, index) => {
		// 通过index来判断点击的是哪个a
		item.addEventListener('click', function() {
			option.series[0].data = yearData[index].data[0]
			option.series[1].data = yearData[index].data[1]
			// 把配置项给实例对象
			myChart.setOption(option)
		})
	})
})();

// 折线图2
(function() {
	// 1. 实例化对象
	var myChart = echarts.init(document.querySelector(".line2 .chart"))
	// 2.指定配置
	var option = {
		tooltip: {
			trigger: 'axis',
			formatter: '{b}日: <br/> {a} : {c} <br/> {a1} : {c1}'  // {a}：系列名。{b}：数据名。{c}：数据值。  用索引代表第几个series值
		},
		legend: {  // 图例
			data: ['邮件营销', '联盟广告'],
			textStyle: {  // 图例组件的文字颜色
				color: 'rgba(255, 255, 255, .5)',
				fontSize: '12'
			}
		},
		grid: {
			top: '20%',
			left: '3%',
			right: '4%',
			bottom: '3%',
			show: true,  // 是否显示【直角坐标系】网格
			borderColor: '#012f4a',
			containLabel: true  // 包含刻度文字在内
		},
		xAxis: [
			{
				type: 'category',
				data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
				boundaryGap: false,
				axisLabel: {  // 文本标签的设置
					textStyle: {
						color: 'rgba(255, 255, 255, .6)',
						fontSize: 12
					}
				},
				axisLine: {  // x轴线的设置
					lineStyle: {
						color: 'rgba(255, 255, 255, .2)'
					}
				}
			}
		],
		yAxis: [
			{
				type: 'value',
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(255, 255, 255, .1)'
					}
				},
				axisLabel: {
					textStyle: {
						color: 'rgba(255, 255, 255, .6)',
						fontSize: 12
					}
				},
				splitLine: {  // 分割线的颜色
					lineStyle: {
						color: 'rgba(255, 255, 255, .1)'
					}
				}
			}
		],
		series: [
			{
				name: '邮件营销',
				type: 'line',
				data: [30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40],
				lineStyle: {
					color: '#0184d5',
					width: 2
				},
				smooth: true,
				symbol: 'circle',
				symbolSize: 8,
				showSymbol: false,
				itemStyle: {
					color: '#0184d5',
					borderColor: 'rgba(221, 220, 107, .1)',
					borderWidth: 12
				},
				areaStyle: {  // 填充颜色设置
					color: new echarts.graphic.LinearGradient(  // 渐变颜色的另一种写法
						0,
						0,
						0,
						1,
						[
							{
								offset: 0,
								color: 'rgba(1, 132, 213, .4)'  // 渐变色的起始颜色
							},
							{
								offset: .8,
								color: 'rgba(1, 132, 213, .1)'  // 渐变色的结束颜色
							}
						],
						false
					),
					shadowColor: 'rgba(0, 0, 0, .1)'
				}
			},
			{
				name: '联盟广告',
				type: 'line',
				data: [130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40, 130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20],
				smooth: true,
				lineStyle: {  // 设置线的样式
					color: '#00d887',
					width: 2
				},
				symbol: 'circle',  // 标记的图形(拐点),默认值是emptyCircle
				symbolSize: 5,  // 标记的大小
				itemStyle: {  // 折线拐点标志的样式
					color: '#00d887',
					borderWidth: 12,
					borderColor: 'rgba(221, 220, 107, .1)',  // 拐点的边框颜色
				},
				showSymbol: false,  // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
				areaStyle: {  // 区域填充样式。
					color: {  // 区域颜色填充渐变色
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
								offset: 0, color: 'rgba(0, 216, 135, .4)' // 0% 处的颜色
						}, {
								offset: 1, color: 'rgba(0, 216, 135, .1)' // 100% 处的颜色
						}],
						global: false
					},
					shadowColor: 'rgba(0, 0, 0, .1)'  // 阴影颜色
				}
			}
		]
	}
	// 3.把配置项给实例对象
	myChart.setOption(option)
	// 4.图表跟随屏幕大小自动适应
	window.addEventListener('resize', function () {
		myChart.resize()
	})
})();

// 饼状图1
(function() {
	// 1. 实例化对象
	var myChart = echarts.init(document.querySelector(".pie .chart"))
	// 2.指定配置
	var option = {
		color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
		tooltip: {
			trigger: 'item',  // 触发类型。数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
			formatter: '{a} <br/>{b}: {c} ({d}%)',
			// 字符串模板
			// 折线（区域）图、柱状（条形）图、K线图 : {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
		  // 散点图（气泡）图 : {a}（系列名称），{b}（数据名称），{c}（数值数组）, {d}（无）
			// 地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
      // 饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
		},
		legend: {  // 图例
			bottom: '0%',
			textStyle: {  // 图例组件的文字样式
				color: 'rgba(255, 255, 255, .5)',
				fontSize: '12'
			},
			itemWidth: 10,  // 图例标记的图形宽度
			itemHeight: 10  // 图例标记的图形高度
		},
		series: [
			{
				name: '年龄分布',
				type: 'pie',
				data: [
					{ value: 1, name: '20岁以下'},
					{ value: 4, name: '20-29岁'},
					{ value: 3, name: '30-39岁'},
					{ value: 1, name: '40-49岁'},
					{ value: 1, name: '50岁以上'},
				],
				radius: ['40%', '60%'],  // 饼图的半径。Array：数组的第一项是内半径，第二项是外半径。
				center: ['50%', '36%'],  // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
				avoidLabelOverlap: false,  // 是否启用防止标签重叠策略，默认开启，在标签拥挤重叠的情况下会挪动各个标签的位置，防止标签间的重叠。如果不需要开启该策略，例如圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
				label: {  // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
					show: false,
					position: 'center'  // 在饼图中心位置
				},
				labelLine: {  // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线。
					show: false
				}
			}
		]
	}
	// 3.把配置项给实例对象
	myChart.setOption(option)
	// 4.图表跟随屏幕大小自动适应
	window.addEventListener('resize', function () {
		myChart.resize()
	})
})();

// 饼状图2
(function() {
	// 1. 实例化对象
	var myChart = echarts.init(document.querySelector(".pie2 .chart"))
	// 2.指定配置
	var option = {
		color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
		tooltip: {
			trigger: 'item',  // 触发类型。数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
			formatter: '{a} <br/>{b} : {c} ({d}%)'
		},
		legend: {  // 图例
			bottom: '0%',
			itemWidth: 10,
			itemHeight: 10,
			textStyle: {
				color: 'rgba(255, 255, 255, .5)',
				fontSize: '12'
			}
		},
		series: [
			{
				name: '地区分布',
				type: 'pie',
				data: [
					{ value: 20, name: '云南'},
					{ value: 26, name: '北京'},
					{ value: 24, name: '山东'},
					{ value: 25, name: '河北'},
					{ value: 20, name: '江苏'},
					{ value: 25, name: '浙江'},
					{ value: 30, name: '四川'},
					{ value: 42, name: '湖北'}
				],
				radius: ['10%', '70%'],
				center: ['50%', '42%'],
				roseType: 'radius',  // 是否展示成南丁格尔图，通过半径区分数据大小
				label: {  // 图形的文字标签
					fontSize: 10
				},
				labelLine: {  // 连接图形和文字的线条
					length: 6,  // 视觉引导线第一段的长度 （链接图形的线条）
					length2: 8  // 视觉引导线第二段的长度 （链接文字的线条）
				}
			}
		]
	}
	// 3.把配置项给实例对象
	myChart.setOption(option)
	// 4.图表跟随屏幕大小自动适应
	window.addEventListener('resize', function () {
		myChart.resize()
	})
})();

// 地图
(function() {
	// 1. 实例化对象
	var myChart = echarts.init(document.querySelector(".map .chart"))
	// 地区数据
	var geoCoordMap = {
		上海: [121.4648, 31.2891],
		东莞: [113.8953, 22.901],
		东营: [118.7073, 37.5513],
		中山: [113.4229, 22.478],
		临汾: [111.4783, 36.1615],
		临沂: [118.3118, 35.2936],
		丹东: [124.541, 40.4242],
		丽水: [119.5642, 28.1854],
		乌鲁木齐: [87.9236, 43.5883],
		佛山: [112.8955, 23.1097],
		保定: [115.0488, 39.0948],
		兰州: [103.5901, 36.3043],
		包头: [110.3467, 41.4899],
		北京: [116.4551, 40.2539],
		北海: [109.314, 21.6211],
		南京: [118.8062, 31.9208],
		南宁: [108.479, 23.1152],
		南昌: [116.0046, 28.6633],
		南通: [121.1023, 32.1625],
		厦门: [118.1689, 24.6478],
		台州: [121.1353, 28.6688],
		合肥: [117.29, 32.0581],
		呼和浩特: [111.4124, 40.4901],
		咸阳: [108.4131, 34.8706],
		哈尔滨: [127.9688, 45.368],
		唐山: [118.4766, 39.6826],
		嘉兴: [120.9155, 30.6354],
		大同: [113.7854, 39.8035],
		大连: [122.2229, 39.4409],
		天津: [117.4219, 39.4189],
		太原: [112.3352, 37.9413],
		威海: [121.9482, 37.1393],
		宁波: [121.5967, 29.6466],
		宝鸡: [107.1826, 34.3433],
		宿迁: [118.5535, 33.7775],
		常州: [119.4543, 31.5582],
		广州: [113.5107, 23.2196],
		廊坊: [116.521, 39.0509],
		延安: [109.1052, 36.4252],
		张家口: [115.1477, 40.8527],
		徐州: [117.5208, 34.3268],
		德州: [116.6858, 37.2107],
		惠州: [114.6204, 23.1647],
		成都: [103.9526, 30.7617],
		扬州: [119.4653, 32.8162],
		承德: [117.5757, 41.4075],
		拉萨: [91.1865, 30.1465],
		无锡: [120.3442, 31.5527],
		日照: [119.2786, 35.5023],
		昆明: [102.9199, 25.4663],
		杭州: [119.5313, 29.8773],
		枣庄: [117.323, 34.8926],
		柳州: [109.3799, 24.9774],
		株洲: [113.5327, 27.0319],
		武汉: [114.3896, 30.6628],
		汕头: [117.1692, 23.3405],
		江门: [112.6318, 22.1484],
		沈阳: [123.1238, 42.1216],
		沧州: [116.8286, 38.2104],
		河源: [114.917, 23.9722],
		泉州: [118.3228, 25.1147],
		泰安: [117.0264, 36.0516],
		泰州: [120.0586, 32.5525],
		济南: [117.1582, 36.8701],
		济宁: [116.8286, 35.3375],
		海口: [110.3893, 19.8516],
		淄博: [118.0371, 36.6064],
		淮安: [118.927, 33.4039],
		深圳: [114.5435, 22.5439],
		清远: [112.9175, 24.3292],
		温州: [120.498, 27.8119],
		渭南: [109.7864, 35.0299],
		湖州: [119.8608, 30.7782],
		湘潭: [112.5439, 27.7075],
		滨州: [117.8174, 37.4963],
		潍坊: [119.0918, 36.524],
		烟台: [120.7397, 37.5128],
		玉溪: [101.9312, 23.8898],
		珠海: [113.7305, 22.1155],
		盐城: [120.2234, 33.5577],
		盘锦: [121.9482, 41.0449],
		石家庄: [114.4995, 38.1006],
		福州: [119.4543, 25.9222],
		秦皇岛: [119.2126, 40.0232],
		绍兴: [120.564, 29.7565],
		聊城: [115.9167, 36.4032],
		肇庆: [112.1265, 23.5822],
		舟山: [122.2559, 30.2234],
		苏州: [120.6519, 31.3989],
		莱芜: [117.6526, 36.2714],
		菏泽: [115.6201, 35.2057],
		营口: [122.4316, 40.4297],
		葫芦岛: [120.1575, 40.578],
		衡水: [115.8838, 37.7161],
		衢州: [118.6853, 28.8666],
		西宁: [101.4038, 36.8207],
		西安: [109.1162, 34.2004],
		贵阳: [106.6992, 26.7682],
		连云港: [119.1248, 34.552],
		邢台: [114.8071, 37.2821],
		邯郸: [114.4775, 36.535],
		郑州: [113.4668, 34.6234],
		鄂尔多斯: [108.9734, 39.2487],
		重庆: [107.7539, 30.1904],
		金华: [120.0037, 29.1028],
		铜川: [109.0393, 35.1947],
		银川: [106.3586, 38.1775],
		镇江: [119.4763, 31.9702],
		长春: [125.8154, 44.2584],
		长沙: [113.0823, 28.2568],
		长治: [112.8625, 36.4746],
		阳泉: [113.4778, 38.0951],
		青岛: [120.4651, 36.3373],
		韶关: [113.7964, 24.7028]
	};
	
	var XAData = [
		[{name: '西安'}, {name: '拉萨', value: 100}],
		[{name: '西安'}, {name: '上海', value: 100}],
		[{name: '西安'}, {name: '广州', value: 100}],
		[{name: '西安'}, {name: '西宁', value: 100}],
		[{name: '西安'}, {name: '银川', value: 100}]
	];
	
	var ZZData = [
		[{ name: '郑州' }, { name: '北京', value: 100 }],
		[{ name: '郑州' }, { name: '成都', value: 100 }],
		[{ name: '郑州' }, { name: '广州', value: 100 }],
		[{ name: '郑州' }, { name: '西安', value: 100 }],
		[{ name: '郑州' }, { name: '深圳', value: 100 }]
	];

	var CDData = [
		[{ name: '成都' }, { name: '北京', value: 100 }],
		[{ name: '成都' }, { name: '郑州', value: 100 }],
		[{ name: '成都' }, { name: '上海', value: 100 }],
		[{ name: '成都' }, { name: '西安', value: 100 }],
		[{ name: '成都' }, { name: '深圳', value: 100 }]
	];
	
	var convertData = function (data) {
		var res = []
		for (var i = 0; i < data.length; i++) {
			var dataItem = data[i]
			var fromCoord = geoCoordMap[dataItem[0].name]  // 获取出发地的坐标
			var toCoord = geoCoordMap[dataItem[1].name]  // 获取目的地的坐标
			if (fromCoord && toCoord) {
				res.push({
					fromName: dataItem[0].name,
					toName: dataItem[1].name,
					coords: [fromCoord, toCoord],
					value: dataItem[1].value
				})
			}
		}
		return res
	}
	
	// 飞机的图形
	var planePath =
	    "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
	
	var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色
	var series = [];
	
	// 这块注意下：两个符号相邻的时候记得用';'分号结束下上面的语句
	[['西安', XAData], ['郑州', ZZData], ['成都', CDData]].forEach(function (item, i) {
		series.push(
			// 第一个对象是绘制航线运动的点
			{
				// name: item[0] + 'Top3',  // 动态设置图例的显示内容
				type: 'lines',  // 路径图,用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
				data: convertData(item[1]),
				zlevel: 1,  // zlevel用于 Canvas 分层,zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面。
				effect: {  // 线特效的配置
					show: false,  // 是否显示特效。
					period: 6,  // 特效动画的时间，单位为 s
					trailLength: 0.7,  // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
					color: "red", // 特效标记的颜色
					symbolSize: 3  // 特效标记的大小
				},
				lineStyle: {  // 线的相关设置
					color: color[i],
					width: 0,  // 线条宽度设置为0，让航线不再有航线，但是有轨迹
					curveness: .2  // 航线运动时的弯曲度。边的曲度，支持从 0 到 1 的值，值越大曲度越大。
				}
			},
			// 第二个对象绘制的是航线
			{
				name: item[0] + ' Top3',
				type: 'lines',
				data: convertData(item[1]),
				zlevel: 2,
				symbol: ['none', 'arrow'],  // 线两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定
				symbolSize: 10,  // 线两端的标记大小
				effect: {
					show: true,
					period: 6,
					trailLength: 0,  // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
					symbol: planePath,  // 特效图形的标记。可以通过 'image://url' 设置为图片
					symbolSize: 15
				},
				lineStyle: {
					color: color[i],
					width: 1,
					curveness: .2,
					opacity: .6
				}
			},
			// 第三个对象绘制的是终点以及效果
			{
				name: item[0] + ' Top3',
				type: 'effectScatter',  // 带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
				zlevel: 2,
				data: item[1].map(function (dataItem) {
					return {
						// 这块注意下：这里是根据上面定义的三个数据（XAData，ZZData, CDData）的第二个对象的数值来绘制涟漪原点的。
						name: dataItem[1].name,
						value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
					}
				}),
				coordinateSystem: 'geo',  // 该系列使用的坐标系,'geo'使用地理坐标系
				rippleEffect: {  // 涟漪特效相关配置。
					brushType: 'stroke'  // 波纹的绘制方式
				},
				label: {  // 图形上的文本标签，可用于说明图形的一些数据信息。这里是城市名字
					show: true,
					position: 'right',
					formatter: '{b}'
				},
				symbolSize: function(val) {
					return val[2] / 8
				},
				itemStyle: {
					color: color[i],
					emphasis: {
						areaColor: '#2B91B7'
					}
				}
			}
		)
	})
	// 2.指定配置
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: function (params, ticket, callback) {
				if (params.seriesType == 'effectScatter') {
					return '线路：' + params.data.name + '  ' + params.data.value[2]
				} else if (params.seriesType == 'lines') {
					return (
						params.data.fromName +
						'--->' + 
						params.data.toName + 
						'<br />' +
						params.data.value
					)
				} else {
					return params.name
				}
			}
		},
		legend: {
			orient: 'vertical',  // 图例列表的布局朝向。
			left: 'right',  // 如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
			top: 'bottom',
			textStyle: {
				color: '#fff'
			},
			selectedMode: 'multiple'  // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。 除此之外也可以设成 'single' 或者 'multiple' 使用单选或者多选模式。
		},
		geo: {  // 地理坐标系组件。地理坐标系组件用于地图的绘制
			map: 'china',
			label: {  // 标签高亮时的设置
				emphasis: {  // 高亮
					show: true,
					color: '#fff'
				}
			},
			zoom: 1.2,  // 当前视角的缩放比例。这里是把地图放大1.2倍
			roam: true,  // 是否开启鼠标缩放和平移漫游。默认不开启。设置成 true 为都开启
			itemStyle: {  // 地图区域的多边形 图形样式
				areaColor: 'rgba(20, 41, 87, .6)',  // 地图区域的颜色
				borderWidth: 1,
				borderColor: '#195BB9',  // 图形的描边颜色
				emphasis: {
					areaColor: '#2B91B7'  // 高亮时区域的颜色设置
				}
			}
		},
		series: series
	}
	// 3.把配置项给实例对象
	myChart.setOption(option)
	// 4.图表跟随屏幕大小自动适应
	window.addEventListener('resize', function () {
		myChart.resize()
	})
})();

