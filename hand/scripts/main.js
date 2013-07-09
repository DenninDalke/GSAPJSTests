$(window).load(function() {

	init();

});


var timeline,
		progressValue,
		totalProgressValue,
		timeValue,
		totalTimeValue,
		progressSlider, 
		totalProgressSlider,
		txtContainer,
		txt;

function init()
{
	$('.banner-content').load('banner.html', onBannerLoaded );
}

function onBannerLoaded()
{
	txtContainer 		= $("#txtContainer");

	splitText("We Hope You Enjoyed the Tour");

	setupControls();

	setupTimeline();
}

function setupTimeline()
{
	var	handContainer 	= $(".hand-container"),
			imgsContainer 	= $(".imgs-container"),
			timeValue 			= $("#timeValue"),
			totalTimeValue 	= $("#totalTimeValue"),
			handIn 					= $(".hand-in"),
			handOut					= $(".hand-out");

	timeline			= new TimelineMax({
		onUpdate: updateUI
	});

	timeline.staggerFrom(txt, 0.8, {
		alpha:0, 
		rotationY:"-270deg", 
		ease:Back.easeOut
	}, 0.02, "textEffect");

	timeline.staggerTo(txt, 0.6, {
		transformOrigin:"50% 50% 10"},
	0.01, "textEffect");

	timeline.to( handIn, 1.5, {
		alpha: 0
	}, 3);

	timeline.to( imgsContainer, 1.5, {
		scale: 1/4,
		//zoom: 1/4,
		x: 380,
		y: 700,
		rotation: 30
	}, 3);
}

function setupControls()
{
	progressValue 			= $("#progressValue");
	totalProgressValue 	= $("#totalProgressValue");
	timeValue 					= $("#timeValue");
	totalTimeValue 			= $("#totalTimeValue");

	progressSlider = $("#progressSlider").slider({
	    range: false,
	    min: 0,
	    max: 100,
		step:.1,
        slide: function ( event, ui ) {
					timeline.pause();
          timeline.progress( ui.value/100 );
        }
    });
	
	totalProgressSlider = $("#totalProgressSlider").slider({
      range: false,
      min: 0,
      max: 100,
		step:.1,
      slide: function ( event, ui ) {
				timeline.pause();
          timeline.totalProgress( ui.value/100 );
        }
    });
}

function updateUI()
{
	//change slider value
	progressSlider.slider("value", timeline.progress() *100);
	totalProgressSlider.slider("value", timeline.totalProgress() *100);

	//update display of values
	progressValue.html(timeline.progress().toFixed(2));
	totalProgressValue.html(timeline.totalProgress().toFixed(2));
	timeValue.html(timeline.time().toFixed(2));
	totalTimeValue.html(timeline.totalTime().toFixed(2));
}

function splitText(phrase) {
		var prevLetter, sentence,
			sentence = phrase.split("");
		$.each(sentence, function(index, val) {
			if(val === " "){
				val = "&nbsp;";
			}
			var letter = $("<div/>", {
						id : "txt" + index
			}).addClass('txt').html(val).appendTo(txtContainer);
	
			if(prevLetter) {
				$(letter).css("left", ($(prevLetter).position().left + $(letter).width()) + "px");
			};
			prevLetter = letter;
		});
		txt = $(".txt");
	}