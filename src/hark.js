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
		else if (event.which === KEYS.C) {
			$(document).ready(function() {
				console.log("Show me everything! (the codes)");
				console.log("<! DOCTYPE html><html><head><style>" + $('style').html() + "</style></head><body>" + $("body").html() + "</body></html>");
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
