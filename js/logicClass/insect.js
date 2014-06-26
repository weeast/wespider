// JavaScript Document
//昆虫类
var insect = function(x,y,incColliderFlag,kind,moveVec,gameCallBack){
	var x = x,
		y = y,
		z = 1000,
		fz = 1,
		weight = 0.04,
		radius = (kind.frame)/2,
		that = canvasSprite(SYS_spriteParams),
		collider,
		
		moveVector = moveVec;
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
		var temp = z;
		if(SYS_timeInfo.coeff <= (200/3))
			z-=15*SYS_timeInfo.coeff;
		else 
			z-=1000;
		if(z/1000 <= fz){
			fz = Math.floor(z/1000);
			moveVector.rotate(Math.random()*Math.PI*2);	
		}
		
			
		that.changeImage("bug.gif");
		if(that.catchFlag)
		{   
			that.changeImage("bug.png");	
		}
		that.draw(x,y);
		if(collider){
			collider.update([{x:x,y:y}]);
		}
		
	};                                                                                                             
	
	that.insertCollider = function(colliderFlag,collideeFlags){
		//将collider根据参数初始化，并且添加到碰撞检测列表中
		collider=SYS_collisionManager.newCollider(colliderFlag,collideeFlags,[{x:x,y:y}],that.hit,collision);
		collider.update([{x:x,y:y}]);
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