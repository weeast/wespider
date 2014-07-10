// JavaScript Document
var SCREEN_WIDTH = 960;
var SCREEN_HEIGHT = 640;
var SPIDER = 1;
var NET = 2;
var SYS_processor;
var SYS_collisionManager;
var SYS_timeInfo;
var SYS_insects;
var SYS_nets;
var SYS_trees;
var SYS_spriteParams = {
	width : 54,
	height : 54,
	imagesWidth : 0,
	images : './img/',
};
var SYS_difficulty = {
	every_reduce : 2,
	insect_number : 1,
	insect_time :　3000,
	net_reduce : 30
};

var images = {
	'spider.png':new Image(),
	'bug.gif':new Image(),
	'bug.png':new Image(),
	'goo.png':new Image(),
	'ball.png':new Image(),
	'pull.png':new Image(),
	'treeDown.png':new Image(),
	'treeUp.png':new Image()
}

images['spider.png'].src = './img/spider.png';
images['bug.gif'].src = './img/bug.gif';
images['bug.png'].src = './img/bug.png';
images['goo.png'].src = './img/goo.png';
images['pull.png'].src = './img/pull.png';
images['ball.png'].src = './img/ball.png';
images['treeUp.png'].src = './img/treeUp.png';
images['treeDown.png'].src = './img/treeDown.png';


//游戏顶层类

$(document).ready(function(e) {
	
	SYS_spriteParams["canvasbuffer"] = document.createElement("canvas");
	SYS_spriteParams["canvas"] = document.getElementById("main_canvas");
	SYS_spriteParams.canvasbuffer.width = SYS_spriteParams.canvas.width;  
    SYS_spriteParams.canvasbuffer.height = SYS_spriteParams.canvas.height;	
	SYS_spriteParams["ctxbuffer"] =SYS_spriteParams.canvasbuffer.getContext("2d");	
	SYS_spriteParams["ctx"] = document.getElementById("main_canvas").getContext("2d");

	//游戏顶层类
	var game = function(){
		var time,
			gameTime,
			gameState = 'freeze',
			score,
			level,
			insectTimeout = 0,
			gameOverFlag = true,
			mySpider,
			
			start = function(){
				level=1;
				gameTime = 120000;

				score = 0;
				$("body").append(' <img id="level" src="img/level'+level+'.png" style=" position:absolute; width:104px; height:34px; top:643px; left:620px" />');
				$("#x").text("第"+level+"关");
				SYS_difficulty.every_reduce = 2;
				SYS_difficulty.insect_number = 1;
				SYS_difficulty.insect_time = 3000;
				SYS_difficulty.net_reduce = 30;
				
				
				init();					
				gameState = 'playing';
				gameOverFlag = false;				
				
			},
			
			
			
			newInsect = function(){
				clearTimeout(insectTimeout);
				insectTimeout = setTimeout(function(){
					for(var i=0;i<SYS_difficulty.insect_number;++i)
						SYS_insects.newInsect(Math.floor((Math.random()*10))%3);
					newInsect();
					},Math.floor((Math.random()*3000))+SYS_difficulty.insect_time);
			},
			
			/*init
			描述：清楚画布，之后初始化各个管理器以及蜘蛛；
			参数：无；
			返回：无*/
			init = function(){
				$('#main_canvas').children().remove();
				SYS_insects = insectsManager(gameCallBack);
				SYS_processor = processor();
				SYS_collisionManager = conllisionManager();
				SYS_nets = netManager(gameCallBack);
				SYS_trees = tree();
				SYS_trees.init(0);
				SYS_processor.add(SYS_trees.getUpHalf());
				SYS_processor.add(SYS_insects);
				SYS_processor.add(SYS_trees.getDownHalf());
				SYS_processor.add(SYS_nets);
				gameOverFlag = false;
				mySpider = spider(gameCallBack);
				mySpider.init();
				setTimeout(function(){
					newInsect();
				},10000);
				updateInfo();
				time = timeInfo(60);
				
			},
			
			
			gameStop = function(){
				time.pause();
				gameState = 'pause';			
			},
			
			/*gameOver
			描述：游戏结束函数，调用在之后设置游戏结束标签，清除画布并且设置游戏状态；
			参数：无；
			返回：无；*/
			gameOver = function(){
				
				document.getElementById('gameover').style.top=-300+"px";
				document.getElementById('score_name').style.top=-300+"px";
				document.getElementById('final_score').setAttribute('value',score+Math.floor(gameTime/1000));
				document.getElementById('gameover').style.display='block';
				document.getElementById('score_name').style.display='block';
				document.getElementById('normal_stop').style.display='none';
				$("#gameover").animate({top:'5px'},1000);
				$("#score_name").animate({top:'308px'},1000);
				showFinalScore(score+Math.floor(gameTime/1000));
				gameState = 'freeze';
				updateInfo();
				gameOverFlag = true;
				time.pause();
				clearTimeout(insectTimeout);
			},
			
			updateInfo = function(){
				if(gameTime<=0&&gameState =='playing'){
					gameOver();	
				}
				setHealth(mySpider.getHealth());
				setSound(100);
				SetTheTime(Math.floor(gameTime/1000));
				showScore(score);
			},
			
			/*gameCallBack
			描述：响应游戏过程中返回的信息，并作出处理；
			参数：Object；
			返回：无；*/
			gameCallBack = function(messageObj){
				if(gameOverFlag) return;
				switch (messageObj.message){
					case 'dead':
						gameOver();
						break;
					case 'insectEated':
						var health = 100 - mySpider.getHealth()
						score += messageObj.point;
						if(score>level*40){
							level++;
							$("#level").attr("src",'img/level'+level+'.png');
							gameStop();
							SYS_spriteParams.ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);//清空画布	
							switch(level){
							case 2:
								SYS_difficulty.net_reduce = 20;
								gameTime += 90000;
								$("#message_info").text("第"+level+"关！织网耗血增加，时间+90！");
								break;
							case 3:
								SYS_difficulty.every_reduce = 1;
								gameTime += 80000;
								$("#message_info").text("第"+level+"关！每秒耗血增加，时间+80！");
								break;
							default:
								SYS_difficulty.insect_time +=1000;
								if(level<11){
									gameTime +=(11-level)*10000;
									$("#message_info").text("第"+level+"关!时间+"+(11-level)*10+"！");
								}
								break;								
							}
							init();
							mySpider.reduceHealth(health);
							$("#message_box").css('display','block');
							$("#message_box").animate({top:"500px"},6000,function(){
									$("#message_box").css('display','none').css('top','-300px');	
									gameState = 'playing';		
							});
							
						}
						else
							mySpider.addHealth(messageObj.health);
						break;
					case 'netCreated':
						mySpider.reduceHealth(messageObj.health);
						break;
					default:
						break;
				}
			},
			
			/*gameLoop
			描述：游戏主循环体，没每15ms执行一次，通过gameState和gameOverFlag进行判断游戏状态，获取timeInfo，并且执行碰撞检测和主进程，或者执行游戏结束函数；
			参数：无；
			返回：无*/
			gameLoop = function(){
			switch(gameState){
				case 'playing':
					var beforetime = gameTime;
					gameTime-=15;
					if(Math.floor(beforetime/(1000*SYS_difficulty.every_reduce))-Math.floor((gameTime/(1000*SYS_difficulty.every_reduce))))
						mySpider.reduceHealth(1);
					updateInfo();
					SYS_timeInfo = time.getInfo();
					if(Math.floor(beforetime/2000)-Math.floor(gameTime/2000))
						showFps(SYS_timeInfo.FPS);
					SYS_processor.process();
					SYS_collisionManager.checkCollisions();
					break;
				case 'freeze':
					break;
				case 'pause':
					break;
				default:
					break;					
			}
			setTimeout(gameLoop,15);
		};		
	

		gameLoop();
		$("#start,#replay,#restore").click(start);

		$("#normal_stop").click(gameStop);
		$("#normal_continue,#continue").click(function(){
			gameState = 'playing';
			});
	}();
});