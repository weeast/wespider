// JavaScript Document
//向量类
var vector2d = function(x,y){
	var vec = {
		vx : x,
		vy : y,
		
		negate : function(){
			//反向量,返回： vector
			var v2x = -vec.vx;
			var v2y = -vec.vy;
			return vector2d(v2x,v2y);
		},
		
		length : function(){
			//求向量长度,返回：number；
			return Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
		},
		
		normalize : function(){
			//该向量的单位向量	,返回：vector；
			var len =  Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
			var v2x = 0;
			var v2y = 0;
			if(len){
				v2x = vec.vx/len;
				v2y = vec.vy/len;	
			}
			return vector2d(v2x,v2y);
		},
		
		dot : function(vec2){
			//该向量的点积；返回：number	
			return vec.vx*vec2.vx + vec.vy*vec2.vy;
		},
		
		cross : function(vec2){
			//叉乘
			return vec.vx*vec2.vy-vec.vy*vec2.vx;
		},
		
		add : function(vec2){
			return vector2d(vec.vx + vec2.vx,vec.vy + vec2.vy);
		},
		
		rotate : function(angle){
			//旋转向量
			var vx = vec.vx,
				vy = vec.vy,
				cosVal = Math.cos(angle),
				sinVal = Math.sin(angle);
			vec.vx = vx * cosVal - vy * sinVal;
			vec.vy = vx * sinVal + vy * cosVal;
		}
		
	}
	
	return vec;
};