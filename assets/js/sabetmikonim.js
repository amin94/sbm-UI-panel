$(document).ready(function() {


	// $('input[name=notifTypeOption]').click(function() {
	//
	// 	if ($("input[name=notifTypeOption]").prop('checked') == true) {
	//
	// 		if ($('input[name=notifTypeOption]').val()=='recent_activity') {
	//
	// 			var modalId = '#raModal';
	//
	// 		} else if ($('input[name=notifTypeOption]').val()=='hot_streak') {
	//
	// 			var modalId = '#hsModal';
	//
	// 		}
	//
	// 		$(modalId).addClass('openModal');
	//
	// 		$('.mask').fadeIn();
	//
	// 	}
	//
	//
	// });




	$('a[name=deleteAction]').click(function(e) {

		e.preventDefault();

		var contactID = jQuery(this).attr('data-delContactID');

		var formData = { "update":"deleteAction", "actionID":contactID };

		jQuery.ajax({
			type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url 		: 'http://amins-macbook-pro.local:5757/sabetmikonimv2/campaign/update.php', // the url where we want to POST
			data 		: formData, // our data object
			dataType 	: 'json', // what type of data do we expect back from the server
			async: false,
			encode 		: true
		})
			// using the done promise callback
			.done(function(testObj) {

				jQuery( "#contact-"+contactID ).remove();

			})

			// using the fail promise callback
			.fail(function(testObj) {

			});

	});



	$('.mask').click(function(e) {

		$(this).fadeOut();
		$('.modalOption').fadeOut('fast');
		$('.modalOption').removeClass('openModal');

	});

	$('a[name=closeModal]').click(function(e) {

		$('.mask').fadeOut();
		$('.modalOption').fadeOut('fast');
		$('.modalOption').removeClass('openModal');

	});




});
