// JavaScript Document
//玩家操作类

var playerControl = function(){
	//识别玩家的操作，并将其保存在变量controlInfo中
	var dargup = 1,
	 	drag = 0,
		down=0,
		up=0,
		downCoor,
		upCoor,
		eventFunc,
		eventFunc1,
		netdrag;

	//鼠标拖动产生蜘蛛网动画
	function newDragNet(sPoint,ePoint){
		var that = canvasSprite(SYS_spriteParams);
		that.update = function(x,y){
			ePoint.x = x;
			ePoint.y = y;	
		};
		that.move = function(){
			that.draw();
		};
		that.draw = function(){
			var a = 0;
			//起点坐标与终点坐标的距离distance
			var distance = Math.sqrt((sPoint.x-ePoint.x)*(sPoint.x-ePoint.x)+(sPoint.y-ePoint.y)*(sPoint.y-ePoint.y));
			distance=(distance==0)?1:distance;
			//被旋转的画布
			var	bcanvas=document.createElement("canvas");
			bcanvas.width = SYS_spriteParams.canvas.width;;  
    		bcanvas.height = SYS_spriteParams.canvas.height;
			var width = 32;
			var height = distance;		
			var context=bcanvas.getContext("2d");
			//游戏的缓冲画布
			var ctx=SYS_spriteParams.ctxbuffer;
			
			if(!ctx){
				return;
			}	
			//计算旋转角度：起点坐标与终点坐标连线方向相对于竖直方向的偏移角度
			if(sPoint.y<=ePoint.y){
				a = Math.asin((sPoint.x-ePoint.x)/(distance));	
			}
			else
				a = Math.PI-Math.asin((sPoint.x-ePoint.x)/(distance));
		
			context.save();
			//设置原点
			context.translate(sPoint.x, sPoint.y);
			//旋转角度
			context.rotate(a);
			context.drawImage(images['pull.png'],-8,0,16,height);
			context.drawImage(images['ball.png'],-12.5,-12.5,25,25);
			//将旋转的画布画入缓冲画布		
			ctx.drawImage(bcanvas,0,0);
		};
		that.remove = function(){
			that.removed = true;
		}
		SYS_processor.add(that);
		return that;
	}
	
	function mouseDown(e){
		down=1;
		downCoor=mouseCoor();
	}

	function mouseUp(e){	
		up=1;
		upCoor=mouseCoor();
		//判断鼠标拖动织网事件	
		if(down&&up&&(Math.abs(downCoor.x-upCoor.x)>10||Math.abs(downCoor.y-upCoor.y)>10)){
			controlInfo.drag = [1,{x:downCoor.x,y:downCoor.y},{x:upCoor.x,y:upCoor.y}];
		}
		//判断鼠标单击移动和捕食事件
		else if(down&&up&&(downCoor.x==upCoor.x)&&(downCoor.y==upCoor.y)){
			var flag = SYS_insects.onInsect(downCoor.x,downCoor.y);
			if(flag)	
				controlInfo.doubleClick = [1,{x:downCoor.x,y:downCoor.y},flag];
			else 
				controlInfo.singleClick = [1,{x:downCoor.x,y:downCoor.y}];
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
   //当前鼠标位置 
    function mouseCoor(e){
		var e=window.event||e;    
        var top,left,oDiv;    
        oDiv=document.getElementById("background");    
        top=getY(oDiv);    
        left=getX(oDiv);    
        return {x:(e.clientX-left+document.body.scrollLeft),y:(e.clientY-top+document.body.scrollTop)};        
    }  
	

	function doubleClick(e){
		var e=window.event||e;
		var xCoor=e.clientX;
		var yCoor=e.clientY;
		return {x:xCoor,y:yCoor};
	}
	//鼠标开始拖动按压鼠标事件	
	function dragstart(e){
		var a = mouseCoor(e);
		if(SYS_trees.onTree(a)||SYS_nets.onNet(a)){
		$("#main_canvas").on('mousemove',eventFunc = function(e) {
        	dragover(e);
		});
		$("#main_canvas").on('mouseup',eventFunc1 = function(e) {
        	mouseup(e);
		});
		return {x:a.x,y:a.y};
		}
		else return;
	} 
	//鼠标拖动时事件
	function dragover(e){
		var a = mouseCoor(e);
		netdrag.update(a.x,a.y);
		return {x:a.x,y:a.y};
		
	}
	//鼠标拖动中松开鼠标事件
	function mouseup(){
		$("#main_canvas").off('mousemove',eventFunc);
		$("#main_canvas").off('mouseup',eventFunc1);
		netdrag.remove();
	}
	
	var controlInfo = {
		singleClick:[0,{x:0,y:0}],
		doubleClick:[0,{x:0,y:0},0],
		drag:[0,{x:0,y:0},{x:0,y:0}]			
	}
	
	$(document).ready(function(e) {
    	$("#main_canvas").on('mousedown',function(e) {
        	mouseDown(e);
		});
		$("#main_canvas").on('mouseup',function(e) {
			mouseUp(e);
		});
		$("#main_canvas").on('dblclick',function(e) {
			mouseUp(e);
		});
		$("#main_canvas").on('dragstart',function(e) {
			var sPoint = dragstart(e);
			netdrag = newDragNet(sPoint,{x:sPoint.x,y:sPoint.y});
			
		});
	});
	
	return controlInfo;
}();