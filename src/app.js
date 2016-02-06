var style = require('./style.js');
var model = require('./model.js');

var controller = {};

controller.init = function() {
  if (!model.stock) {
    model.stock = {};
    model.stock.colors = [];
    model.stock.greys = [];
    model.stock.widths = [];
    model.stock.borderRadii = [];
    model.stock.borderSpacings = [];
    model.stock.borderWidths = [];
    model.stock.frames = [];
    model.stock.content = [];
  }
  this.styles();
  this.cssClasses();
  this.content();

};

controller.content = function() {
  model.content = [];
  var x = 1;
  var d = "";

  x = _.random(0, 12);
  for (var i = 0; i < x; i++) {
    d = "";
    d += "<h1 class='text-center'>" + davis.pick(model.interests).toUpperCase() + "</h1>";
    if (davis.random(10) > 3) {
      d += "<p class='text-center'>" + davis.randomWord(12) + "</p>";
    }
    model.content.push(d);
  }


  x = _.random(0, 3);
  for (var j = 0; j < x; j++) {
    d = "";
    d += "<h2 class='text-center'>Links</h3>";
    var divClass = davis.pick(model.cssClasses).name;
    for (var i = 0; i < model.links.length; i++) {
      d += "<a href='" + model.links[i].url + "'><div class='text-center link " + divClass + "' >"+model.links[i].text+"</div></a>";
    }
    model.content.push(d);

  }

  x = _.random(0, 3);
  for (var j = 0; j < x; j++) {
    d = "";
    d += "<h2 class='text-center'>" + davis.random(100) + "%</h2>";
    for (var i = 0; i < _.random(1); i++) {
      d += "<p class='text-center'>" + davis.randomWord(10 + davis.random(8)) + "</p>";
    }
    model.content.push(d);

  }

  x = _.random(0, 3);
  for (var j = 0; j < x; j++) {
    d = "";
    d += "<h2 class='text-center'>" + davis.random(1000) + " " + davis.pick(model.interests) + "</h2>";
    model.content.push(d);

  }

  x = _.random(0, 3);
  for (var j = 0; j < x; j++) {
    d = "";
    d += "<h3 class='text-center'>" + davis.pick(model.interests) + "</h3>";
    for (var i = 0; i < davis.random(4); i++) {
      d += "<p>" + davis.randomWord(10 + davis.random(80)) + "</p>";
    }
    model.content.push(d);

  }

  x = _.random(0, 6);
  for (var j = 0; j < x; j++) {
    d = "";
    d += "<h3 class='text-center'>";
    var links = [];
    for (var i = 0; i < model.links.length; i++) {
      links.push("<a href='"+model.links[i].url+"'>"+model.links[i].text+"</a>");
    }
    d += links.join(" | ");
    d += "</h3>";
    model.content.push(d);

  }

  d = "";
  for (var i=0;i<model.icons.length;i++){
    var icon = model.icons[i];
    d += "<a href='"+icon.url+"'><img src='" + icon.image + "' ></a>";
  }
  model.content.push(d);



  x = _.random(0, 6);
  for (var i = 0; i < x; i++) {
    model.content.push("");

  }
  model.content = davis.darwin([_.shuffle(model.content)], model.stock.content);
};

controller.cssClasses = function() {
  var classes = [];
  for (var i = 0; i < 5; i++) {
    var color = davis.pick(model.colors);
    var name = davis.randomWord() + davis.random(999);
    var d = style("." + name, {
      "background-color": color.rgb,
        "color": color.text
    });
    classes.push({
      "name": name,
      "style": d
    });
  }
  model.cssClasses = classes;
  //console.log(model.cssClasses);
};

controller.styles = function() {
  model.width = davis.darwin([(70 + davis.random(30)), 100], model.stock.widths);
  model.borderRadius = davis.darwin([davis.random(40), 0], model.stock.borderRadii);
  model.borderSpacing = davis.darwin([(davis.random(60))], model.stock.borderSpacings);
  model.borderWidth = davis.darwin([(davis.random(20)), 0], model.stock.borderWidths);


  model.grey = davis.darwin([davis.randomColor("fullgrey")], model.stock.greys);
  model.colors = [];
  model.colors.push(davis.darwin([davis.randomColor("full")], model.stock.colors));
  model.colors.push(davis.darwin([davis.randomColor("full")], model.stock.colors));
  model.colors.push(davis.darwin([davis.randomColor("fullgrey")], model.stock.greys));
  model.colors.push(model.grey);
  model.bgColor = davis.pick([model.grey, davis.pick(model.colors)]);


  model.frame = [];

  for (var i = 0; i < 4; i++) {
    var frame = davis.sumTo(4);
    for (var j = 0; j < frame.length; j++) {
      frame[j] *= 3;
    }
    model.frame.push(frame);
  }

  model.frame = davis.darwin([model.frame], model.stock.frames);

};

controller.love = function(locus, value) {
  model.stock[locus] = model.stock[locus] || [];
  model.stock[locus].push(value);
  return true;
}

var view = {};

view.init = function () {  
  view.landingPage();
};

view.landingPage = function () {
  var d = "";
  d += "<div class='landing'>";
  d += "<h1>Conflexian</h1>";
  d += "<p>Conflexian uses evolution to create new web designs in real time.</p>";
  d += "<p>You don't need skills. You just need taste.</p>";
  d += "<p>Press 'n' for a new design, 'l' to let Conflexian know you like a design, and 's' to see designs you've liked already.</p>";
  d += "<button id='get-started'>Get Started</button>";
  d += "</div>";
  $("body").html(d);
};

view.createNewDesign = function() {
  var d = "";
  d += "<div class='container' >";
  d += "</div>";

  $("body").html(d);

  var selector = 0;
  while (selector < model.content.length) {
    var frame = davis.pick(model.frame);
    var row = view.row(frame, selector);
    $("div.container").append(row);
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
  d += "<div class='flex-container'>";
  for (var i = 0; i < colspans.length; i++) {
    if (model_content_index < model.content.length) {
      d += "<div  class='main-cell " + davis.pick(model.cssClasses).name + "' style='flex: " + colspans[i] + ";'>" + model.content[model_content_index] + "</div>";
      model_content_index++;
    }
    else {
      d += "<div  class='main-cell " + davis.pick(model.cssClasses).name + "' style='flex:" + colspans[i] + ";'>" + view.content() + "</div>";
    }
  }
  d += "</div>";
  return d;
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
    "font-size": (_.random(0.9, 1.1)) + "em",
    "margin": "0px",
    "padding": "0px",
    "width": "100%",
    "height": "100%",
    "text-align": "center",
    "background": model.bgColor.rgb
  });

  d += style("h1,h2,h3,h4", {
    "text-align": "center",
    "margin": "10px",
    "align-self": "center"
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

  d += style("div.main-cell", {
    "border": model.borderWidth + "px solid " + model.bgColor.text,
    "margin": model.borderSpacing + "px",
    "padding": (2 + davis.random(18)),
    "border-radius": model.borderRadius + "px",
    "text-align": "center"
  });

  d += style("div.link", {
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

  d += style("div.container", {
    "margin": "0px auto 0px auto",
    //"table-layout": "fixed",
    "min-height": "99%",
    "padding": "0px",
    "width": model.width + "%"
  });

  d += style("div.flex-container", {
    "display": "flex",
    "align-items": "stretch",
    "flex-flow": "row wrap", 
  });


  for (var i = 0; i < model.cssClasses.length; i++) {
    d += model.cssClasses[i].style;
    //console.log(model.cssClasses[i].style);
  }


  $("style").append(d);

  $("div.main-cell:has(h1)").css({
    "vertical-align": "middle"
  });

  $("div.main-cell:empty").each(function() {

    if ($(this).height() > 150) {
      var img = davis.pick(model.images128);
      var d = "<img src='" + img.image + "' />";
      $(this).html(d);
      $(this).css({
        "border":"0px",
        "background": "transparent",
        "align-self": "center"
      });
      $(this).click(function(){
        window.location = img.url;
      });

    }

    if ($(this).height() > 256 && $(this).width() > 256) {
      var img=davis.pick(model.images256);
      var d = "<img src='" + img.image + "' />";
      $(this).html(d);
      $(this).css({
        "border":"0px"
      });
      $(this).click(function(){
        window.location = img.url;
      });
    }
  });
};

module.exports = view;
module.exports = function(tag, contents) {
  var d = "";
  d += tag + "{";
  for (var prop in contents) {
    d += prop + ":" + contents[prop] + ";";
  }
  d += "}";
  return d;
};

var hark = {};
hark.init = function() {
  var KEYS = {'C': 99, 'N': 110, 'L': 108, 'S': 115};

  $("body").on("click", "button#get-started", function () {
    controller.init();
    $("body").animate({
      opacity: 0,
      backgroundColor: model.bgColor
    }, 400, function() {
      view.createNewDesign();
      $("body").animate({
        opacity: 1
      }, 400);
    });

  });

  $("body").keypress(function(event) {
    if (event.which === KEYS.L) {
      controller.love("colors", model.colors[0]);
      controller.love("colors", model.colors[1]);
      controller.love("greys", model.colors[2]);
      controller.love("greys", model.colors[3]);
      controller.love("widths", model.width);
      controller.love("borderRadii", model.borderRadius);
      controller.love("borderSpacings", model.borderSpacing);
      controller.love("borderWidths", model.borderWidth);
      controller.love("frames", model.frame);
      controller.love("content", model.content);
      html2canvas(document.body, {
        onrendered: function(canvas) {
          controller.love("canvases", canvas);
          controller.love("html", $("body").html());
          controller.love("css", $("style").html());
          controller.love("codes", "<! DOCTYPE html><html><head><style>" + $('style').html() + "</style></head><body>" + $("body").html() + "</body></html>");
        },
        allowTaint: true,
        width: $(document).width(),
        height: $(window).height()
      });
    }
    else if (event.which === KEYS.N) {
      controller.init();
      $("body").animate({
        opacity: 0,
        backgroundColor: model.bgColor
      }, 400, function() {
        view.createNewDesign();
        $("body").animate({
          opacity: 1
        }, 400);
      });
    }
    else if (event.which === KEYS.S && model.stock.canvases) {
      $("body").animate({
        opacity: 0,
        backgroundColor: "#eee"
      }, 400, function() {
        $("body").html("<div class='flex-container' style='display: flex; flow: row wrap;'></div>");
        for (var i = 0; i < model.stock.canvases.length; i++) {
          $('.flex-container').append('<div class="selected-design"></div>');
          var $node = $('.selected-design:last');
          $node.append(model.stock.canvases[i]);
          $node.append("<h4>CSS</h4>");
          $node.append("<textarea>" + model.stock.css[i] + "</textarea>");
          $node.append("<h4>HTML</h4>");
          $node.append("<textarea>" + model.stock.html[i] + "</textarea>");
        }
        $("canvas").css({
          "width": "300px",
          "height": "100px",
          "margin": "0px"
        });
        $("div").css({
          "background": "#fff",
        });
        $("textarea").css({
          "height": "100px",
          "width": "300px"
        });
        $(".selected-design").css({
          "border": "1px solid #000",
          "margin": "10px",
          "padding": "2px",
          "flex": "1"
        });
        $("body").animate({
          opacity: 1
        }, 400);
      });
    }
  });
};

var app = {
  c: controller,
  m: model,
  v: view,
  h: hark
};

module.exports = app;

