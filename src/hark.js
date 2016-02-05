var hark = {};
hark.init = function() {
  var KEYS = {'N': 110, 'L': 108, 'S': 115};

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
			//console.log("Love it!");
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
		else if (event.which == 99) {
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
				$("body").html("");
				for (var i = 0; i < model.stock.canvases.length; i++) {
					document.body.appendChild(model.stock.canvases[i]);
				}
				$("canvas").css({
					"zoom": "30%",
					"margin": "20px"
				});
				$("body").animate({
					opacity: 1
				}, 400);
			});
		}
	});
};
