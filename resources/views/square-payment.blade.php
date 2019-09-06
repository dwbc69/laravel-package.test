<html>
<head>
  <title>My Payment Form</title>
  <!-- link to the SqPaymentForm library -->
  <script type="text/javascript" src="{{ (env('USE_PROD'))?'https://js.squareup.com/v2/paymentform':'https://js.squareupsandbox.com/v2/paymentform' }}"></script>
  <script type="text/javascript">
    window.applicationId = "{{ (env('USE_PROD'))?('PROD_APP_ID'):env('SANDBOX_APP_ID') }}";
    window.locationId = "{{ (env('USE_PROD'))?('PROD_LOCATION_ID'):env('SANDBOX_LOCATION_ID') }}";
  </script>

  <!-- link to the local SqPaymentForm initialization -->
  <script type="text/javascript" src="{{ asset('/square-payment/sq-payment-form.js') }}"></script>
  <!-- link to the custom styles for SqPaymentForm -->
  <link rel="stylesheet" type="text/css" href="{{ asset('/square-payment/sq-payment-form.css') }}">

</head>
<body>
  <!-- Begin Payment Form -->
  <div class="sq-payment-form">
        <h1>Inster su credit card</h1>
      <form id="nonce-form" novalidate action="/" method="post">
         @csrf 
         <div id="sq-card"></div>
        <!--div class="sq-field">
          <label class="sq-label">Card Number</label>
          <div id="sq-card-number"></div>
        </div>
        <div class="sq-field-wrapper">
          <div class="sq-field sq-field--in-wrapper">
            <label class="sq-label">CVV</label>
            <div id="sq-cvv"></div>
          </div>
          <div class="sq-field sq-field--in-wrapper">
            <label class="sq-label">Expiration</label>
            <div id="sq-expiration-date"></div>
          </div>
          <div class="sq-field sq-field--in-wrapper">
            <label class="sq-label">Postal</label>
            <div id="sq-postal-code"></div>
          </div>
        </div-->
        <div class="sq-field">
          <button id="sq-creditcard" class="sq-button" onclick="onGetCardNonce(event)">
            Pay $1.00 Now
          </button>
        </div>
        <!--
          After a nonce is generated it will be assigned to this hidden input field.
        -->
        <div id="error"></div>
        <input type="hidden" id="card-nonce" name="nonce">
      </form>
    </div>
  </div>
  <!-- End Payment Form -->
</body>
</html>