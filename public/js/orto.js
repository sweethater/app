idleTimer = null;
idleState = false;
idleWait = 50000;

bgPlaying = true;
bodyModalVisible = true

$(window).load(function() {
	// !!!!!!! ODKOMENTOVAT !!!!!!!
	// !!!!!!! ODKOMENTOVAT !!!!!!!
	// !!!!!!! ODKOMENTOVAT !!!!!!!
	hide_body_parts();
	$("#loader").fadeOut("slow");
	$('.mejs-controls').hide();
});

$(document).ready(function() {

	var fullDate = new Date()
	var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
	var currentDate = fullDate.getDate() + "." + twoDigitMonth + ".";
	$('#calendar').text(currentDate)

	$('.container .list-group-item').on('click',function(){
		if ( $(this).hasClass("activ") ) {
		} else {
			$('.container .list-group-item.activ').removeClass('activ');
			$(this).addClass('activ');

			var city = $(this).attr('city');
			var street = $(this).attr('street');
			var optional = $(this).attr('optional');
			var psc = $(this).attr('psc');
			var phone = $(this).attr('phone');
			var opening = $(this).attr('opening').split('/');

			$('.office-info').fadeOut(300,function(){
				$(this).find('.city').text(city);
				$(this).find('.street').text(street);
				$(this).find('.optional').text(optional);
				$(this).find('.psc').text(psc);
				$(this).find('.phone').text(phone);

				var opening_hours = $(this).find('.opening .hours');

				opening_hours.each(function(index){
					$(this).text(opening[index]);
				});
				$(this).fadeIn(300);
			});
		}
	});

	$('ul.insurance li').on('click', function(){
		var insurance_tab = $(this).find('a').attr('href');
		goToDefault(insurance_tab);
	});


	var player = new MediaElementPlayer('video#presentation-vid');

	$(".nav.nav-pills.ortotech .contacts, .nav.nav-pills.ortotech .about").on('click',function(){
		pause_video(player);
	});

	$('#ortotechModal .close, #ortotechModal .btn-close').on('click',function(){
		stop_video(player);
	});

	$("#bgvid").bind("ended", function() {
		bgPlaying = false;
		$("#lebka").fadeIn(300,function(){
			$("#krk").fadeIn(300);
		  $("#rameno").fadeIn(300,function(){
		  	$("#chrbat").fadeIn(300,function(){
		  		$("#laket").fadeIn(300,function(){
		  			$("#panva").fadeIn(300);
		  			$("#zapastie").fadeIn(300,function(){
		  				$("#koleno").fadeIn(300,function(){
								$("#clenok").fadeIn(300,function(){
									hideBodyModal();
								});
		  				});
		  			});
					});
		  	});
		  });
		});
	});

	$('.body-part').on('click',function(){
		var modal_name = $(this).attr("modal_src");
		console.log(modal_name);
		$('#partModal-' + modal_name).modal('show');
		showBodyModal();
	});

	$('#partModal').on('hidden.bs.modal',function(){
		hideBodyModal();
	});

  $('*').bind('mousemove keydown scroll click', function () {

      clearTimeout(idleTimer);

      if (idleState == true) {
          // Reactivated event
          console.log("Welcome Back");
      }

      idleState = false;

      idleTimer = setTimeout(function () {
          // Idle event
        console.log("You've been idle for 20 sec.");
        stop_video(player)
        jsKeyboard.hide();
        $('.close').click();
        idleState = true;
      }, idleWait);
  });

  $("body").trigger("mousemove");

	$(function () {
       jsKeyboard.init("virtualKeyboard");
       $("#feedback").val();
   });

})

function goToDefault(element){
	$(element).find('.activ').removeClass('activ');
	$(element).find('.list-group-item:first').addClass('activ');
}

function showBodyModal(){
	if (typeof bgWaiting != 'undefined'){
		clearTimeout(bgWaiting);
	}
}

function hideBodyModal()	{
	bgWaiting = setTimeout(function(){
		fadeout_body_parts();
		setTimeout(function () {
			$("#bgvid")[0].play();
			bgPlaying = true;
		}, 600);
	},10000);
}


function hide_body_parts(){
	$("#lebka").hide();
	$("#krk").hide();
	$("#rameno").hide();
	$("#chrbat").hide();
	$("#laket").hide();
	$("#panva").hide();
	$("#zapastie").hide();
	$("#koleno").hide();
	$("#clenok").hide();
}

function fadeout_body_parts(){
	$("#lebka").fadeOut(300);
	$("#krk").fadeOut(300);
	$("#rameno").fadeOut(300);
	$("#chrbat").fadeOut(300);
	$("#laket").fadeOut(300);
	$("#panva").fadeOut(300);
	$("#zapastie").fadeOut(300);
	$("#koleno").fadeOut(300);
	$("#clenok").fadeOut(300);
}

function pause_video(player){
	player.pause();
}

function stop_video(player){
	player.pause();
	player.setCurrentTime(0);
}