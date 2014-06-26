// JavaScript Document
//蜘蛛类
var spider = function(gameCallback){
	var health =  100,
		x = SCREEN_WIDTH/2,
		y = SCREEN_HEIGHT/2,
		spiderRadius = 20,
		speed = 5,
		collider,
		state = {
			Moving:[0,{x:0,y:0}],				//为1则表示正在移动，xy表示移动位置
			Neting:[0,[{x:0,y:0},{x:0,y:0}]],	//为1则表示正在织网或者正在赶去织网， 
			Eating:[0,{x:0,y:0},0],				//为1则表示正在赶去吃虫子， 
			Static:0 							//为1则表示正静止
		},
		that = canvasSprite(SYS_spriteParams),
		moveVector = vector2d(0,0),
		netFlag=0;
		/*
		函数名：collision：
		描述：蜘蛛的碰撞检测函数，主要检测与昆虫的碰撞。
		参数：insect；
		返回：bool；*/
		var collision =  function(insect){
			var insects = SYS_insects.getInsect(insect.colliderFlag),
				point = insects.getXY(),
				insectRadius = insects.getRadius(),
				vector = vector2d(x - point.x,y - point.y);
				distance = vector.length();
				
				if(distance <= insectRadius+spiderRadius){
					return true;
				}
				return false;
		};
		
		function replaceFunc(stateStr,n){	
				//moveVector = vector2d(state[stateStr][n].x - x,state[stateStr][n].y - y).normalize();
				hx = x - state[stateStr][n].x;
				hy = y - state[stateStr][n].y;				
				fx = x + moveVector.vx * SYS_timeInfo.coeff * speed - state[stateStr][n].x;
				fy = y + moveVector.vy * SYS_timeInfo.coeff * speed - state[stateStr][n].y;
				
				if(hx*fx < 0){							
					x = state[stateStr][n].x;
					y = state[stateStr][n].y;
					state.Neting = [0,[{x:0,y:0},{x:0,y:0}]];
					state.Moving = [0,{x:0,y:0}];
					state.Eating = [0,{x:0,y:0},0];			
					state.Static = 1;
				}
				else{
					if(hx*fx == 0)
						if(hy*fy < 0){
							x = state[stateStr][n].x;
							y = state[stateStr][n].y;
							state.Neting = [0,[{x:0,y:0},{x:0,y:0}]];
							state.Moving = [0,{x:0,y:0}];
							state.Eating = [0,{x:0,y:0},0];			
							state.Static = 1;
						}
					x += moveVector.vx * SYS_timeInfo.coeff * speed;
					y += moveVector.vy * SYS_timeInfo.coeff * speed;
					moveVector = vector2d(state[stateStr][n].x - x,state[stateStr][n].y - y).normalize();
				}
				
		};
		
		/*
		函数名：hit：
		描述：蜘蛛检测到和昆虫碰撞之后的回调函数，加血加分等，要调用gameCallback；
		参数：insects;
		返回：无*/
		that.hit =  function(insect){
			if(collider)
				collider.remove();
			collider = 	SYS_collisionManager.newCollider(SPIDER,0,{x:x,y:y},that.hit,collision);
		},
		
		/*
		函数名：that.move：
		描述：根据playerControl类判断玩家的操作，并对玩家的操作的合法性进行检查，即移动是否超出边界、织网的起点和终点是否在网和树枝上等等（若是捕食，则将蜘蛛的碰撞对象添加到SYS_collisionManager中），并根据蜘蛛之前的状态对蜘蛛进行不同操作，辅以SYS_timeInfo（控制游戏的帧数）、moveVector（蜘蛛移动的x和y方向上的距离）改变蜘蛛位置和蜘蛛状态，由SYS_processor进行统一调用。
		参数：无
		返回：无*/
		that.move = function(){
			if(playerControl.singleClick[0]){
				state.Moving = [1,{x:playerControl.singleClick[1].x,y:playerControl.singleClick[1].y}];
				state.Eating = [0,{x:0,y:0},0];
				state.Neting = [0,[{x:0,y:0},{x:0,y:0}]];
				state.Static = 0;
				netFlag=0;
				playerControl.singleClick[0]=0;
			}
			else if(playerControl.doubleClick[0]){
				state.Moving = [0,{x:0,y:0}];
				state.Eating = [1,{x:playerControl.doubleClick[1].x,y:playerControl.doubleClick[1].y},playerControl.doubleClick[2]];
				state.Neting = [0,[{x:0,y:0},{x:0,y:0}]];
				state.Static = 0;
				netFlag=0;
				playerControl.doubleClick[0]=0;
			}
			else if(playerControl.drag[0]){
				var a = (SYS_nets.onNet({x:playerControl.drag[1].x,y:playerControl.drag[1].y},{x:playerControl.drag[2].x,y:playerControl.drag[2].y}));
				var b = (SYS_trees.onTree({x:playerControl.drag[1].x,y:playerControl.drag[1].y}));
				var c = (SYS_nets.onNet({x:playerControl.drag[2].x,y:playerControl.drag[2].y},{x:playerControl.drag[1].x,y:playerControl.drag[1].y}) );
				var d = (SYS_trees.onTree({x:playerControl.drag[2].x,y:playerControl.drag[2].y}));
				if((a||b)&&(c||d)){
					state.Neting = [1,
					{x:playerControl.drag[1].x,y:playerControl.drag[1].y},
					{x:playerControl.drag[2].x,y:playerControl.drag[2].y}];
					if(a)
						state.Neting[1] = a;
					if(c)
						state.Neting[2] = c;
					state.Moving = [0,{x:0,y:0}];
					state.Eating = [0,{x:0,y:0},0];
					state.Static = 0;
					netFlag=0;
					playerControl.drag[0]=0;
					SYS_nets.newNet(state.Neting[1],state.Neting[2]);
				}
				else{
					state.Moving = [0,{x:0,y:0}];
					state.Eating = [0,{x:0,y:0},0];
					state.Neting = [0,[{x:0,y:0},{x:0,y:0}]];
					state.Static = 1;
					netFlag=0;
					playerControl.drag[0]=0;	
				}
			}
			
			
			if(state.Moving[0]){
				moveVector = vector2d(state.Moving[1].x - x,state.Moving[1].y - y).normalize();
				replaceFunc('Moving',1);
				that.changeImage("spider.png");
				that.draw(x,y);
				if(collider.collideeFlags){
					collider.remove();
					collider = 	SYS_collisionManager.newCollider(SPIDER,0,{x:x,y:y},that.hit,collision);
				}
				collider.update([{x:x,y:y}]);
				

			}
			
			else if(state.Eating[0]){
				moveVector = vector2d(state.Eating[1].x - x,state.Eating[1].y - y).normalize();
				replaceFunc('Eating',1);
				that.changeImage("spider.png");
				that.draw(x,y);
				if(collider.collideeFlags!=state.Eating[2])
					collider = SYS_collisionManager.newCollider(SPIDER,state.Eating[2],{x:x,y:y},that.hit,collision);
				collider.update([{x:x,y:y}]);
			}
				
			else if(state.Neting[0]){
				if(netFlag==0){
					hx = x - state.Neting[1].x;
					hy = y - state.Neting[1].y;				
					fx = x + moveVector.vx * SYS_timeInfo.coeff * speed - state.Neting[1].x;
					fy = y + moveVector.vy * SYS_timeInfo.coeff * speed - state.Neting[1].y;
					
					if(hx*fx < 0){							
						x = state.Neting[1].x;
						y = state.Neting[1].y;
						netFlag=1;
						moveVector = vector2d(state.Neting[2].x - state.Neting[1].x,
						state.Neting[2].y - state.Neting[1].y).normalize();
					}
					else{
						if(hx*fx == 0)
							if(hy*fy < 0){
								x = state.Neting[1].x;
								y = state.Neting[1].y;
								netFlag=1;
								moveVector = vector2d(state.Neting[2].x - state.Neting[1].x,
								state.Neting[2].y - state.Neting[1].y).normalize();
							}
						x += moveVector.vx * SYS_timeInfo.coeff * speed;
						y += moveVector.vy * SYS_timeInfo.coeff * speed;
						moveVector = vector2d(state.Neting[1].x - x,state.Neting[1].y - y).normalize();
						that.changeImage("spider.png");
						that.draw(x,y);
					}
				
				}
				if(netFlag){
				hx = x - state.Neting[2].x;
				hy = y - state.Neting[2].y;				
				fx = x + moveVector.vx * SYS_timeInfo.coeff * speed - state.Neting[2].x;
				fy = y + moveVector.vy * SYS_timeInfo.coeff * speed - state.Neting[2].y;
				
				if(hx*fx < 0){							
					x = state.Neting[2].x;
					y = state.Neting[2].y;
					SYS_nets.setFlag();
					netFlag=0;
					state.Neting = [0,[{x:0,y:0},{x:0,y:0}]];
					state.Moving = [0,{x:0,y:0}];
					state.Eating = [0,{x:0,y:0},0];			
					state.Static = 1;
					
					
				}
				else{
					if(hx*fx == 0)
						if(hy*fy < 0){
							x = state.Neting[2].x;
							y = state.Neting[2].y;
							netFlag=0;
							state.Neting = [0,[{x:0,y:0},{x:0,y:0}]];
							state.Moving = [0,{x:0,y:0}];
							state.Eating = [0,{x:0,y:0},0];			
							state.Static = 1;
						}
					x += moveVector.vx * SYS_timeInfo.coeff * speed;
					y += moveVector.vy * SYS_timeInfo.coeff * speed;
					moveVector = vector2d(state.Neting[2].x - state.Neting[1].x,
						state.Neting[2].y - state.Neting[1].y).normalize();
				}			
				that.changeImage("spider.png");
				that.draw(x,y);
				if(collider.collideeFlags){
					collider.remove();
					collider = 	SYS_collisionManager.newCollider(SPIDER,0,{x:x,y:y},that.hit,collision);
				}
				collider.update([{x:x,y:y}]);
			}
		}
		else{
			if(collider.collideeFlags){
				collider.remove();
				collider = 	SYS_collisionManager.newCollider(SPIDER,0,{x:x,y:y},that.hit,collision);
			}
			//collider.update([{x:x,y:y}]);
			that.changeImage("spider.png");
			that.draw(x,y);	
		}
	};
	return {
		
		/*
		函数名：init：
		描述：初始化蜘蛛，包括改变蜘蛛canvasSprite对象实例的图片，画出蜘蛛，将蜘蛛的canvasSprite对象添加到SYS_processor中；
		参数：无
		返回：无*/
		init : function(){
			that.changeImage("spider.png");
			that.draw(x,y);
			SYS_processor.add(that);
			collider = 	SYS_collisionManager.newCollider(SPIDER,0,{x:x,y:y},that.hit,collision);
			collider.update([{x:x,y:y}]);
		},
		
		/*
		函数名：destory：
		描述：销毁蜘蛛，将蜘蛛从SYS_collisionManager和SYS_processor删除；
		参数：无
		返回：无；*/
		destory : function(){
			if(collider){
				collider.remove();
			}	
			this.removed=true;
		},
		
		

		/*
		函数名：getHealth：
		描述：获取蜘蛛当前血量；
		参数：无；
		返回：health；*/
		getHealth : function(){
			return health;
		},
		
		/*addHealth：
		描述：增加蜘蛛血量，并检查参数是否在合法范围（总血量不能超过100，若大于一百就保持在100），返回增加后的蜘蛛血量；
		参数：number;
		返回：health；*/
		addHealth : function(num){
			health+=num;
			if(health>100){
				health=100;
			}
			return health;
		},
		
		/*reduceHealth：
		描述：减少蜘蛛血量，并检查参数是否在合法范围（总血量不能少于0，若小于0就保持在0，并调用gameCallback函数向游戏返回血量为0的信息），返回减少后的蜘蛛血量；
		参数：number；
		返回：health;*/
		reduceHealth : function(num){
			health-=num;
			if(health<=0){
			health=0;
			gameCallBack({message:"dead"});
			}
			return health;
		},
		
		/*getXY:
		描述：返回蜘蛛的位置；
		参数：无；
		返回：{x,y}；*/
		getXY : function(){
			return{x:x,y:y};
		}

	};
};