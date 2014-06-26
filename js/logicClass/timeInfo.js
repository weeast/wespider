// JavaScript Document
//游戏帧数控制类
var timeInfo = function(goalFPS){
	var oldTime,
		paused = true,
		interCount = 0,
		totalFPS = 0,
		totalCoeff = 0;
		
	return{
			/*
		函数名：getInfo
		描述：计算上次调用之后所用的时间、FPS、时间延迟等，得到的信息来保证游戏FPS看起来一致；
		参数：无；
		返回：Object*/
		getInfo : function(){
			if(paused === true){
				paused = false;
				oldTime = +new Date();//时间的毫秒级 值
				return{
					elapsed : 0,
					coeff : 0,
					FPS : 0,
					averageFPS : 0,
					averageCoeff : 0	
				};
			}
			
			var newTime = +new Date();	
			var elapsed = newTime - oldTime;//上一次调用后使用的时间
			oldTime = newTime;
			var FPS = 1000 / elapsed;//实际帧率
			interCount++;
			totalFPS += FPS;
			var coeff = goalFPS / FPS;//时间系数
			totalCoeff += coeff;
			
			return{
				elapsed : elapsed,
				coeff : goalFPS / FPS,
				FPS : FPS,
				averageFPS : totalFPS / interCount,
				averageCoeff : totalCoeff / interCount		
			}
		},
		
		/*
		函数名：pause
		描述：暂停计数，即设置暂停标签，游戏中所有暂停都应调用该方法；
		参数：无；
		返回：无；*/
		pause : function(){
			paused = true;
		}
	};
};