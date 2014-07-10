// JavaScript Document
//昆虫管理类
var insectsManager = function(gameCallBack){
	var insectKinds = [
		{point:10,health:13,frame:54},
		{point:5,health:18,frame:54},
		{point:3,health:25,frame:54}
		],
		newInsectList = {},
		flagIndex = [],
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
				else if(catchedInsectList[idx].getZ()<=-1500){
					catchedInsectList[idx].remove();
					var temp = Math.floor(Math.log(idx)/Math.log(2))-2;
					flagIndex[temp] = 0;
					delete catchedInsectList[idx];	
				}
				else{
					var temp = Math.floor(Math.log(idx)/Math.log(2))-2;
					flagIndex[temp] = 0;
					delete catchedInsectList[idx];	
				}
			};
			
			for(idx in newInsectList){
				newInsectList[idx].move();
				if(newInsectList[idx].removed){
					var temp = Math.floor(Math.log(idx)/Math.log(2))-2;
					flagIndex[temp] = 0;
					delete newInsectList[idx];
				}
				else if(newInsectList[idx].catchFlag){
					catchedInsectList[newInsectList[idx].colliderFlag] = newInsectList[newInsectList[idx].colliderFlag];
					delete newInsectList[newInsectList[idx].colliderFlag];					
				}
				else if(newInsectList[idx].getZ()<=-800)
					newInsectList[idx].setFall();
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
			var vec = vector2d(0.3,0.3);
			vec.rotate(Math.random()*(Math.PI)*2);
			var i = 0;
			for(i;i<flagIndex.length;i++){
				if(!flagIndex[i])
					break;
			}
			if(!(i<flagIndex.length))
				flagIndex.push(1);
			else
				flagIndex[i] = 1;
			var myinc = insect(
							Math.floor((10+Math.random()*(SCREEN_WIDTH-20))),
							Math.floor((170+Math.random()*230)),
							Math.pow(2,i+2),
							insectKinds[kindNum],
							vec,
							gameCallBack
						);
			newInsectList[Math.pow(2,i+2)] = myinc;
			
			
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