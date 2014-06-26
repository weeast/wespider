// JavaScript Document

var SCREEN_WIDTH;
var SCREEN_HEIGHT;
var SYS_processor;
var SYS_collisionManager;
var SYS_timeInfo;
var SYS_spriteParams;

var playerControl = function(){
	
	var controlInfo = {
		singleClick:[0,{x:0,y:0}],
		doubleClick:[0,{x:0,y:0}],
		drag:[0,{x:0,y:0},{x:0,y:0}]			
	}
	
	return controlInfo;
}();

var vector2d = function(x,y){
	var vec = {
		vx : x,
		vy : y,
		
		negate : function(){
			
		},
		
		length : function(){
			
		},
		
		normalize : function(){
			
		},
		
		dot : function(){
	
		}
	}
	
	return vec;
};


var processor = function(){
	var processList = [];
	var addedItem = [];	
	return {

		add : function(process){
			
		},

		process : function(){
			
		}

	}	
};

var conllisionManager = function(){
	var gridWidth;
	var gridHeight;
	var listIndex = 0;
	var grid = [];
	var checkListIndex = 0;
	var checklist = {};

	var getGridList = function(x,y){
		
	}

	return{
		newCollider : function(colliderFlag,collideeFlags,position,callback,collisionFuc){
			var list,indexStr = '' + listIndex++,
				checkIndex;
			var colliderObj = {
				colliderFlag : colliderFlag,
				collideeFlags : collideeFlags,

				update : function(){
					
				},

				remove : function(){
					
				},

				callback : function(){
					
				},
				
				collision : collisionFuc,

				checkCollisions : function(offsetX,offsetY){
					
				}
	
			}
		},

		checkCollisions : function(){
			
		}
	};
};

var canvasSprite = function(params){
	
};

var timeInfo = function(goalFPS){
	var oldTime,
		paused = true,
		interCount = 0,
		totalFPS = 0,
		totalCoeff = 0;
		
	return{

		getInfo : function(){
		
			
		},

		pause : function(){
			
		}
	};
};

var animEffect = function(x,y,imageList,timeout){

};

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
		
	};
		
	that.getXY = function(){
		
	};
	
	that.getZ = function(){
		
	};
	
	that.remove = function(){
		
	};
	
	that.move = function(){
		
	};
	
	that.insertCollider = function(colliderFlag,collideeFlags){

	};
	
	that.hit = function(){
		
	};
	
	return that;
}

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
		
	return that = {

		move : function(){
			
		},

		newInsect : function(kindNum){
			
		},

		isInsect : function(position){
			
		}

	};
};

var spider = function(gameCallback){
	var health =  100,
		x = SCREEN_WIDTH/2,
		y = SCREEN_HEIGHT/2,
		spiderRadius,
		speed,
		collider,
		state,
		that = canvasSprite(SYS_spriteParams),
		moveVector;

		var collision =  function(insect){
			
		};

		that.move = function(){
			
		};
	return {

		init : function(){
			
		},

		destory : function(){
			
		},

		hit : function(insect){
			
		},

		getHealth : function(){
			
		},

		addHealth : function(num){
			
		},

		reduceHealth : function(num){
			
		},

		getXY : function(){
			
		}

	};
};
				
var net = function(sPoint,ePoint){
	var collider,

		lineSplite = function(){
			
		};
		
	return {
		hit : function(){
			
		},

		draw : function(){
			
		},

		getPoint : function(){
			
		},

		remove : function(){
			
		}

	};
};

var netManager = function(gameCallBack){
	var netList = {},
		netListIndex = 0,
		newNet,
		that = {
			move : function(){
				
			},
			
			newNet : function(sPoint,ePoint){
				
			},
			
			onNet : function(point){
				
			}
			
		};
	return that;
};

var tree = function(){
	var treeMap = {};
	return {
		init : function(treeKind){
			
		},
		
		onTree : function(point){
			
		}
		
	};
};

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
		
		init = function(){
			
		},
		
		gameStop = function(){
			
		},
		
		gameOver = function(){
			
		},
		
		gameCallBack = function(){
			
		},
		
		gameLoop = function(){
			
		};
		
	gameLoop();
}();
