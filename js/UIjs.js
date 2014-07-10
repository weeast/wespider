// JavaScript Document

var down = 0;
var downCoor;
var upCoor;
/*var dargup = 1;
var drag = 0;
	function dragstart(e){
		dargup = 1;
		var e=window.event||e;
		var xCoor=e.clientX;
		var yCoor=e.clientY;
		drag = 1;
		$("#main_canvas").on('mousemove',function(e) {
        	dragover(e);
		});
		$("#main_canvas").on('mouseup',function(e) {
        	mouseup(e);
		});
		$('#x').text(xCoor+ ' '+yCoor);
		return {x:xCoor,y:yCoor};
	} 
	function dragover(e){
		var e=window.event||e;
		var xCoor=e.clientX;
		var yCoor=e.clientY;
		if(drag&&dargup){
		$('#y').text(xCoor+ ' '+yCoor);
		return {x:xCoor,y:yCoor};	
		}	
		else
		return ; 
	}
	
	function mouseup(){
	up = 0;	
	}*/

//画布鼠标拖动事件 
/*function mousedown(e){
	down=1;
		}
	
function mouseUp(e){	
	up=1;
	upCoor=mouseCoor();	
	if(down&&up&&(downCoor[0]!=upCoor[0])||(downCoor[1]!=upCoor[1])){
		return downCoor,upCoor;
		}
		up=0;
		down=0;
	}

	function getX(obj){  
        var parObj=obj;    
        var left=obj.offsetLeft;    
        while(parObj=parObj.offsetParent){    
            left+=parObj.offsetLeft;    
        }    
        return left;    
    }    
    
    function getY(obj){    
        var parObj=obj;    
        var top=obj.offsetTop;    
        while(parObj = parObj.offsetParent){    
            top+=parObj.offsetTop;    
        }    
     return top;    
    }    
    
    function mouseCoor(e){
		var e=window.event||e;    
        var top,left,oDiv;    
        oDiv=document.getElementById("background");    
        top=getY(oDiv);    
        left=getX(oDiv); 
		$("#x").text(((e.clientX-left+document.body.scrollLeft))+" "+((e.clientY-top+document.body.scrollTop)));   
        return [(e.clientX-left+document.body.scrollLeft),(e.clientY-top+document.body.scrollTop) ];        
    }


//画布鼠标事件检测

function sigleClick(e){
	var e=window.event||e;
	var xCoor=e.clientX;
	var yCoor=e.clientY;
	return xCoor,yCoor;
	}
	
function doubleClick(e){
	var e=window.event||e;
	var xCoor=e.clientX;
	var yCoor=e.clientY;
	return xCoor,yCoor;
	}*/

function breakPoint(e){
	var breakid = e.value;
	var breaknet = e.parentNode.id;
	if(SYS_nets.getNet(breaknet)){
		SYS_nets.getNet(breaknet).breakNet(breakid,1);
		SYS_nets.getNet(breaknet).breakNet(breakid,-1);
		SYS_nets.getNet(breaknet).remove();
	}
}

//显示血量和声音长度
function setHealth(health){
	var healthBox = document.getElementById("health");
	healthBox.width=12;
	if(health>=0&&health<=100){		
		healthBox.style.top=Math.floor((10+265-265*(health/100)))+'px';
		healthBox.height=265*(health/100);
		}
	}
function setSound(sound){
	var soundBox=document.getElementById("sound");
	soundBox.width=12;
	if(sound>=0&&sound<=100){
	soundBox.height=244*(sound/100);
		}
	}
	
function showFps(f){
	var firstNumber = document.getElementById("first_fps");
    var secondNumber = document.getElementById("second_fps");
	var fpsArray;
	f = Math.floor(f);
    if (f > 0 ) {
        var momentFps = String(f);
		fpsArray = momentFps.split("");
        if (fpsArray.length == 2) {
            firstNumber.src = "img/fps" + fpsArray[0] + ".png";
            secondNumber.src = "img/fps" + fpsArray[1] + ".png";
       	 }
        else {
            firstNumber.src = "img/fps0.png";
            secondNumber.src = "img/fps" + fpsArray[0] + ".png";
      	 }
	}
	if(f==0){
		firstNumber.src = "img/fps0.png";
        secondNumber.src = "img/fps0.png";
	}		
}

//时间显示
function SetTheTime(time) {
    var firstNumber = document.getElementById("first_time");
    var secondNumber = document.getElementById("second_time");
    var thirdNumber = document.getElementById("third_time");
    var timeArray;
    if (time > -1 ) {
        var momentTime = String(time);
		timeArray = momentTime.split("");
        if (momentTime.length == 3) {
            firstNumber.src = "img/" + timeArray[0] + ".png";
            secondNumber.src = "img/" + timeArray[1] + ".png";
            thirdNumber.src = "img/" + timeArray[2] + ".png";
        }
        else if (momentTime.length == 2) {
            firstNumber.src = "img/0.png";
            secondNumber.src = "img/" + timeArray[0] + ".png";
            thirdNumber.src = "img/" + timeArray[1] + ".png";
        }
        else {
            firstNumber.src = "img/0.png";
            secondNumber.src = "img/0.png";
            thirdNumber.src = "img/" + timeArray[0] + ".png";
        }		
    }
}
function showFinalScore(score){
	var first=document.getElementById('first');
	var second=document.getElementById('second');
	var third=document.getElementById('third');
	var fourth=document.getElementById('fourth');
	var finalS=String(score);
	var scoreArray;
	scoreArray=finalS.split("");
	if(finalS.length==1){	
		first.src="img/0.png";
		second.src="img/0.png";
		third.src="img/0.png";
		fourth.src="img/"+scoreArray[0]+".png";
		}
	else if(finalS.length==2){
		first.src="img/0.png";
		second.src="img/0.png";
		third.src="img/"+scoreArray[0]+".png";
		fourth.src="img/"+scoreArray[1]+".png";
		}
		
	else if(finalS.length==3){
		first.src="img/0.png";
		second.src="img/"+scoreArray[0]+".png";
		third.src="img/"+scoreArray[1]+".png";
		fourth.src="img/"+scoreArray[2]+".png";
		}	
	else {
		first.src="img/"+scoreArray[0]+".png";
		second.src="img/"+scoreArray[1]+".png";
		third.src="img/"+scoreArray[2]+".png";
		fourth.src="img/"+scoreArray[3]+".png";
		}	
	}
//分数显示
function showScore(score){
	var firstScore=document.getElementById("first_score");
	var secondScore=document.getElementById("second_score");
	var thirdScore=document.getElementById("third_score");
	var fourthScore=document.getElementById("fourth_score");
	var scoreArray;
	if(score>-1&&score<1001){
	var momentScore=String(score);
	scoreArray=momentScore.split("");
	if(momentScore.length==1){	
		firstScore.src="img/0.png";
		secondScore.src="img/0.png";
		thirdScore.src="img/0.png";
		fourthScore.src="img/"+scoreArray[0]+".png";
		}
	else if(momentScore.length==2){
		firstScore.src="img/0.png";
		secondScore.src="img/0.png";
		thirdScore.src="img/"+scoreArray[0]+".png";
		fourthScore.src="img/"+scoreArray[1]+".png";
		}
		
	else if(momentScore.length==3){
		firstScore.src="img/0.png";
		secondScore.src="img/"+scoreArray[0]+".png";
		thirdScore.src="img/"+scoreArray[1]+".png";
		fourthScore.src="img/"+scoreArray[2]+".png";
		}	
	else {
		firstScore.src="img/"+scoreArray[0]+".png";
		secondScore.src="img/"+scoreArray[1]+".png";
		thirdScore.src="img/"+scoreArray[2]+".png";
		fourthScore.src="img/"+scoreArray[3]+".png";
		}	
	
   	}
	 	 
}


//鼠标点击按钮切换div块事件
/*$(document).ready(function(){
	$('#normal_stop').click(function(){
    $("#health_box").animate({left:'250px'},1000);
  });
});*/
function clickHelp(){
	document.getElementById('rule_back').style.display='block';
	document.getElementById('back').style.display='block';
	document.getElementById('start').style.display='none';
	document.getElementById('title').style.display='none';
	}
function clickBack(){
	document.getElementById('rule_back').style.display='none';
	document.getElementById('back').style.display='none';
	document.getElementById('start').style.display='block';
	document.getElementById('title').style.display='block';
	document.getElementById('help').style.display='block';
	}
function clickStart(){
	document.getElementById('normal_stop').style.display='block';
	document.getElementById('start').style.display='none';
	document.getElementById('title').style.display='none';
	document.getElementById('health_box').style.display='block';
	document.getElementById('sound_box').style.display='block';
	document.getElementById('score').style.display='block';
	document.getElementById('time').style.display='block';
	document.getElementById('fps').style.display='block';
	document.getElementById('first_fps').style.display='block';
	document.getElementById('second_fps').style.display='block';
	document.getElementById('help').style.display='none';
	$("#health_box").animate({left:'1165px'},1000);
	$("#sound_box").animate({left:'1165px'},1000);
	$("#score").animate({left:'125px'},1000);
	$("#time").animate({left:'125px'},1000);
	}
function clickOk(){
	document.getElementById('gameover').style.display='none';
	document.getElementById('score_name').style.display='none';
	document.getElementById('ranking_list').style.display='block';
	document.getElementById('normal_continue').style.display='none';
	getScoreInfo();
	}
function clickReplay(){
	document.getElementById('ranking_list').style.display='none';
	document.getElementById('normal_stop').style.display='block';
	document.getElementById('gameover').style.display='none';
	document.getElementById('score_name').style.display='none';
	}
function clickNContinue(){
	document.getElementById('normal_continue').style.display='none';
	document.getElementById('normal_stop').style.display='block';
	document.getElementById('stop_box').style.display='none';
	}
function clickNStop(){
	document.getElementById('normal_stop').style.display='none';
	document.getElementById('normal_continue').style.display='block';
	document.getElementById('stop_box').style.display='block';
	}
function clickContinue(){
	document.getElementById('stop_box').style.display='none';
	document.getElementById('normal_stop').style.display='block';
	}
function clickRestore(){
	document.getElementById('stop_box').style.display='none';
	document.getElementById('normal_stop').style.display='block';
	}
function clickMainnue(){
   	
	}