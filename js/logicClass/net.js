// JavaScript Document
//蜘蛛网类		
var net = function(sPoint,ePoint){
	var collider = [],
		cutpoint = [],
		cutRange,
		angle = 0,
		bcanvas=document.createElement("canvas"),
		length = Math.sqrt((sPoint.x-ePoint.x)*(sPoint.x-ePoint.x)+(sPoint.y-ePoint.y)*(sPoint.y-ePoint.y)),
		that = canvasSprite(SYS_spriteParams),

	
		/*lineSplite
		描述：根据蜘蛛网的起点与终点，计算出蜘蛛网与碰撞网格的交点并返回；
		参数：无；
		返回：Array；*/
	lineSplite = function(){
		var x,y;
		var array=[];
		var minPoint = {x:0,y:0};
		minPoint.x=sPoint.x;
		minPoint.y=sPoint.y;
		var maxPoint = {x:0,y:0};
		maxPoint.x=ePoint.x;
		maxPoint.y=ePoint.y;
			
		if(sPoint.x>ePoint.x){
			var median=minPoint.x;
			minPoint.x=maxPoint.x;
			maxPoint.x=median;	
		}
		if(sPoint.y>ePoint.y){
			var median=minPoint.y;
			minPoint.y=maxPoint.y;
			maxPoint.y=median;	
		}
		if(sPoint.x==ePoint.x&&sPoint.y!=ePoint.y){
			for(var i=Math.ceil(minPoint.y/60)*60;i<=parseInt(maxPoint.y/60)*60;i+=60){
				x=minPoint.x;
				y=i;
				array.push({x:x,y:y});
			}
		}
		else if(sPoint.x!=ePoint.x&&sPoint.y==ePoint.y){
			for(var i=Math.ceil(minPoint.x/60)*60;i<=parseInt(maxPoint.x/60)*60;i+=60){
				x=i;
				y=minPoint.y;
				array.push({x:x,y:y});
			}
		}
		else if(sPoint.x!=ePoint.x&&sPoint.y!=ePoint.y){
			for(var i=Math.ceil(minPoint.x/60)*60;i<=parseInt(maxPoint.x/60)*60;i+=60){
				x=i;
				y=((x-ePoint.x)/(sPoint.x-ePoint.x))*(sPoint.y-ePoint.y)+ePoint.y;
				array.push({x:x,y:y});
			}		
			for(var i=Math.ceil(minPoint.y/60)*60;i<=parseInt(maxPoint.y/60)*60;i+=60){
				y=i;
				x=((y-ePoint.y)/(sPoint.y-ePoint.y))*(sPoint.x-ePoint.x)+ePoint.x;
				array.push({x:x,y:y});
			}
		}
					
		return array;	
	};
	
	
	bcanvas.width = SYS_spriteParams.canvas.width;;  
	bcanvas.height = SYS_spriteParams.canvas.height;
	var context=bcanvas.getContext("2d");
	
	context.save();
	if(sPoint.y<ePoint.y||(sPoint.y==ePoint.y&&sPoint.x<ePoint.x)){
		angle = Math.asin((sPoint.x-ePoint.x)/length);
		//设置原点
		context.translate(sPoint.x, sPoint.y);
		//旋转角度
		context.rotate(angle);
	}
	else{
		angle = Math.asin((ePoint.x-sPoint.x)/length);	
		//设置原点
		context.translate(ePoint.x, ePoint.y);
		//旋转角度
		context.rotate(angle);
	}
	
	
	
	cutRange = (sPoint.x == ePoint.x) ? 1 : 0;
	if((!cutRange&&sPoint.x<=ePoint.x)||(cutRange&&sPoint.y<=ePoint.y)){
		cutpoint.push([0,0,sPoint.x,sPoint.y,length]);
		cutpoint.push([0,0,ePoint.x,ePoint.y,0]);
	}
	else if(!cutRange||cutRange){
		cutpoint.push([0,0,ePoint.x,ePoint.y,length]);
		cutpoint.push([0,0,sPoint.x,sPoint.y,0]);		
	}
		
	
	
	return that = {
		removed : false,
		/*that.hit
		描述：蜘蛛网被碰撞时调用的函数，暂时不用作处理
		参数：无；
		返回：无*/
		hit : function(insectFlag,distance){
			for(var i = 0;i<collider.length;i++)
				collider[i].checkFlag = true;
			if(insectFlag){
				//计算碰撞点与昆虫圆心的夹角
				var maxpoint = (sPoint.y < ePoint.y) ? ePoint : sPoint;
				var minpoint = (sPoint.y < ePoint.y) ? sPoint : ePoint;
				var angleB = Math.asin((minpoint.x-maxpoint.x)/length);
				var insectRadius = SYS_insects.getInsect(insectFlag).getRadius();	
				var insectPoint = SYS_insects.getInsect(insectFlag).getXY();
				var angleA = Math.acos(distance/insectRadius);
				//var temp = (insectPoint.x - maxpoint.x)/(minpoint.x -  maxpoint.x) - (insectPoint.y - maxpoint.y)/(minpoint.y -  maxpoint.y);
				var angleC;
				/*if(temp < 0){
					if(angleB < 0)						
						angleC = angleB - angleA;
						//angleC = Math.PI - angleB + angleA;
					else
						angleC = angleB - angleA;
				}
				else{
					if(angleB < 0)	
						angleC = angleB - angleA;					
						//angleC = 2*Math.PI - angleB + angleA;
					else						
						angleC = angleB - angleA;
						//angleC = Math.PI + angleB + angleA;
				}*/
				angleC = angleB - angleA;
				var crossPoint = [Math.cos(angleC)*insectRadius+insectPoint.x,Math.sin(angleC)*insectRadius+insectPoint.y];
				var cxt=SYS_spriteParams.ctx;
				cxt.fillStyle="#FF0000";
				cxt.beginPath();
				cxt.arc(crossPoint[0],crossPoint[1],5,0,Math.PI*2,true);
				cxt.closePath();
				cxt.fill();
				var flag = 2;
				if(cutRange)
					flag = 3;
				var i =1;
				for(i;i<cutpoint.length-1;++i){
					if(crossPoint[flag-2]<=cutpoint[i][flag])	
						break;
				}
				if(i<cutpoint.length){
					//计算受力
					var forceLen =Math.sqrt( (crossPoint[0] - cutpoint[i-1][2])*(crossPoint[0] - cutpoint[i-1][2])+(crossPoint[1] - cutpoint[i-1][3])*(crossPoint[1] - cutpoint[i-1][3]));
					var coutLen =cutpoint[i-1][4];	
					forceLen = (forceLen<Math.abs(coutLen - forceLen)) ? forceLen : Math.abs(coutLen - forceLen);
					//版本1
					/*var temp =  ((coutLen-300)/50)*((coutLen-300)/50)*((coutLen-300)/50);
					var banLen = (temp > 0) ? 500-200/(temp+1) : 100 - 200/(temp -1);
					var force = 1/forceLen + 1/(banLen - forceLen);
					if(force < SYS_insects.getInsect(insectFlag).getWeight()){*/
					//版本2
					var ban = 1;
					if(forceLen>500)
						ban = 0.1;
					else if(forceLen>400)
						ban = 0.15;
					else if(forceLen>300)
						ban = 0.2;
					else if(forceLen>200)
						ban = 0.25;
					else if(forceLen>100)
						ban = 0.3;
					else
						ban = 0.35;
						
					if(forceLen > coutLen*ban){
						SYS_insects.getInsect(insectFlag).setFall();
						that.remove();
						that.breakNet(i,1);
						that.breakNet(i-1,-1);
					}
				}
					
			}
		},
		
		addCut : function(point){
			var flag = 2;
			if(cutRange)
				flag = 3;
			var i =0;
			for(i;i<cutpoint.length;++i)
				if(point[flag]<=cutpoint[i][flag])	
					break;
			if(point.length<5)
				point.push(0);
			if(i>0)
				cutpoint[i-1][4] = 	Math.sqrt((cutpoint[i-1][2]-point[2])*(cutpoint[i-1][2]-point[2])+(cutpoint[i-1][3]-point[3])*(cutpoint[i-1][3]-point[3]));
			if(i<cutpoint.length)
				point[4] = 	Math.sqrt((cutpoint[i][2]-point[2])*(cutpoint[i][2]-point[2])+(cutpoint[i][3]-point[3])*(cutpoint[i][3]-point[3]));
			var frontpart = cutpoint.slice(0,i);
			var backpart = cutpoint.slice(i);
			
			frontpart.push(point);
			cutpoint = frontpart.concat(backpart);
		},		
		
		getCut : function(index){
			return cutpoint[index];
		},
		
		getCutPoint : function(point){
			for(var i=0;i<cutpoint.length;++i)
				if(cutpoint[i][2] == point[2]&&cutpoint[i][3] == point[3])
					return cutpoint[i];
		},
		
		getCutLen : function(){
			return cutpoint.length;
		},
		
		breakNet : function(index,flag){
			index = Math.floor(index);
			switch (cutpoint[index][0]){
			case 'attached':
				//如果为被依附点，则需依附点断掉
				var breaknet = SYS_nets.getNet(cutpoint[index][1]);
				if(breaknet){
					//找到依附线段上与被依附点相同的点
					var i =0;
					for(i ; i<breaknet.getCutLen();i++)
						if(cutpoint[index][2] == breaknet.getCut(i)[2]&&cutpoint[index][3] == breaknet.getCut(i)[3])	
							break;
					//如果存在依附线段上存在依附点则将依附点周围的点都断掉
					if(i<=breaknet.getCutLen()){
						breaknet.remove();
						if(i==0)
							breaknet.breakNet(i,1);
						else if(i==(breaknet.getCutLen()-1))
							breaknet.breakNet(i,-1);	
							
					}
				}
				//该线段继续断下去
				if(index+flag>=0&&index+flag<cutpoint.length)		
					that.breakNet(index+flag,flag);
				cutpoint[index][0] = 'break';
				break;
			case 'attach':
				//若为依附点，该线段继续断下去
				if(index+flag>=0&&index+flag<cutpoint.length)
					that.breakNet(index+flag,flag);
				cutpoint[index][0] = 'break';
				break;
			case 'cross':
				//若为交叉点，该点变为依附点，另一个对应的交叉点变为被依附点
				var breaknet = SYS_nets.getNet(cutpoint[index][1]);
				var i =0;
				for(i ; i<breaknet.getCutLen();i++)
					if(cutpoint[index][2] == breaknet.getCut(i)[2]&&cutpoint[index][3] == breaknet.getCut(i)[3])	
						break;
				if(i<=breaknet.getCutLen())
					breaknet.getCut(i)[0] = 'attached';				
				cutpoint[index][0] = 'attach';
				var temp = [];
				for(var i =0;i<cutpoint[index].length;++i)
					temp.push(cutpoint[index][i]);
				
				that.addCut(temp);
				if(flag==1)
					cutpoint[index][0] = 'break';
				else
					cutpoint[index+1][0] = 'break';
				break;
			default:
				if(index+flag>=0&&index+flag<cutpoint.length)
					that.breakNet(index+flag,flag);
				cutpoint[index][0] = 'break';
				break;
			}
				
		},
		
		/*that.draw
		描述：根据起点终点在画布上画出蜘蛛网；
		参数：无；
		返回：无*/
		draw : function(){
			
			
			var ctx=SYS_spriteParams.ctxbuffer;
			
			context.clearRect(-SCREEN_WIDTH, -SCREEN_HEIGHT,10*SCREEN_WIDTH,10*SCREEN_HEIGHT);
			if(!ctx){
				return;
			}
			//画蜘蛛网
			
			var totalLen = 0;
			var rang=cutpoint[0][3] > cutpoint[cutpoint.length - 1][3] ? -1 : 1;
			var i=rang==1?0:cutpoint.length-1;
			while(i>=0&&i<cutpoint.length){
				var len = cutpoint[i][4];
				context.drawImage(images['goo.png'],-8,totalLen,16,len);				
				ctx.drawImage(images['ball.png'],-12.5+cutpoint[i][2],-12.5+cutpoint[i][3],25,25);	
				totalLen += len;
				i+=rang;
			}			
			ctx.drawImage(bcanvas,0,0);		
		},
		
		/*that.getPoint
		描述：返回网的起点和终点；
		参数：无；
		返回：[
			{x，y}，
			{x，y}
		]*/
		getPoint : function(){
			return[{x:sPoint.x,y:sPoint.y},{x:ePoint.x,y:ePoint.y}];
		},
		
		/*that.remove
		描述：将直线移除，设置removed，并且将其从碰撞列表中移除；
		参数：无；
		返回：无*/
		remove : function(){
			this.removed=true;
			if(collider.length > 0){
				for(var i = 0; i<collider.length ; ++i)
					collider[i].remove();
			}
		},
		
		getLen : function(){
			return 	length;
		},
		
		setCollider : function(){
			var netpo = lineSplite();
			netpo.push(sPoint);
			netpo.push(ePoint);
			var newnetp = [];
			newnetp.pop();
			for(var j = 1; j < netpo.length ; j++){
				var temp = j;
				while(temp>0){
					
					if(netpo[temp].x==netpo[temp-1].x&&netpo[temp].y==netpo[temp-1].y){
						netpo.splice(temp,1);
						j--;
						break;	
					}
					else if(netpo[temp].x==netpo[temp-1].x&&netpo[temp].y>netpo[temp-1].y)	
						break;
					else if(netpo[temp].x>netpo[temp-1].x)
						break;
					var mid =netpo[temp-1];
					netpo[temp-1] = netpo[temp];
					netpo[temp] = mid;	
					temp--;			
				}
			}
			for(var i = 0; i < netpo.length-1; i++){
				var midx = (netpo[i].x + netpo[i+1].x)/2;
				var midy = (netpo[i].y + netpo[i+1].y)/2;
				collider.push(SYS_collisionManager.newCollider(NET,0,[{x:midx,y:midy}],this.hit));
				collider[i].update([{x:midx,y:midy}]);
				collider[i].update([{x:sPoint.x,y:sPoint.y},{x:ePoint.x,y:ePoint.y}]);
			}
		}

	};
};