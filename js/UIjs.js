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
	
//显示血量和声音长度
function setHealth(health){
	var healthBox = document.getElementById("health");
	healthBox.height=14;
	if(health>=0&&health<=100){
		healthBox.width=326*(health/100);
		}
	}
function setSound(sound){
	var soundBox=document.getElementById("sound");
	soundBox.height=14;
	if(sound>=0&&sound<=100){
	soundBox.width=326*(sound/100);
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
