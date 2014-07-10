// JavaScript Document
//蜘蛛网管理类
var netManager = function(gameCallBack){
	var netList = {},
		netListIndex = 0,
		newNets,
		newNetFlag=0,
		
		intersectNet = function(net1,net2){
			var v1 = vector2d(net2[0].x-net1[0].x,net2[0].y-net1[0].y);
			var v2 = vector2d(net1[1].x-net1[0].x,net1[1].y-net1[0].y);
			var v3 = vector2d(net2[1].x-net1[0].x,net2[1].y-net1[0].y);
			var dot1 = v1.cross(v2)*v3.cross(v2);
			v1 = vector2d(net1[0].x-net2[0].x,net1[0].y-net2[0].y);
			v2 = vector2d(net2[1].x-net2[0].x,net2[1].y-net2[0].y);
			v3 = vector2d(net1[1].x-net2[0].x,net1[1].y-net2[0].y);
			var dot2 = v1.cross(v2)*v3.cross(v2);
			if(dot1<=0&&dot2<=0)
				return true;
			return false;
		},
		
		cutNet = function(net1,net2){
			var ret=net2[0];
			var t=((net2[0].x-net1[0].x)*(net1[0].y-net1[1].y)-(net2[0].y-net1[0].y)*(net1[0].x-net1[1].x))/((net2[0].x-net2[1].x)*(net1[0].y-net1[1].y)-(net2[0].y-net2[1].y)*(net1[0].x-net1[1].x));
			ret.x=Math.round((ret.x+(net2[1].x-net2[0].x)*t)*100)/100;
			ret.y=Math.round((ret.y+(net2[1].y-net2[0].y)*t)*100)/100;
			return ret;
		}
		
		that = {
			setFlag : function(){
				newNetFlag=1;			
			},
			/*that.move
			描述：将netList中的所有net都draw一遍，并将标记了removed的网移除，并且检测是否新的蜘蛛网已经完成，完成则将其添加到netList中，并将newNet置空；
			参数：无；
			返回：无；*/
			move : function(){	
				//检测是否有新网生成
				if(newNetFlag){
					for(var idx in netList){
						
						var cutpoint = cutNet(netList[idx].getPoint(),that.newNets.getPoint());
						//两条线段的边界点（排以大小顺序）
						var minx = that.newNets.getPoint()[1].x-1,
							maxx = that.newNets.getPoint()[0].x+1,
							miny = that.newNets.getPoint()[1].y-1,
							maxy = that.newNets.getPoint()[0].y+1,
							minx2 = netList[idx].getPoint()[1].x-1,
							maxx2 = netList[idx].getPoint()[0].x+1,
							miny2 = netList[idx].getPoint()[1].y-1,
							maxy2 = netList[idx].getPoint()[0].y+1;
						if(that.newNets.getPoint()[0].x<that.newNets.getPoint()[1].x)
						{
							minx = that.newNets.getPoint()[0].x-1;
							maxx = that.newNets.getPoint()[1].x+1;
						}
						if(that.newNets.getPoint()[0].y<that.newNets.getPoint()[1].y)
						{
							miny = that.newNets.getPoint()[0].y-1;
							maxy = that.newNets.getPoint()[1].y+1;
						}
						if(netList[idx].getPoint()[0].x<netList[idx].getPoint()[1].x)
						{
							minx2 = netList[idx].getPoint()[0].x-1;
							maxx2 = netList[idx].getPoint()[1].x+1;
						}
						if(netList[idx].getPoint()[0].y<netList[idx].getPoint()[1].y)
						{
							miny2 = netList[idx].getPoint()[0].y-1;
							maxy2 = netList[idx].getPoint()[1].y+1;
						}
						//判断交点是不是在两线段内
						if(cutpoint.x>=minx&&cutpoint.x<=maxx&&cutpoint.y>=miny&&cutpoint.y<=maxy&&cutpoint.x>=minx2&&cutpoint.x<=maxx2&&cutpoint.y>=miny2&&cutpoint.y<=maxy2){
							var flag = 'cross';
							var pflag = 'cross';
							//判断交点是交叉点还是依附点
							if((that.newNets.getPoint())[0].x == cutpoint.x && (that.newNets.getPoint())[0].y == cutpoint.y || 
							(that.newNets.getPoint())[1].x == cutpoint.x && (that.newNets.getPoint())[1].y == cutpoint.y){
								pflag = 'attach';
								flag = 'attached';
								//若为依附点，则依附点为起点或者终点
								netList[idx].addCut([flag,netListIndex,cutpoint.x,cutpoint.y]);
								var pcut = that.newNets.getCutPoint([pflag,idx,cutpoint.x,cutpoint.y]);
								pcut[0]=pflag;
								pcut[1]=idx;

							}
							else{
								netList[idx].addCut([flag,netListIndex,cutpoint.x,cutpoint.y]);
								that.newNets.addCut([pflag,idx,cutpoint.x,cutpoint.y]);
							}
						}
					}
					(that.newNets).setCollider();
					netList[netListIndex] = that.newNets;
					var health = Math.floor(that.newNets.getLen()/SYS_difficulty.net_reduce);
					gameCallBack({message:"netCreated",health:health});
					netListIndex++;	
					that.newNets=null;
					newNetFlag=0;
					if($("#netbreak")){
						$("#netbreak").append('<div style="width:220px;float:left;margin-top:10px" id="'+(netListIndex-1)+'" name="'+(netListIndex-1)+'" ></div>');
						$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="0" onclick="breakPoint(this)" >0</button>');
						$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="1" onclick="breakPoint(this)" >1</button>');
						$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="2" onclick="breakPoint(this)">2</button>');
						$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="3" onclick="breakPoint(this)">3</button>');
						$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="4" onclick="breakPoint(this)">4</button>');
						$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="5" onclick="breakPoint(this)">5</button>');
					}
				}
				for(var idx in netList){
					netList[idx].draw();
					//检测是否有网被移除
					if(netList[idx].removed){
						var temppoint = [],	//暂时存中间点
							tempstart, 		//暂时存起点
							flag = 0;
						for(var i=0;i<netList[idx].getCutLen();i++){
							//不是移除的点就加入中间点
							if(netList[idx].getCut(i)[0] != 'break'){
								
								if(netList[idx].getCut(i)[0] != 0 && that.getNet(netList[idx].getCut(i)[1]))
									that.getNet(netList[idx].getCut(i)[1]).getCutPoint(netList[idx].getCut(i))[1] = netListIndex;
								if(!flag)
									tempstart = netList[idx].getCut(i);
								else
									temppoint.push(netList[idx].getCut(i));
								flag = 1;
							}
							//是移除点根据flag来判断是否需要新生成点
							else if(flag){
								flag = 0;
								if(temppoint.length>0){
									var cutnet = net({x:tempstart[2],y:tempstart[3]},{x:temppoint[temppoint.length-1][2],y:temppoint[temppoint.length-1][3]});
									cutnet.getCutPoint(tempstart)[0] = tempstart[0];
									cutnet.getCutPoint(tempstart)[1] = tempstart[1];
									cutnet.getCutPoint(temppoint[temppoint.length-1])[0] = temppoint[temppoint.length-1][0];
									cutnet.getCutPoint(temppoint[temppoint.length-1])[1] = temppoint[temppoint.length-1][1];
									for(var j=0;j<temppoint.length-1;++j)
										cutnet.addCut(temppoint[j]);
									netList[netListIndex] = cutnet;
									netListIndex++;	
									temppoint = [];
									if($("#netbreak")){
										$("#netbreak").append('<div style="width:220px;float:left;margin-top:10px" id="'+(netListIndex-1)+'" name="'+(netListIndex-1)+'" ></div>');
										$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="0" onclick="breakPoint(this)" >0</button>');
										$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="1" onclick="breakPoint(this)" >1</button>');
										$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="2" onclick="breakPoint(this)">2</button>');
										$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="3" onclick="breakPoint(this)">3</button>');
										$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="4" onclick="breakPoint(this)">4</button>');
										$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="5" onclick="breakPoint(this)">5</button>');
									}
								}
							}
						}
						//当最后一个点不是移除点的情况
						if(flag){
							flag = 0;
							if(temppoint.length>0){
								var cutnet = net({x:tempstart[2],y:tempstart[3]},{x:temppoint[temppoint.length-1][2],y:temppoint[temppoint.length-1][3]});
								cutnet.getCutPoint(tempstart)[0] = tempstart[0];
								cutnet.getCutPoint(tempstart)[1] = tempstart[1];
								cutnet.getCutPoint(temppoint[temppoint.length-1])[0] = temppoint[temppoint.length-1][0];
								cutnet.getCutPoint(temppoint[temppoint.length-1])[1] = temppoint[temppoint.length-1][1];
								for(var j=0;j<temppoint.length-1;++j)
									cutnet.addCut(temppoint[j]);
								netList[netListIndex] = cutnet;
								netListIndex++;	
								if($("#netbreak")){
									$("#netbreak").append('<div style="width:220px;float:left;margin-top:10px" id="'+(netListIndex-1)+'" name="'+(netListIndex-1)+'" ></div>');
									$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="0" onclick="breakPoint(this)" >0</button>');
									$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="1" onclick="breakPoint(this)" >1</button>');
									$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="2" onclick="breakPoint(this)">2</button>');
									$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="3" onclick="breakPoint(this)">3</button>');
									$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="4" onclick="breakPoint(this)">4</button>');
									$("#"+(netListIndex-1)).append('<button style="width:100px;height:20px;float:left" value="5" onclick="breakPoint(this)">5</button>');
								}
							}
						}
						
						
						delete netList[idx];
						if($("#"+idx)){
							$("#"+idx).remove();
						}
					}	
								
				}	
			},
			
			/*that.newNet
			描述：新生成蜘蛛网，并将其赋值给newNet；
			参数：Object（sPoint{x，y}）,Object（ePoint{x，y}）
			返回：无；*/
			newNet : function(sPoint,ePoint){
				that.newNets = net(sPoint,ePoint);
				return that.newNets;	
			},
			
			/*that.onNet
			描述：判断一个点是否在蜘蛛网上，遍历所有netList中的网（初步方案）；
			参数：Object（point{x，y}）；
			返回：bool；*/
			onNet : function(point,bpoint){
				for(var idx in netList){
					//判断前一个点和线段距离
					var npoint = netList[idx].getPoint();
						netVector = vector2d(npoint[1].x-npoint[0].x,npoint[1].y-npoint[0].y);
					var	normalVector = netVector.normalize();
						normalVector.rotate(Math.PI/2);
					var	fontVector = vector2d(point.x-npoint[0].x,point.y-npoint[0].y),
						distance = normalVector.dot(fontVector),
						backVector = vector2d(point.x-npoint[1].x,point.y-npoint[1].y);
						
					//后一个点和线段距离
					var	bfontVector,
						bdistance,
						bbackVector;
					if(bpoint){
						bfontVector = vector2d(bpoint.x-npoint[0].x,bpoint.y-npoint[0].y);
						bdistance = normalVector.dot(bfontVector);
						bbackVector = vector2d(bpoint.x-npoint[1].x,bpoint.y-npoint[1].y);
					}
					
					
					if(distance<=5&&distance>=-5&&(!bpoint||!(bdistance<=5&&bdistance>=-5&&bfontVector.dot(netVector)*bbackVector.dot(netVector)<=0))){
						if(fontVector.dot(netVector)*backVector.dot(netVector)<=0){
							if(distance!=0 && bpoint)
								point = cutNet([point,bpoint],npoint);
							return point;
						}
					}					
				}
				return 0;
			},
			
			getNet : function(flag){
				if(netList[flag])
					return netList[flag];
				return
			}
			
		};
	return that;
};