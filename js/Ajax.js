// JavaScript Document
var request = false;
try {
	request = new XMLHttpRequest();
}catch(trymicrosoft){
	try{	
	request = new ActiveXObject("Msxml2.XMLHTTP");
	}catch(othermicrosoft){
	try{
		request = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(failed){
		request = false;	
		}
	}
}

if(!request){
alert("Error initializing XMLHttpRequest!");	
}

function getScoreInfo(){
	var score = document.getElementById("final_score").getAttribute("value");
	var name = document.getElementById('name').value;
	var url = "/SpiderScore/servlet/up_score";
	$.post(url,{'username':name,'score':score},function(data){
		var returndata = eval("(" + data + ")");
var i =0;
var j=100;
		$.each(returndata.score,function(index,entry){
			if(i<6){
				i++;
				j+=10;
				$("#ranking_list").append('<div id="ranking'+i+'" style="position:relative;width:600px; height:50px; left:140px; top:'+j+'px"><span class="span_list" >第'+i+'名</span><span class="span_list" >'+entry.username+'</span><span class="span_list" >'+entry.score+'分</span></div>');
			}
			
		});
$("#ranking_list").append('<div id="ranking'+6+'" style="position:relative;width:600px; height:50px; left:140px; top:170px"><span class="span_list" >你的分数：</span><span class="span_list" >'+score+'分</span></div>');
	});
}

function updatePage(){
	var i=1;
	var j=110;
	if(request.readyState == 4){
		if(request.status == 200 ||request.status == 0){
			var returndata = eval("(" + request.responseText + ")");
			$.each(returndata.score,function(index,entry){
				ShowList(entry.username,entry.score);
				$("#ranking_list").append('<div id="ranking'+i+';style="position:relative;width:600px; height:50px; border:#FFF solid thin; left:100px; top:'+(j+10)+'px"><span>第'+i+'名</span><span>'+entry.username+'</span><span>'+entry.score+'</span></div>');
				i++;
			});
		}
	}
	else if (request.status == 404)
         alert("Request URL does not exist");
       else
         alert("Error: status code is " + request.status);
		 
}