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

var images = {
	'spider.png':new Image(),
	'bug.gif':new Image(),
	'bug.png':new Image(),
	'goo.png':new Image(),
	'ball.png':new Image(),
	'pull.png':new Image()
}

images['spider.png'].src = './img/spider.png';
images['bug.gif'].src = './img/bug.gif';
images['bug.png'].src = './img/bug.png';
images['goo.png'].src = './img/goo.png';
images['pull.png'].src = './img/pull.png';
images['ball.png'].src = './img/ball.png';


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
			gameTime = 999000,
			gameState = 'freeze',
			score = 0,
			
			insectTimeout = 0,
			gameOverFlag = true,
			mySpider,
			
			start = function(){
				init();	
				gameState = 'playing';
				gameOverFlag = false;				
				
			},
			
			
			
			newInsect = function(){
				clearTimeout(insectTimeout);
				insectTimeout = setTimeout(function(){
					SYS_insects.newInsect(Math.floor((Math.random()*10))%3);
					newInsect();
					},Math.floor((Math.random()*3000))+4000);
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
				SYS_nets = netManager();
				SYS_trees = tree();
				SYS_trees.init(0);
				SYS_processor.add(SYS_insects);
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
				gameState = 'freeze';
				gameOverFlag = true;
				time.pause();
				clearTimeout(insectTimeout);
			},
			
			updateInfo = function(){
				if(gameTime<=0){
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
						score += messageObj.point;
						mySpider.addHealth(messageObj.health);
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
					if(Math.floor(gameTime/1000)-Math.floor(((gameTime-= 15)/1000)))
						mySpider.reduceHealth(1);
					updateInfo();
					SYS_timeInfo = time.getInfo();
					$("#x").text(SYS_timeInfo.FPS);
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
		$("#startbtn").click(start);
	}();
});