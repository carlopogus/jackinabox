/*
 * jQuery Image Gallery Plugin 2.5
 * https://github.com/.....
 *
 * Copyright 2013, Carl Bradshaw
 * https://bradshaw-design.co.nz
 *
 * Please credit me :)
 */



//create a private scope
(function($){

	//create jQuery function jackinabox();
	$.fn.jackinabox = function(){

		//return the wrapped set and loop through the set and apply functionality to each member of the set
		return this.each(function(){

			// VARIABLES
			var 
				currentIndex = 0,
				$thumbs = $(this).find(".jackbox"),
				$image = "",
				$imgPreview = "",
				numImages = $thumbs.length,
				imgWidth,
				imgHeight,
				btnpos,
				cptHeight;

			
		//=========================== APPEND ELEMENTS ======================================//

			// ADDS IMAGE PREVIEW TO PAGE
			$("body").prepend(
				'<div class="background"></div>','<div class="images"><div class="loading"></div><p class="caption"></p><img src="images/image_1.jpg" alt="yolo" /></div>');
			$('.images').append('<div class="prev-btn"></div>','<div class="next-btn"></div>');

			var $image = $(".images img"),
			$imgPreview = $(".images");

			// IMEDIATLY HIDES IMAGE PREVIEW
			$('.background, .images').hide();


		//=================== CHANGES PREVIEW IMAGE SRC ON THUMB CLICK ====================//

			$thumbs.click(function(e){

				var selectedIndex = $thumbs.index(this),
					imagepos = "",
					offscreen = $(window).height(),
					maxHeight = $(window).height() - 200,
					maxWidth = $(window).width() - 200;
					
				currentIndex = selectedIndex;

				e.preventDefault();
				$('body').css('overflow','hidden');// HIDE SCROLLBARS
				$image.attr('src', $thumbs.eq(selectedIndex).attr('href')) // CHANGE IMG SRC TO SELECTED IMAGE
				.css({'max-height':maxHeight,'max-width':maxWidth}); // SET MAX HEIGHT AND WIDTH OF IMAGE TO SCREEN -200PX
				$('.caption').text($thumbs.eq(selectedIndex).attr('title')); // SETS THE TEXT FOR THE CAPTION TO THAT OF SELECTED ATTR TITLE
				$imgPreview.css({'marginTop':offscreen,'left':0,'right':0}); // PUT PREVIEW AREA CENTERED OFF SCREEN
				$('.background').fadeIn(); // FADE IN THE GRADIENT BACKGROUND
				$imgPreview.fadeIn(function(){ // FADE IN PREVIEW BOX
					imgWidth = $image.width();
					imgHeight = $image.height();
					imagepos = ($(window).height() - imgHeight) / 2;
					btnpos = (imgHeight - $('.next-btn').height()) / 2;
					cptHeight = $('.caption').height();

					// POSITION ARROWS
					$('.next-btn, .prev-btn').css({top:btnpos}); // POSITION ARROWS CENTERED WITH IMAGE

					//ANIMATE PREVIEW POP UP
					$('.caption').css({'top':imgHeight - cptHeight}); // SETS CAPTION ANIMATION START POINT
					$imgPreview.css({'width':imgWidth,'height':imgHeight}) //SET PREVIEW BOX WIDTH AND HEIGHT
					.animate({'marginTop':imagepos - 10}, // ANIMATE PREVIEW BOX UP
					// CALLBACK
					function(){
						$(this).animate({'marginTop':imagepos}) // ANIMATE PREVIEW BOX DOWN 10PX
						$('.next-btn').delay(100).animate({right:-100},'slow'); // ANIMATE ARROWS OUT
						$('.prev-btn').delay(100).animate({left:-100},'slow'); // ANIMATE ARROWS OUT
						$('.caption').delay(100).animate({top:imgHeight + 20}); // ANIMATE CAPTION BOX DOWN
					});
				});

			});
			

		//========================== ANIMATE ARROW ON HOVER ===========================//

			$('.next-btn').hover(
			  function () { // MOUSE ENTER
			    $(this).animate({right:'-=5'},100);
			  }, 
			  function () { // MOUSE LEAVE
			    $(this).animate({right:'+=5'},100);
			  }
			);

			$('.prev-btn').hover(
			  function () { // MOUSE ENTER
			    $(this).animate({left:'-=5'},100);
			  }, 
			  function () { // MOUSE LEAVE
			    $(this).animate({left:'+=5'},100);
			  }
			);
			

		//=============================== NEXT-BUTTON ================================//
				    // --- Change image source, preview area size... --- //

			var nextClick = function(){ // Declair the next function
				var selectedIndex = currentIndex + 1;

				if(selectedIndex > numImages - 1){
					currentIndex = 0;
				}
				else{
				currentIndex = selectedIndex;
				}
				
				// FADE OUT THE IMAGE
				$('.next-btn').animate({right:0,opacity:0},100);// ANIMATE ARROWS IN
				$('.prev-btn').animate({left:0,opacity:0},100);// ANIMATE ARROWS IN
				$('.caption').animate({top:imgHeight,opacity:0},100); // ANIMATES CAPTION IN
				$image.animate({'opacity':0},100,// FADE OUT THE IMAGE
					function(){ // - callback
						$(this).attr('src', $thumbs.eq(currentIndex).attr('href'))// CHANGE IMAGE SOURCE 
						.one("load",function(){
							imgWidth = $image.width();
							imgHeight = $image.height();
							imagepos = ($(window).height() - imgHeight) / 2;
							btnpos = (imgHeight - $('.next-btn').height()) / 2;
							$('.caption').text($thumbs.eq(currentIndex).attr('title')); // UPDATES TEXT FOR CAPTION
							$imgPreview.stop(true,true).animate({'width':imgWidth,'height':imgHeight,'marginTop':imagepos},
							function(){ // - callback
								$image.animate({'opacity':1},{duration:100,queue:false});// IMAGE FADE IN
								$('.next-btn').animate({right:-100,opacity:1},{duration:100});// ANIMATE ARROWS BACK OUT
								$('.prev-btn').animate({left:-100,opacity:1},{duration:100});// ANIMATE ARROWS BACK OUT
								$('.caption').animate({top:imgHeight + 20,opacity:1},{queue:false}); // ANIMATES CAPTION OUT
							});// end of inner animate
							$('.caption').css({top:imgHeight}); // RESETS CAPTION START POSITION FOR ANIMATION
							$('.next-btn, .prev-btn').css({top:btnpos});// position arrows center of image
						});// end of load function
				});// end of animate
				console.log(selectedIndex)
			}

			//----------- CALL FUNCTION -----------//

			// CALL NEXT FUNCTION ON BUTTON CLICK
			$('.next-btn').click(function(){	
				nextClick();
			});// end of click function

			$(document).keydown(function(e){
				if (e.keyCode == 39) {     	
		       		nextClick();
		    	}
			});
			

		//============================ PREVIOUS-BUTTON =============================//
				// --- Change image source, preview area size... --- //

				var prevClick = function(){
					var selectedIndex = currentIndex - 1;
					if(selectedIndex < 0){
						currentIndex = numImages-1;
					}
					else{
					currentIndex = selectedIndex;
					}
					
					// FADE OUT THE IMAGE
					$('.next-btn').animate({right:0,opacity:0},100);// ANIMATE ARROWS IN
					$('.prev-btn').animate({left:0,opacity:0},100);// ANIMATE ARROWS IN
					$('.caption').animate({top:imgHeight,opacity:0},100);
					$image.animate({'opacity':0},100,// FADE OUT THE IMAGE
						function(){ // - callback
							$(this).attr('src', $thumbs.eq(currentIndex).attr('href'))// CHANGE IMAGE SOURCE 
							.one("load",function(){
								imgWidth = $image.width();
								imgHeight = $image.height();
								imagepos = ($(window).height() - imgHeight) / 2;
								btnpos = (imgHeight - $('.next-btn').height()) / 2;
								$('.caption').text($thumbs.eq(currentIndex).attr('title'));
								$imgPreview.stop(true,true).animate({'width':imgWidth,'height':imgHeight,'marginTop':imagepos},
								function(){ // - callback
									$image.animate({'opacity':1},{duration:100,queue:false});// IMAGE FADE IN
									//.css('overflow','visible');
									$('.next-btn').animate({right:-100,opacity:1},{duration:100});// ANIMATE ARROWS BACK OUT
									$('.prev-btn').animate({left:-100,opacity:1},{duration:100});// ANIMATE ARROWS BACK OUT
									$('.caption').animate({top:imgHeight + 20,opacity:1},{queue:false});
								});// end of inner animate
								$('.caption').css({top:imgHeight});
								$('.next-btn, .prev-btn').css({top:btnpos});// position arrows center of image

							});// end of load function
					});// end of animate
				}

			$('.prev-btn').click(function(){
				prevClick();
			});// end of click function

			$(document).keydown(function(e){
				if (e.keyCode == 37) {     	
		       		prevClick();
		    	}
			});
			

		//================= HIDE IMAGE PREVIEW AND BACKGROUND =====================//

			var resume = function(){
				$('body').css('overflow','auto');
				$('.background, .images').fadeOut();
				// ANIMATE ARROWS BACK ON PREVIEW LOAD
				$('.next-btn').animate({right:0},'slow');
				$('.prev-btn').animate({left:0},'slow');
			}

			// HIDE IMAGE PREVIEW BY CLICKING BACKGROUND
			$(".background").click(function(){
				resume();
			});

			// HIDE IMAGE PREVIEW WITH ESC KEY
			$(document).keydown(function(e){
				if (e.keyCode == 27) {     	
		       		resume();
		    	}
			});

		});//end return this.each function
	};//end $.fn.jackinabox
})(jQuery);//end private scope