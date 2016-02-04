davis=
{
random:function (x)
	{
		return (Math.floor(Math.random()*x));
	},

bell: function (x)
	{
		var i=Math.round((davis.random(x)+davis.random(x)+davis.random(x))/3);
		return i;
	},

randomColor:function (x)
	{

	if (x){	x=x.toLowerCase();}
	else{x=="none"}

	var red=davis.random(255);
	var green=davis.random(255);
	var blue=davis.random(255);
	var color="rgb("+red+","+green+","+blue+")";

	if (x=="grey" || x=="gray"){
		var color="rgb("+red+","+red+","+red+")";
		}

	if (x=="mammal" || x=="mammalian"){
		red=160+davis.random(85);
		green=red-40;
		blue=green/2;
		color="rgb("+red+","+green+","+blue+")";
		}
	if (x=="full"){
		var text="#eee";
		if ((red+green+blue)>400){text="#111";}
		return {red:red,green:green,blue:blue,rgb:color,text:text};
		}
	else if (x=="fullgrey"){
		var text="#eee";
		if ((red*3)>400){text="#111";}
		color="rgb("+red+","+red+","+red+")";
		return {red:red,green:red,blue:red,rgb:color,text:text};
		}
	else{
		return color;
		}	
	},

randomWord:function(x){
	if (!x){x=1;}
	var vo=["a","e","i","o","u"];
	var con=["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"];
	var phrase=[];
	for (var j=0;j<x;j++){
		var word="";
		for (var i=0;i<(1+davis.random(3));i++){
			word+=davis.pick(con)+davis.pick(vo);
			}	
		if (davis.random(5)>2){
			word+=davis.pick(con);
			}
		phrase.push(word);
	}
	word=phrase.join(" ");
	return word;
},
	
pick: function (x)
	{
	//console.log(x);
	return x[davis.random(x.length)];
	},

sumTo:function(x){
	if (!x){return false;}
	var y=[];
	while (x>0){
		var redux=1+davis.random(x);
		y.push(redux);
		x=x-redux;
	}
	return y;
	},

//this takes two arrays - one the source of new material, the other saved material from the past, and decides which to return an element from, then selects a random element from the ancestral or mutational array.
darwin:function(mutation,ancestry)
	{
	var anar=ancestry.length;
	var m=(9*anar*anar)/((anar*anar)+100);
	var d=1+this.random(10);
	if (m>d){ return this.pick(ancestry);}
	else{ return this.pick(mutation);}
	}
};

geo={};

geo.getPoint=function(x,y,r,theta){
	theta+=90;
	theta=theta*(Math.PI/180);
	var x2=x+(r*Math.sin(theta));
	var y2=y+(r*Math.cos(theta));
	var circle={x1:x,y1:y,r:r,x2:x2,y2:y2};
	return circle;
	};

geo.arcPath=function(x,y,r,theta1,theta2,w){
	var f1=0;
	var f2=0;
	var f3=0;
	var f4=1;
	if ((theta2-theta1)>180){
		f1=1;
		f3=1;
		}
	
	var arcPath="";
	arcPath+="M "+geo.getPoint(x,y,r,theta1).x2+" "+geo.getPoint(x,y,r,theta1).y2;
	arcPath+=" A "+r+" "+r+" "+(theta2-theta1)+" "+f1+" "+f2+" "+geo.getPoint(x,y,r,theta2).x2+" "+geo.getPoint(x,y,r,theta2).y2;
	arcPath+=" L "+geo.getPoint(x,y,(r-w),theta2).x2+" "+geo.getPoint(x,y,(r-w),theta2).y2;
	arcPath+=" A "+(r-w)+" "+(r-w)+" "+(theta2-theta1)+" "+f3+" "+f4+" "+geo.getPoint(x,y,(r-w),theta1).x2+" "+geo.getPoint(x,y,(r-w),theta1).y2;
	arcPath+=" Z";
	return arcPath;
	};

geo.ngon=function(x,y,r,n){
	if (!n){n=3};
	var path="";
	path+="M "+geo.getPoint(x,y,r,0).x2+" "+geo.getPoint(x,y,r,0).y2;
	for (var i=0;i<n;i++){
		var interval=360/n;
		var theta=interval*i;
		path+=" L"+geo.getPoint(x,y,r,theta).x2+" "+geo.getPoint(x,y,r,theta).y2;
		}	
	path+="Z";
	var ngon=model.paper.path(path).attr({"stroke":"#fff"});
	return ngon;
	};

geo.orbital=function(x,y,r,n,color){
	if (!x){x=model.bounds.right/2;}
	if (!y){y=model.bounds.bottom/2;}
	if (!r){r=model.bounds.bottom/3;}
	if (!n){n=1;}
	if (!color){color="#FFF";}
	var set=[];
	
	for (var i=0;i<n;i++){
		var theta1=_.random(180);
		var theta2=theta1+(18*_.random(1,20));
		var w=(0.1*r)*_.random(1,3);
	
		var arcPath=geo.arcPath(x,y,r,theta1,theta2,w);
		var circle=model.paper.path(arcPath)
			.attr({"fill":color,"fill-opacity":0.5})
		set.push(circle);
		}
	return set;
	};

