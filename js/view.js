$(document).ready(function() {
	controller.init();
	view.init();
	hark.init();
});

view = {};

view.init = function() {
	var d = "";
	d += "<table width='" + model.width + "%' class='container' style='table-layout:fixed;'>";
	d += "</table>";

	$("body").html(d);

	var selector = 0;
	while (selector < model.content.length) {
		var frame = davis.pick(model.frame);
		var row = view.row(frame, selector);
		$("table.container").append(row);
		selector += frame.length;
	}

	$(document).ready(function() {
		view.posthoc();
	});
};

view.row = function(colspans, model_content_index) {

	if (!colspans) {
		var colspans = davis.pick(model.frame);
	}
	var d = "";
	d += "<tr>";
	for (var i = 0; i < colspans.length; i++) {
		if (model_content_index < model.content.length) {
			d += "<td  class='" + davis.pick(model.cssClasses).name + "' colspan='" + colspans[i] + "'>" + model.content[model_content_index] + "</td>";
			model_content_index++;
		}
		else {
			d += "<td  class='" + davis.pick(model.cssClasses).name + "' colspan='" + colspans[i] + "'>" + view.content() + "</td>";
		}
	}
	d += "</tr>";
	return d;
};

view.style = function() {
	var color = davis.pick(model.colors);
	var style = "style='";
	style += "background-color:" + color.rgb + ";";
	style += "color:" + color.text + ";";
	style += "'";
	return style;
};

view.content = function() {
	var content = [];
	var d = "";
	d += "<h1 class='text-center'>" + davis.pick(model.interests).toUpperCase() + "</h1>";
	if (davis.random(10) > 3) {
		d += "<p class='text-center'>" + davis.randomWord(12) + "</p>";
	}
	content.push(d);
	d = "";
	d += "<h2 class='text-center'>" + davis.randomWord() + "</h3>";
	var divColor = davis.pick(model.colors);
	for (var i = 0; i < (2 + davis.random(10)); i++) {
		d += "<div class='text-center' style='background-color:" + divColor.rgb + ";color:" + divColor.text + ";'>" + davis.pick(model.interests) + "</div>";
	}
	content.push(d);
	d = "";
	d += "<h3 class='text-center'>" + davis.pick(model.interests) + "</h3>";
	for (var i = 0; i < davis.random(4); i++) {
		d += "<p>" + davis.randomWord(10 + davis.random(80)) + "</p>";
	}
	content.push(d);
	d = "";
	d += "<h3 class='text-center'>";
	var links = [];
	for (var i = 0; i < (1 + davis.random(7)); i++) {
		links.push(davis.pick(model.interests));
	}
	d += links.join(" | ");
	d += "</h3>";
	content.push(d);
	d = "";
	for (var i=0;i<model.icons.length;i++){
		var icon = model.icons[i];
		d += "<a href='"+icon.url+"'><img src='" + icon.image + "' ></a>";
	}
	content.push(d);
	content.push("");
	content.push("");

	return davis.pick(content);
};

view.posthoc = function() {
	//var css=function(){};

	$("style").html(" ");
	var color = model.bgColor;
	var d = "";

	d += style("body", {
		"font-size": (0.1 * _.random(8, 1.2)) + "em",
		"margin": "0px",
		"padding": "0px",
		"width": "100%",
		"height": "100%",
		"text-align": "center",
		"background": model.bgColor.rgb
	});

	d += style("h1,h2,h3,h4", {
		"text-align": "center",
		"margin": "10px"
	});

	d += style(".text-center", {
		"text-align": "center"
	});

	d += style("p", {
		"padding": "10px",
		"text-align": "left",
	});

	d += style("a",{
		"text-decoration":"none",
		"color":"#fff"
	});

	d += style("td", {
		"border": model.borderWidth + "px solid " + model.bgColor.text,
		"margin": "0px",
		"padding": (2 + davis.random(18)),
		"border-radius": model.borderRadius + "px",
		"text-align": "center"
	});
	d += style("div", {
		"border": davis.random(5) + "px solid #000",
		"padding": (2 + davis.random(18)),
		"border-radius": model.borderRadius + "px",
		"text-align": "center",
		"margin": "2px 20px 20px 20px",
	});


	var color = davis.pick(model.colors);
	d += style("div.link:hover", {
		"background-color": color.rgb,
		"border-color": color.text,
		"color": color.text,
		"cursor": "pointer"
	});

	d += style("table", {
		"border-spacing": model.borderSpacing + "px",
		"margin": "0px auto 0px auto",
		"table-layout": "fixed",
		"min-height": "99%",
		"padding": "0px"
	});

	for (var i = 0; i < model.cssClasses.length; i++) {
		d += model.cssClasses[i].style;
		//console.log(model.cssClasses[i].style);
	}


	$("style").append(d);

	$("td:has(h1)").css({
		"vertical-align": "middle"
	});

	$("td:empty").each(function() {

			if ($(this).height() > 150) {
				var img = davis.pick(model.images128);
				$(this).css({
					"background": "url(" + img.image + ") no-repeat " + "center" + "",
					"border":"0px"
				});
				$(this).click(function(){
					window.location = img.url;
				});
			}

			if ($(this).height() > 256 && $(this).width() > 256) {
				var img=davis.pick(model.images256);
				$(this).css({
					"background": "url(" + img.image + ") no-repeat center",
					"border":"0px"
				});
				$(this).click(function(){
					window.location = img.url;
				});
			}
	});
};


var style = function(tag, contents) {
	var d = "";
	d += tag + "{";
	for (var prop in contents) {
		d += prop + ":" + contents[prop] + ";";
	}
	d += "}";
	return d;
};