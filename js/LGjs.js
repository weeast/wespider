// JavaScript Document

//全局变量
var SCREEN_WIDTH;
var SCREEN_HEIGHT;
var SYS_processor;
var SYS_collisionManager;
var SYS_timeInfo;
var SYS_spriteParams;

//玩家操作类
var playerControl = function(){
	//识别玩家的操作，并将其保存在变量controlInfo中
	
	var controlInfo = {
		singleClick:[0,{x:0,y:0}],
		doubleClick:[0,{x:0,y:0}],
		drag:[0,{x:0,y:0},{x:0,y:0}]			
	}
	
	return controlInfo;
}();

//向量类
var vector2d = function(x,y){
	var vec = {
		vx : x,
		vy : y,
		
		negate : function(){
			//反向量,返回： vector
		},
		
		length : function(){
			//求向量长度,返回：number；
		},
		
		normalize : function(){
			//该向量的单位向量	,返回：vector；
		},
		
		dot : function(){
			//该向量的点积；返回：number	
		}
	}
	
	return vec;
};

//游戏主处理进程类
var processor = function(){
	var processList = [];//存放并处理所有游戏对象的列表
	var addedItem = [];//上一次调用后新增加的游戏对象列表
	
	return {
		
		/*
		函数名：add
		描述：向addedItem中添加新增加的游戏对象，在下一次调用时添加至processList中，添加的游戏对象应为canvasSprite类型；
		参数：canvasSprite
		返回：无*/
		add : function(process){
			
		},
		
		/*
		函数名：process
		描述：控制所有游戏对象进行移动，并通过游戏对象的removed 标记控制游戏对象的删除，通过addedItem控制游戏对象的增加；
		参数：无；
		返回：无*/
		process : function(){
			
		}

	}	
};

//碰撞检测类
var conllisionManager = function(){
	var gridWidth;
	var gridHeight;
	var listIndex = 0;
	var grid = [];
	var checkListIndex = 0;
	var checklist = {};
	
	/*
	函数名：getGridList
	描述：通过接受画布上的x、y坐标来返回网格；
	参数：number，number（x，y）；
	返回：Object（grid）；*/
	var getGridList = function(x,y){
		
	}

	return{
		/*
		函数名：newCollider
		描述：由需要和 其他对象发生碰撞的游戏对象调用，生成一个碰撞对象；
		参数：number（colliderFlag主动碰撞标签），number（collideeFlags被动碰撞标签），Array（position的{x，y}），Function（callback回调函数）；
		返回：Object（colliderObj）;*/
		newCollider : function(colliderFlag,collideeFlags,position,callback,collisionFuc){
			var list,
				indexStr = '' + listIndex++,
				checkIndex;
			var colliderObj = {
				colliderFlag : colliderFlag,
				collideeFlags : collideeFlags,
				
				/*
				函数名：update
				描述：碰撞对象改变位置后，调用该函数进行更新碰撞对象在网格中的位置，以及碰撞对象刚生成时在网格中的位置（需要判断该对象是蜘蛛网或者其他）；
				参数：无；
				返回：无*/
				update : function(){
					
				},
				
				/*
				函数名：remove
				描述：将碰撞对象从网格中移除，如果有collideeFlag标签为1，则还需从碰撞列表中移除；
				参数：无；
				返回：无；*/
				remove : function(){
					
				},
				
				/*
				函数名：callback
				描述：碰撞对象发生碰撞时调用的函数；
				参数：无；
				返回：无；*/
				callback : function(){
					
				},
				
				collision : collisionFuc,
				
				/*
				函数名：checkCollisions
				描述：碰撞对象扫描与偏离中心offsetX和offsetY距离网格内的碰撞对象是否发生碰撞；
				参数：number（offsetX），number（offsetY）；
				返回：bool；*/
				checkCollisions : function(offsetX,offsetY){
					
				}
	
			}
		},
		
		/*
		函数名：checkCollisions
		描述：调用checkList中碰撞对象自己的checkCollisions函数来检测碰撞；
		参数：无；
		返回：无；*/
		checkCollisions : function(){
			
		}
	};
};

//画布元素对象
var canvasSprite = function(params){
	//所有画布上的对象的基础类，包括画布对象的位移、渲染和动画。
	
};

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
		
			
		},
		
		/*
		函数名：pause
		描述：暂停计数，即设置暂停标签，游戏中所有暂停都应调用该方法；
		参数：无；
		返回：无；*/
		pause : function(){
			
		}
	};
};

//动画类
var animEffect = function(x,y,imageList,timeout){

};

//昆虫类
var insect = function(x,y,kind,frame,gameCallBack){
	var x = x,
		y = y,
		z = 1000,
		radius = frame/2,
		that = canvasSprite(SYS_spriteParams),
		collider,
		moveVector;
		that.clearTimeOut;
		that.clearTime;
		that.catchFlag = 0;	
		
	var collision = function(net){
		//昆虫检测碰撞的函数，检测与蜘蛛网的碰撞，返回bool
	};
		
	that.getXY = function(){
		//返回昆虫的xy
	};
	
	that.getZ = function(){
		//返回昆虫的z值
	};
	
	that.remove = function(){
		//将昆虫从SYS_processor，和碰撞列表中移除，并且播放动画；
	};
	
	that.move = function(){
		//根据昆虫的移动向量来改变昆虫的位置，之后改变昆虫的移动向量，并减小z，使其做圆周运动，改变昆虫的图片，在昆虫的位置上画出昆虫
	};
	
	that.insertCollider = function(colliderFlag,collideeFlags){
		//将collider根据参数初始化，并且添加到碰撞检测列表中
	};
	
	that.hit = function(){
		//昆虫被碰撞之后调用的函数，需要根据碰撞对象的类型进行判断，如果是蜘蛛，则向游戏返回昆虫被吃的信息，并且调用that.remove()将昆虫移除，如果是蜘蛛网，则将catchFlag置为1，并将昆虫从碰撞列表中删除
	};
	
	return that;
}

//昆虫管理类
var insectsManager = function(){
	var insectKinds = [
		{point:0,health:0},
		{point:0,health:0},
		{point:0,health:0}
		],
		newInsectList = {},
		newListIndex = 0,
		catchedInsectList = {},
		catchedListIndex = 0;
		
	return {
			
			/*
		函数名：move
		描述：分别对newInsectList和catchedInsectList中的昆虫调用他们的move，并且检查newInsect的z轴，若为0则将其添加到碰撞列表，若小于0将其移除，以及newInsect的catchedFlag,若为1则添加到catchedInsectList，添加到碰撞列表,若标记为removed则将其从list中删除并解除settimeout；
		参数：无；
		返回：无；*/
		move : function(){
			
		},
		
		/*
		函数名：newInsect
		描述：产生一个昆虫，并 加入newInsectList；
		参数：number；
		返回：无；*/
		newInsect : function(kindNum){
			
		},
		
		/*
		函数名：isInsect
		描述：检测一个点是否有昆虫；
		参数：Object（{x，y}）；
		返回：bool；*/
		isInsect : function(position){
			
		}

	};
};

//蜘蛛类
var spider = function(gameCallback){
	var health =  100,
		x = SCREEN_WIDTH/2,
		y = SCREEN_HEIGHT/2,
		spiderRadius,
		collider,
		state = {
			Moving:[0,{x:0,y:0}],				//为1则表示正在移动，xy表示移动位置
			Neting:[0,[{x:0,y:0},{x:0,y:0}]],	//为1则表示正在织网或者正在赶去织网， 
			Eating:[0,{x:0,y:0}],				//为1则表示正在赶去吃虫子， 
			Static:0 							//为1则表示正静止
		},
		that = canvasSprite(SYS_spriteParams),
		moveVector;
		
		/*
		函数名：collision：
		描述：蜘蛛的碰撞检测函数，主要检测与昆虫的碰撞。
		参数：insect；
		返回：bool；*/
		var collision =  function(insect){
			
		};
		
		/*
		函数名：that.move：
		描述：根据playerControl类判断玩家的操作，并对玩家的操作的合法性进行检查，即移动是否超出边界、织网的起点和终点是否在网和树枝上等等（若是捕食，则将蜘蛛的碰撞对象添加到SYS_collisionManager中），并根据蜘蛛之前的状态对蜘蛛进行不同操作，辅以SYS_timeInfo（控制游戏的帧数）、moveVector（蜘蛛移动的x和y方向上的距离）改变蜘蛛位置和蜘蛛状态，由SYS_processor进行统一调用。
		参数：无
		返回：无*/
		that.move = function(){
			
		};
	return {
		
		/*
		函数名：init：
		描述：初始化蜘蛛，包括改变蜘蛛canvasSprite对象实例的图片，画出蜘蛛，将蜘蛛的canvasSprite对象添加到SYS_processor中；
		参数：无
		返回：无*/
		init : function(){
			
		},
		
		/*
		函数名：destory：
		描述：销毁蜘蛛，将蜘蛛从SYS_collisionManager和SYS_processor删除；
		参数：无
		返回：无；*/
		destory : function(){
			
		},
		
		/*
		函数名：hit：
		描述：蜘蛛检测到和昆虫碰撞之后的回调函数，加血加分等，要调用gameCallback；
		参数：insects;
		返回：无*/
		hit : function(insect){
			
		},

		/*
		函数名：getHealth：
		描述：获取蜘蛛当前血量；
		参数：无；
		返回：health；*/
		getHealth : function(){
			
		},
		
		/*addHealth：
		描述：增加蜘蛛血量，并检查参数是否在合法范围（总血量不能超过100，若大于一百就保持在100），返回增加后的蜘蛛血量；
		参数：number;
		返回：health；*/
		addHealth : function(num){
			
		},
		
		/*reduceHealth：
		描述：减少蜘蛛血量，并检查参数是否在合法范围（总血量不能少于0，若小于0就保持在0，并调用gameCallback函数向游戏返回血量为0的信息），返回减少后的蜘蛛血量；
		参数：number；
		返回：health;*/
		reduceHealth : function(num){
			
		},
		
		/*getXY:
		描述：返回蜘蛛的位置；
		参数：无；
		返回：{x,y}；*/
		getXY : function(){
			
		}

	};
};

//蜘蛛网类				
var net = function(sPoint,ePoint){
	var collider,
	
		/*lineSplite
		描述：根据蜘蛛网的起点与终点，计算出蜘蛛网与碰撞网格的交点并返回；
		参数：无；
		返回：Array；*/
		lineSplite = function(){
			
		};
		
	return {
		/*that.hit
		描述：蜘蛛网被碰撞时调用的函数，暂时不用作处理
		参数：无；
		返回：无*/
		hit : function(){
			
		},
		
		/*that.draw
		描述：根据起点终点在画布上画出蜘蛛网；
		参数：无；
		返回：无*/
		draw : function(){
			
		},
		
		/*that.getPoint
		描述：返回网的起点和终点；
		参数：无；
		返回：[
			{x，y}，
			{x，y}
		]*/
		getPoint : function(){
			
		},
		
		/*that.remove
		描述：将直线移除，设置removed，并且将其从碰撞列表中移除；
		参数：无；
		返回：无*/
		remove : function(){
			
		}

	};
};

//蜘蛛网管理类
var netManager = function(gameCallBack){
	var netList = {},
		netListIndex = 0,
		newNet,
		that = {
			/*that.move
			描述：将netList中的所有net都draw一遍，并将标记了removed的网移除，并且检测是否新的蜘蛛网已经完成，完成则将其添加到netList中，并将newNet置空；
			参数：无；
			返回：无；*/
			move : function(){
				
			},
			
			/*that.newNet
			描述：新生成蜘蛛网，并将其赋值给newNet；
			参数：Object（sPoint{x，y}）,Object（ePoint{x，y}）
			返回：无；*/
			newNet : function(sPoint,ePoint){
				
			},
			
			/*that.onNet
			描述：判断一个点是否在蜘蛛网上，遍历所有netList中的网（初步方案）；
			参数：Object（point{x，y}）；
			返回：bool；*/
			onNet : function(point){
				
			}
			
		};
	return that;
};

//树枝类
var tree = function(){
	var treeMap = {};
	return {
		/*init:
		描述：画出并初始化树枝；
		参数：treeKind；
		返回：无；*/
		init : function(treeKind){
			
		},
		
		/*onTree
		描述：判断一个点是否在树枝上；
		参数：Object（point{x，y}）；
		返回：无；*/
		onTree : function(point){
			
		}
		
	};
};

//游戏顶层类
var game = function(){
	var time,
		gameState = 'freeze',
		score = 0,
		insects,
		nets,
		trees,
		gameOverFlag = true,
		mySpider,
		insectTime,
		
		addInsect = function(){
			
		},
		
		updateInfo = function(){
			
		},
		
		/*init
		描述：清楚画布，之后初始化各个管理器以及蜘蛛；
		参数：无；
		返回：无*/
		init = function(){
			
		},
		
		gameStop = function(){
			
		},
		
		/*gameOver
		描述：游戏结束函数，调用在之后设置游戏结束标签，清除画布并且设置游戏状态；
		参数：无；
		返回：无；*/
		gameOver = function(){
			
		},
		
		/*gameCallBack
		描述：响应游戏过程中返回的信息，并作出处理；
		参数：Object；
		返回：无；*/
		gameCallBack = function(){
			
		},
		
		/*gameLoop
		描述：游戏主循环体，没每15ms执行一次，通过gameState和gameOverFlag进行判断游戏状态，获取timeInfo，并且执行碰撞检测和主进程，或者执行游戏结束函数；
		参数：无；
		返回：无*/
		gameLoop = function(){
			
		};
		
	gameLoop();
}();
