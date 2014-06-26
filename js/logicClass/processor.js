// JavaScript Document
//游戏主处理进程类
var processor = function(){
	var processList = [];//存放并处理所有游戏对象的列表
	var addedItem = [];//上一次调用后新增加的游戏对象列表
	
	return {
		
		/*
		函数名：add
		描述：向addedItem中添加新增加的游戏对象，在下一次调用时添加至processList中，添加的游戏对象应为canvasSprite类型；
		参数：canvasSprite
		返回：无*/
		add : function(process){
			addedItem.push(process);
		},
		
		/*
		函数名：process	
		描述：控制所有游戏对象进行移动，并通过游戏对象的removed 标记控制游戏对象的删除，通过addedItem控制游戏对象的增加；
		参数：无；
		返回：无*/
		process : function(){
			var newProcessList = [],
				len = processList.length;
			
			SYS_spriteParams.ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);//清空画布
			SYS_spriteParams.ctxbuffer.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);//清空画布
			for ( var i = 0;i < len; i++){
				if(!processList[i].removed){
					processList[i].move();
					newProcessList.push(processList[i]);
				}
			}
			SYS_spriteParams.ctx.drawImage(SYS_spriteParams.canvasbuffer, 0, 0);
			processList = newProcessList.concat(addedItem);//将排除了被移除的游戏对象列表和新增加的游戏对象列表进行合并，重新赋值给游戏对象列表，以达到对游戏对象移除和添加的功能
			addedItem = [];
		}

	};
};