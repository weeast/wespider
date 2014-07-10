// JavaScript Document
//昆虫类
var insect = function(x,y,incColliderFlag,kind,moveVec,gameCallBack){
	var x = x,
		y = y,
		z = 1000,
		ry = 0,
		fz = 10,
		weight = 0.04,
		radius = (kind.frame)/2,
		that = canvasSprite(SYS_spriteParams),
		scanvas =document.createElement("canvas"), 
		fcanvas = document.createElement("canvas"),  		
		collider,
		fallflag = 0,
		moveVector = moveVec;
		
		scanvas.width = SYS_spriteParams.canvas.width;;  
		scanvas.height = SYS_spriteParams.canvas.height;
		fcanvas.width = SYS_spriteParams.canvas.width;;  
		fcanvas.height = SYS_spriteParams.canvas.height;
		var shadowctx =scanvas.getContext("2d");
		var fallctx =fcanvas.getContext("2d");
		that.catchFlag = 0;	
		that.colliderFlag = incColliderFlag;

		
	var collision = function(net){
		//昆虫检测碰撞的函数，检测与蜘蛛网的碰撞，返回bool
		var point = net.position,
			netVector = vector2d(point[2].x-point[1].x,point[2].y-point[1].y),
			normalVector = netVector.normalize();
			normalVector.rotate(Math.PI/2);
		var	fontVector = vector2d(x-point[1].x,y-point[1].y),
			distance = normalVector.dot(fontVector),
			backVector = vector2d(x-point[2].x,y-point[2].y);
			
		if(distance<=radius&&distance>=-radius){
			if(fontVector.dot(netVector)*backVector.dot(netVector)<=0){
				return distance;
			}
		}
		return false;
	
	};
	
	that.getRadius=function(){
		//返回昆虫的半径
		return radius;
		};
		
	that.getXY = function(){
		//返回昆虫的xy
		return {x:x,y:y};
	};
	
	that.getZ = function(){
		//返回昆虫的z值
		return z;
	};
	
	that.remove = function(){
		//将昆虫从SYS_processor，和碰撞列表中移除，并且播放动画；
		this.removed=true;
		if(collider){
			collider.remove();
		}
		
	};
	
	that.move = function(){
		//根据昆虫的移动向量来改变昆虫的位置，之后改变昆虫的移动向量，并减小z，使其做圆周运动，改变昆虫的图片，在昆虫的位置上画出昆虫
		var ctx=SYS_spriteParams.ctxbuffer;
		if(!that.catchFlag){
			x+=moveVector.vx*SYS_timeInfo.coeff;
			y+=moveVector.vy*SYS_timeInfo.coeff;
			if(x<0+radius)
				x = 0+radius;
			if(x>960-radius)
				x = 960-radius;
			if(y<0+radius)
				y = 0+radius;
			if(y>640-radius)
				y = 640-radius;
		}
		
		
		if(!fallflag){
			//每一帧z减小1
			z-=2;
			//每100帧改变一次方向
			if(z/100 <= fz){
				fz = Math.floor(z/100);
				moveVector.rotate(Math.random()*Math.PI*2);	
			}
			
			//当距离目标点近的时候，保证不再向上移动，以避免虫子向上飞
			if(y-ry<30)
				moveVector = vector2d(0,0);
			
			if(z>=1)
				ry += ((y-ry)/z)*SYS_timeInfo.coeff;
			else
				ry = y;
			
			
			shadowctx.clearRect(0,0, scanvas.width, scanvas.height); 
			if(z>0){
				//画出影子
				
				shadowctx.save();
				//选择a、b中的较大者作为arc方法的半径参数
				
				shadowctx.scale(1, 1/2); //进行缩放（均匀压缩）
				shadowctx.globalAlpha= 0.4;
				shadowctx.fillStyle ="#000";
				shadowctx.beginPath();
				//从椭圆的左端点开始逆时针绘制
				shadowctx.moveTo((x + radius-z/50) , y *2);
				shadowctx.arc(x , y *2, radius-z/50, 0, 2 * Math.PI);
				shadowctx.closePath();
				shadowctx.fill(); 
				shadowctx.stroke();
				shadowctx.restore();
			}
			ctx.drawImage(scanvas,0,0);
					
			
		}
		else{
			ry+=(640-ry)/50*SYS_timeInfo.coeff;
			/*if(ry >= 640- radius)
				that.remove();
			fallctx.clearRect(0,0, 10*fcanvas.width, 10*fcanvas.height); 
			fallctx.save();
			fallctx.scale(1/2+((640-ry)/(640-y))/2, 1/2+((640-ry)/(640-y))/2);
			fallctx.drawImage(images['bug.gif'],(x - 54/2)/(1/2+((640-ry)/(640-y))/2) >> 0,(ry - 54/2)/(1/2+((640-ry)/(640-y))/2) >> 0);
			ctx.drawImage(fcanvas,0,0);*/		

			
		}
		that.changeImage("bug.gif");
		if(that.catchFlag)
		{   
			that.changeImage("bug.png");	
		}		
		that.draw(x,ry);
		if(ry>640-radius)
			that.remove();
		
		if(collider){
			collider.update([{x:x,y:y}]);
		}
		
	};                                                                                                             
	
	that.insertCollider = function(colliderFlag,collideeFlags){
		//将collider根据参数初始化，并且添加到碰撞检测列表中
		collider=SYS_collisionManager.newCollider(colliderFlag,collideeFlags,[{x:x,y:y}],that.hit,collision);
		collider.update([{x:x,y:y}]);
	};
	
	that.setFall = function(){
		fallflag = 1;
	};
	
	that.hit = function(Obj){
		//昆虫被碰撞之后调用的函数，需要根据碰撞对象的类型进行判断，如果是蜘蛛，则向游戏返回昆虫被吃的信息，并且调用that.remove()将昆虫移除，如果是蜘蛛网，则将catchFlag置为1，并将昆虫从碰撞列表中删除
		if(Obj==NET){
			that.catchFlag=1;
			collider.remove();
		}
		if(Obj==SPIDER){
			that.remove();
			gameCallBack({message:"insectEated",point:kind.point,health:kind.health});
		}
		
	};
	
	that.getCollider = function(){
		return collider;
	};
	
	that.getWeight = function(){
		return weight;
	}
	
	return that;
}