$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='api_calls']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      gateway_id: "required",
      url_field: "required",
      password: "required",
      key_id: "required",
      hmac_key: "required",
      payload: "required"
    },
    // Specify validation error messages
    messages: {
      gateway_id: "Please enter the Gateway id",
      url_field: "A valid URL is required",
      password: "Please enter the Password",
      key_id: "Please enter the Key ID",
      hmac_key: "Please enter the HMAC key",
      payload: "Please enter the Payload"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    //submitHandler: function(form) {
    //  form.submit();
    //}
  });
});