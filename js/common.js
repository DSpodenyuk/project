$(function() {
  var ajaxSend, init;
  ajaxSend = function() {
    $.ajax({
      type: 'POST',
      url: 'mail.php',
      data: $(form).serialize(),
      success: function() {
        $(form)[0].reset();
        $('.popup').hide();
        $('.popup-overlay').hide();
        $('.message').fadeIn(150);
        setTimeout((function() {
          $('.message').fadeOut(150);
        }), 2000);
      }
    });
    return false;
  };
  init = function() {
    return console.log('init success');
  };
  $(window).scroll(function() {});
  $(window).resize(function() {});
  return init();
});
