// JavaScript Document
//昆虫管理类
var insectsManager = function(gameCallBack){
	var insectKinds = [
		{point:10,health:13,frame:54},
		{point:5,health:18,frame:54},
		{point:3,health:25,frame:54}
		],
		newInsectList = {},
		flagIndex = 4,
		catchedInsectList = {};
		
	return that = {
			
			/*
		函数名：move
		描述：分别对newInsectList和catchedInsectList中的昆虫调用他们的move，并且检查newInsect的z轴，若为0则将其添加到碰撞列表，若小于0将其移除，以及newInsect的catchedFlag,若为1则添加到catchedInsectList，添加到碰撞列表,若标记为removed则将其从list中删除并解除settimeout；
		参数：无；
		返回：无；*/
		move : function(){
			var idx;
			for(idx in catchedInsectList){
				if(!catchedInsectList[idx].removed)
					catchedInsectList[idx].move();
				if(catchedInsectList[idx].getZ()<=-15000){
					catchedInsectList[idx].remove();
					delete catchedInsectList[idx];	
				}
				
			};
			
			for(idx in newInsectList){
				newInsectList[idx].move();
				if(newInsectList[idx].catchFlag){
					catchedInsectList[newInsectList[idx].colliderFlag] = newInsectList[newInsectList[idx].colliderFlag];
					delete newInsectList[newInsectList[idx].colliderFlag];					
				}
				else if(newInsectList[idx].getZ()<=-15000){
					newInsectList[idx].remove();
					delete newInsectList[idx];
				}
				else if(newInsectList[idx].getZ()<=0)
					if(!newInsectList[idx].getCollider())
						newInsectList[idx].insertCollider(newInsectList[idx].colliderFlag,NET);	
			};
					
		},
		
		/*
		函数名：newInsect
		描述：产生一个昆虫，并 加入newInsectList；
		参数：number；
		返回：无；*/
		newInsect : function(kindNum){
			var vec = vector2d(1,1).normalize();
			vec.rotate(Math.random()*(Math.PI)*2);
			var myinc = insect(
							Math.floor((Math.random()*SCREEN_WIDTH)),
							Math.floor((Math.random()*SCREEN_HEIGHT)),
							flagIndex,
							insectKinds[kindNum],
							vec,
							gameCallBack
						);
			newInsectList[flagIndex] = myinc;
			flagIndex *= 2;
		},
		
		onInsect : function(x,y){
			for(var idx in catchedInsectList){
				var ra = catchedInsectList[idx].getRadius(),
					ix = catchedInsectList[idx].getXY().x,
					iy = catchedInsectList[idx].getXY().y;
				if((x-ix)*(x-ix)+(y-iy)*(y-iy) <= ra*ra)
					return  idx;
			}
			return 0;
		},
		
		getInsect : function(flag){
			if(newInsectList[flag])
				return newInsectList[flag];
			if(catchedInsectList[flag])
				return catchedInsectList[flag];
			else
				return
		}

	};
};