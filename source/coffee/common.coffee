$ ->

	# Send form
	ajaxSend = ->
		$.ajax
			type: 'POST'
			url: 'mail.php'
			data: $(form).serialize()
			success: ->
				$(form)[0].reset()

				$('.popup').hide()
				$('.popup-overlay').hide()
				$('.message').fadeIn 150

				setTimeout (->
					$('.message').fadeOut 150
					return
				), 2000
				return
		false

	init = ->
		console.log 'init success'

	$(window).scroll ->
	$(window).resize ->

	init()
