$('#contactForm')
  .validator()
  .on('submit', function (event) {
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
      formError();
      submitMSG(false, 'Did you fill in the form properly?');
    } else {
      // everything looks good!
      event.preventDefault();
      submitForm();
    }
  });

function submitForm() {
  // Initiate Variables With Form Content
  var name = $('#name').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var subject = $('#subject').val();
  var message = $('#message').val();
  $.ajax({
    type: 'POST',
    url: 'https://gmax-dash.herokuapp.com/timetech',
    data:
      'name=' +
      name +
      '&email=' +
      email +
      '&message=' +
      message +
      '&phone=' +
      phone +
      '&subject=' +
      subject,
    success: function (text) {
      console.log(text);
      if (text == 'success') {
        formSuccess();
      } else {
        formError();
        submitMSG(false, text);
      }
    },
    error: function (err) {
      console.log('The error is', err);
      formError();
      submitMSG(false, err.responseText);
    },
  });
}

function formSuccess() {
  $('#contactForm')[0].reset();
  submitMSG(true, 'Message Submitted!');
}

function formError() {
  $('#contactForm')
    .removeClass()
    .addClass('shake animated')
    .one(
      'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
      function () {
        $(this).removeClass();
      }
    );
}

function submitMSG(valid, msg) {
  if (valid) {
    var msgClasses = 'h3 text-center tada animated text-success';
  } else {
    var msgClasses = 'h3 text-center text-danger';
  }
  $('#msgSubmit').removeClass().addClass(msgClasses).text(msg);
  //   $('#msgSubmit').delay(2000).hide(0);
}
