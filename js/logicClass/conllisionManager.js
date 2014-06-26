// JavaScript Document
//碰撞检测类
var conllisionManager = function(){
	var gridWidth = 16;
	var gridHeight = 11;
	var listIndex = 0;
	var grid = [];
	var checkListIndex = 0;
	var checkList = {};
	
	for (var i = 0; i < gridWidth * gridHeight ; i++){
		grid.push({});
	}
	/*
	函数名：getGridList
	描述：通过接受画布上的x、y坐标来返回网格；
	参数：number，number（x，y）；
	返回：Object（grid）；*/
	var getGridList = function(x,y){
		var idx = (Math.floor(y/60) * gridWidth) + Math.floor(x/60);//网格的默认宽和高都为60
		if( grid[idx] === undefined ){
			return;
		}
		return grid[idx];
	}

	return{
		/*
		函数名：newCollider
		描述：由需要和 其他对象发生碰撞的游戏对象调用，生成一个碰撞对象；
		参数：number（colliderFlag主动碰撞标签），number（collideeFlags被动碰撞标签），Array（position的{x，y}），Function（callback回调函数）；
		返回：Object（colliderObj）;*/
		newCollider : function(colliderFlag,collideeFlags,position,callback,collisionFuc){
			var list = {},
				indexStr = '' + listIndex++,
				checkIndex;
			var colliderObj = {
				colliderFlag : colliderFlag,
				collideeFlags : collideeFlags,
				checkFlag : false,//避免碰撞检测的时候重复检测同一对象的标签
				position : position,
				/*
				函数名：update
				描述：碰撞对象改变位置后，调用该函数进行更新碰撞对象在网格中的位置，以及碰撞对象刚生成时在网格中的位置（需要判断该对象是蜘蛛网或者其他）；
				参数：无；
				返回：无*/
				update : function(position){
					if(position.length ==1){
						this.position = position;
						for(var idx in list){//先将碰撞对象从原来的位置删除
							delete list[indexStr];
						}
						
						list = getGridList(this.position[0].x,this.position[0].y);
						list[indexStr] = this;
					}
					else{
						for(var i = 0; i <position.length ; ++i)
							(this.position).push(position[i]);
					}
					
				},
				
				/*
				函数名：remove
				描述：将碰撞对象从网格中移除，如果有collideeFlag标签为1，则还需从碰撞列表中移除；
				参数：无；
				返回：无；*/
				remove : function(){
					if(collideeFlags !=0 ){
						delete checkList[checkIndex];	
					}
					for(var idx in list){
						delete list[indexStr];
					}
				},
				
				/*
				函数名：callback
				描述：碰撞对象发生碰撞时调用的函数；
				参数：无；
				返回：无；*/
				callback : function(obj,ag){
					callback(obj,ag);
				},
				
				collision : function(obj){
					return collisionFuc(obj);	
				},
				
				/*
				函数名：checkCollisions
				描述：碰撞对象扫描与偏离中心offsetX和offsetY距离网格内的碰撞对象是否发生碰撞；
				参数：number（offsetX），number（offsetY）；
				返回：bool；*/
				checkCollisions : function(offsetX,offsetY){
					
					var list = getGridList(this.position[0].x + offsetX,this.position[0].y+offsetY);
					if(!list){
						return false;	
					}
					var idx , collideeObj;
					for(idx in list){
						if(list.hasOwnProperty(idx) && idx !== indexStr && (this.collideeFlags & list[idx].colliderFlag && (!list[idx].checkFlag))){
							//若为自己 或者不是需要碰撞的对象 或者以检测的碰撞对象都不继续检测
							collideeObj = list[idx];
							collideeObj.checkFlag = true;
							var temp = this.collision(collideeObj);
							if(!temp){//调用 碰撞对象自己的碰撞算法检测是否发生了碰撞
								if(collideeObj.colliderFlag == NET)
									collideeObj.callback();
								continue;
							}
							if(collideeObj.colliderFlag == NET)
								collideeObj.callback(this.colliderFlag,temp);
							else
								collideeObj.callback(this.colliderFlag);
							colliderObj.callback(collideeObj.colliderFlag);
							return true;
						}
					}
					
					return false;
				}
	
			};
			if(collideeFlags){
				checkIndex = '' + checkListIndex++;
				checkList[checkIndex] = colliderObj;
			}
			return colliderObj;
		},
		
		/*
		函数名：checkCollisions
		描述：调用checkList中碰撞对象自己的checkCollisions函数来检测碰撞；
		参数：无；
		返回：无；*/
		checkCollisions : function(){
			var idx, colliderObj;
			for( idx in checkList){
				if(checkList.hasOwnProperty(idx)){//先把所有的碰撞对象的 碰撞标记重置
					colliderObj = checkList[idx];
					for(var i = 0;i < grid.length; ++i){
						for(var index in grid[i]){
							grid[i][index].checkFlag = false;
						}
					}
					for (var y = -60; y <= 60; y += 60){
						for(var x = -60; x <= 60; x += 60){
							if(	colliderObj.checkCollisions(x,y)){
								break;	
							}
						}
					}
				}
			}
		}
		
	};
};