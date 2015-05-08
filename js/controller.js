controller={
init:function(){
	if (!model.stock){
		model.stock={};
		model.stock.colors=[];
		model.stock.greys=[];
		model.stock.widths=[];
		model.stock.borderRadii=[];
		model.stock.borderSpacings=[];
		model.stock.borderWidths=[];
		model.stock.frames=[];
		model.stock.content=[];
	}
	this.styles();
	this.cssClasses();
	this.content();

},

content:function(){
	model.content=[];
	var x=1;
	var d="";
	
	x=_.random(0,12);
	for (var i=0;i<x;i++){
	d="";
		d+="<h1 class='text-center'>"+davis.pick(model.interests).toUpperCase()+"</h1>";
		if (davis.random(10)>3){d+="<p class='text-center'>"+davis.randomWord(12)+"</p>";}
	model.content.push(d);
	}

	
	x=_.random(0,3);
	for (var j=0;j<x;j++){
		d="";
		d+="<h2 class='text-center'>"+davis.randomWord()+"</h3>";
		var divClass=davis.pick(model.cssClasses).name;
		console.log(divClass);
			for (var i=0;i<(2+davis.random(10));i++){
				d+="<div class='text-center link "+divClass+"' >"+davis.pick(model.interests)+"</div>";
			}
	model.content.push(d);

	}
	
	x=_.random(0,3);
	for (var j=0;j<x;j++){
		d="";
		d+="<h2 class='text-center'>"+davis.random(100)+"%</h2>";
		for (var i=0;i<_.random(1);i++){
			d+="<p class='text-center'>"+davis.randomWord(10+davis.random(8))+"</p>";
		}
	model.content.push(d);

	}

	x=_.random(0,3);
	for (var j=0;j<x;j++){
		d="";
		d+="<h2 class='text-center'>"+davis.random(1000)+" "+davis.pick(model.interests)+"</h2>";
	model.content.push(d);

	}

	x=_.random(0,3);
	for (var j=0;j<x;j++){
		d="";
		d+="<h3 class='text-center'>"+davis.pick(model.interests)+"</h3>";
		for (var i=0;i<davis.random(4);i++){
			d+="<p>"+davis.randomWord(10+davis.random(80))+"</p>";
		}
	model.content.push(d);

	}

	x=_.random(0,6);
	for (var j=0;j<x;j++){
		d="";
		d+="<h3 class='text-center'>";
		var links=[];
			for (var i=0;i<(1+davis.random(7));i++){
				links.push(davis.pick(model.interests));
			}
		d+=links.join(" | ");
		d+="</h3>";
	model.content.push(d);

	}

	x=_.random(0,2);
	for (var i=0;i<x;i++){
		d="";
		_(davis.bell(6)).times(function(){d+="<img src='"+davis.pick(model.icons)+"' >";});
	model.content.push(d);

	}

	x=_.random(0,6);
	for (var i=0;i<x;i++){
	model.content.push("");

	}
	model.content=davis.darwin([_.shuffle(model.content)],model.stock.content);
},

cssClasses:function(){
	var classes=[];
	for (var i=0;i<5;i++){
		var color=davis.pick(model.colors);
		var name=davis.randomWord()+davis.random(999);
		var d=style("."+name,{
			"background-color":color.rgb,
			"color":color.text
			});
		classes.push({"name":name,"style":d});
	}
	model.cssClasses=classes;
	//console.log(model.cssClasses);
},

styles:function(){
	model.width=davis.darwin([(70+davis.random(30)),100],model.stock.widths);
	model.borderRadius=davis.darwin([davis.random(40),0],model.stock.borderRadii);
	model.borderSpacing=davis.darwin([(davis.random(60))],model.stock.borderSpacings);
	model.borderWidth=davis.darwin([(davis.random(20)),0],model.stock.borderWidths);


	model.grey=davis.darwin([davis.randomColor("fullgrey")],model.stock.greys);
	model.colors=[];
	model.colors.push(davis.darwin([davis.randomColor("full")],model.stock.colors));
	model.colors.push(davis.darwin([davis.randomColor("full")],model.stock.colors));
	model.colors.push(davis.darwin([davis.randomColor("fullgrey")],model.stock.greys));
	model.colors.push(model.grey);
	model.bgColor=davis.pick([model.grey,davis.pick(model.colors)]);


	model.frame=[];

	for (var i=0;i<4;i++){
		var frame=davis.sumTo(4);
		for (var j=0;j<frame.length;j++){frame[j]*=3;}
		model.frame.push(frame);
	}

	model.frame=davis.darwin([model.frame],model.stock.frames);

},



love:function(locus,value){
	model.stock[locus] = model.stock[locus] || [];
	model.stock[locus].push(value);
	return true;
},

initBounds:function(x){
	if (x=="div"){
		model.bounds={};
		model.bounds.bottom=$("div#paper").height();
		model.bounds.right=$("div#paper").width();
		model.bounds.top=0;
		model.bounds.left=0;
	}
	else{
	model.bounds={
		bottom:$(document).height(),
		right:$(document).width(),
		top:0,
		left:0
		}
	}
	model.bounds.centerX=model.bounds.right/2;
	model.bounds.centerY=model.bounds.bottom/2;
	},

initPaper:function(x){
	model.paper=Raphael("x");
	},
};