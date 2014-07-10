// JavaScript Document
//树枝类 

var tree = function(){
	var treeMap = [
			[{x:6,y:50},{x:150,y:85}],
			[{x:110,y:104},{x:150,y:85}],
			[{x:110,y:104},{x:111,y:124}],
			[{x:63,y:128},{x:111,y:124}],
			[{x:63,y:128},{x:6,y:120}],
			[{x:231,y:127},{x:150,y:85}],
			[{x:231,y:127},{x:243,y:136}],
			[{x:231,y:127},{x:232,y:127}],
			[{x:281,y:52},{x:232,y:127}],
			[{x:281,y:52},{x:231,y:79}],
			[{x:281,y:52},{x:329,y:35}],
			[{x:363,y:15},{x:329,y:35}],
			[{x:581,y:112},{x:329,y:35}],
			[{x:581,y:132},{x:329,y:55}],
			[{x:581,y:122},{x:611,y:130}],
			[{x:581,y:122},{x:715,y:60}],
			[{x:845,y:141},{x:715,y:60}],
			[{x:845,y:121},{x:715,y:40}],
			[{x:845,y:161},{x:715,y:80}],
			[{x:845,y:141},{x:956,y:150}],
			[{x:845,y:121},{x:956,y:130}],
			[{x:845,y:161},{x:956,y:170}],
			[{x:9,y:510},{x:151,y:561}],
			[{x:9,y:530},{x:151,y:581}],
			[{x:9,y:550},{x:151,y:601}],
			[{x:368,y:485},{x:151,y:561}],
			[{x:358,y:505},{x:151,y:581}],
			[{x:350,y:525},{x:151,y:601}],
			[{x:348,y:490},{x:572,y:557}],
			[{x:338,y:510},{x:590,y:569}],
			[{x:672,y:548},{x:572,y:557}],
			[{x:690,y:561},{x:590,y:569}],
			[{x:672,y:548},{x:622,y:505}],
			[{x:690,y:561},{x:622,y:505}],
			[{x:554,y:501},{x:622,y:505}],
			[{x:641,y:507},{x:622,y:505}],
			[{x:672,y:548},{x:753,y:531}],
			[{x:690,y:561},{x:746,y:545}],
			[{x:905,y:413},{x:753,y:531}],
			[{x:905,y:433},{x:746,y:545}],
			[{x:905,y:413},{x:847,y:573}],
			[{x:905,y:433},{x:847,y:573}],
			[{x:905,y:413},{x:950,y:379}],
			[{x:905,y:433},{x:950,y:401}]
			/*[{x:6,y:100},{x:150,y:170}],
			[{x:110,y:208},{x:150,y:170}],
			[{x:110,y:208},{x:111,y:248}],
			[{x:63,y:256},{x:111,y:248}],
			[{x:63,y:256},{x:6,y:240}],
			[{x:231,y:254},{x:150,y:170}],
			[{x:231,y:254},{x:243,y:272}],
			[{x:231,y:254},{x:232,y:254}],
			[{x:281,y:104},{x:232,y:254}],
			[{x:281,y:104},{x:231,y:158}],
			[{x:281,y:104},{x:329,y:70}],
			[{x:363,y:30},{x:329,y:70}],
			[{x:581,y:224},{x:329,y:70}],
			[{x:581,y:264},{x:329,y:110}],
			[{x:581,y:244},{x:611,y:260}],
			[{x:581,y:244},{x:715,y:120}],
			[{x:845,y:282},{x:715,y:120}],
			[{x:845,y:242},{x:715,y:80}],
			[{x:845,y:322},{x:715,y:160}],
			[{x:845,y:282},{x:956,y:300}],
			[{x:845,y:242},{x:956,y:260}],
			[{x:845,y:322},{x:956,y:340}],
			[{x:9,y:1020},{x:151,y:1122}],
			[{x:9,y:1060},{x:151,y:1162}],
			[{x:9,y:1060},{x:151,y:1202}],
			[{x:368,y:970},{x:151,y:1122}],
			[{x:358,y:1010},{x:151,y:1162}],
			[{x:350,y:1050},{x:151,y:1202}],
			[{x:348,y:980},{x:572,y:1114}],
			[{x:338,y:1020},{x:590,y:1138}],
			[{x:672,y:1096},{x:572,y:1114}],
			[{x:690,y:1122},{x:590,y:1138}],
			[{x:672,y:1096},{x:622,y:1010}],
			[{x:690,y:1122},{x:622,y:1010}],
			[{x:554,y:1002},{x:622,y:1010}],
			[{x:641,y:1014},{x:622,y:1010}],
			[{x:672,y:1096},{x:753,y:1062}],
			[{x:690,y:1122},{x:746,y:1090}],
			[{x:905,y:826},{x:753,y:1062}],
			[{x:905,y:866},{x:746,y:1090}],
			[{x:905,y:826},{x:847,y:1146}],
			[{x:905,y:866},{x:847,y:1146}],
			[{x:905,y:826},{x:950,y:758}],
			[{x:905,y:866},{x:950,y:802}]*/
		],
		uphalf = canvasSprite(SYS_spriteParams),
		downhalf = canvasSprite(SYS_spriteParams);
		
		uphalf.move = function(){
			var ctx=SYS_spriteParams.ctxbuffer;
			ctx.drawImage(images['treeUp.png'],0,0);
		};
		downhalf.move = function(){
			var ctx=SYS_spriteParams.ctxbuffer;
			ctx.drawImage(images['treeDown.png'],0,320);
		}
	return {
		getUpHalf : function(){
			return uphalf;
		},
		
		getDownHalf : function(){
			return downhalf;
		},
		
		/*init:
		描述：画出并初始化树枝；
		参数：treeKind；
		返回：无；*/
		init : function(treeKind){		
			/*var img = new Image();
			img.src = "img/tree.png";
			
			SYS_spriteParams.ctx.drawImage(img,0,0);
			preImage("img/tree.png",function(){  
				SYS_spriteParams.ctx.drawImage(this,0,0);  
			}); 
			for(var i = 0;i<treeMap.length;++i){
				var canvas=document.getElementById("main_canvas");
				var ctx=canvas.getContext("2d");
				if(!ctx){
					return;
				}
				ctx.beginPath();
				ctx.moveTo(treeMap[i][0].x,treeMap[i][0].y);
				ctx.lineTo(treeMap[i][1].x,treeMap[i][1].y);
				ctx.strokeStyle = "white"; 
				ctx.lineWidth=20; 
				ctx.stroke();	
			}*/
		},
		
		/*onTree
		描述：判断一个点是否在树枝上；
		参数：Object（point{x，y}）；
		返回：无；*/
		onTree : function(point){
			for(var i = 0;i<treeMap.length;++i){
				var npoint = [{x:treeMap[i][0].x,y:treeMap[i][0].y},{x:treeMap[i][1].x,y:treeMap[i][1].y}];
				var	netVector = vector2d(npoint[1].x-npoint[0].x,npoint[1].y-npoint[0].y);
				var	normalVector = netVector.normalize();
				normalVector.rotate(Math.PI/2);
				var	fontVector = vector2d(point.x-npoint[0].x,point.y-npoint[0].y);
				var	distance = normalVector.dot(fontVector);
				var	backVector = vector2d(point.x-npoint[1].x,point.y-npoint[1].y);
				
				if(-10<=distance&&distance<=10){
					if(fontVector.dot(netVector)*backVector.dot(netVector)<=0){
						return true;
					}
				}					
			}
			return false;
		}
		
	};
};