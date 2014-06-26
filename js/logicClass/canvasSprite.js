// JavaScript Document

//画布元素对象
var canvasSprite = function(params){
	//所有画布上的对象的基础类，包括画布对象的位移、渲染和动画。
	var ctxbuffer = params.ctxbuffer,
		width = params.width,
		height = params.height,
		imagesWidth = params.imagesWidth,
		vOffeset = 0,
		hOffest = 0,
		hide = false,
		img;
		
		
	return {
		draw : function(x,y){
			if(hide){
				return;	
			}
			if(img)
				ctxbuffer.drawImage(img,hOffest,vOffeset,width,height,x - width/2 >> 0,y - height/2 >> 0,width,height);
			
		},
		
		changeImage : function(image){
			//src = params.images + image;
			img  = images[image];
		},
		
		show : function(){
			hide = false;	
		},
		
		hide : function(){
			hide = true;
		},
		
		destroy : function(){
			return;	
		}
	};	
};