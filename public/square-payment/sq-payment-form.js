/*
function onGetCardNonce(event) {

    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();
  
    // Request a nonce from the SqPaymentForm object
    paymentForm.requestCardNonce();
  }
  
  // Initializes the SqPaymentForm object by
  // initializing various configuration fields and providing implementation for callback functions.
  var paymentForm = new SqPaymentForm({
    // Initialize the payment form elements
    applicationId: applicationId,
    locationId: locationId,
    inputClass: 'sq-input',
  
    // Customize the CSS for SqPaymentForm iframe elements
    inputStyles: [{
      backgroundColor: 'transparent',
      color: '#333333',
      fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
      fontSize: '16px',
      fontWeight: '400',
      placeholderColor: '#8594A7',
      placeholderFontWeight: '400',
      padding: '16px',
      _webkitFontSmoothing: 'antialiased',
      _mozOsxFontSmoothing: 'grayscale'
    }],
  
    // Initialize Google Pay button ID
    googlePay: {
      elementId: 'sq-google-pay'
    },
  
    // Initialize Apple Pay placeholder ID
    applePay: {
      elementId: 'sq-apple-pay'
    },
  
    // Initialize Masterpass placeholder ID
    masterpass: {
      elementId: 'sq-masterpass'
    },
  
    // Initialize the credit card placeholders
    cardNumber: {
      elementId: 'sq-card-number',
      placeholder: '•••• •••• •••• ••••'
    },
    cvv: {
      elementId: 'sq-cvv',
      placeholder: 'CVV'
    },
    expirationDate: {
      elementId: 'sq-expiration-date',
      placeholder: 'MM/YY'
    },
    postalCode: {
      elementId: 'sq-postal-code'
    },
  
    // SqPaymentForm callback functions
    callbacks: {
  
     
      methodsSupported: function (methods) {
        if (!methods.masterpass && !methods.applePay && !methods.googlePay) {
          var walletBox = document.getElementById('sq-walletbox');
          walletBox.style.display = 'none';
        } else {
          var walletBox = document.getElementById('sq-walletbox');
          walletBox.style.display = 'block';
        }
  
        // Only show the button if Google Pay is enabled
        if (methods.googlePay === true) {
          var googlePayBtn = document.getElementById('sq-google-pay');
          googlePayBtn.style.display = 'inline-block';
        }
  
        // Only show the button if Apple Pay for Web is enabled
        if (methods.applePay === true) {
          var applePayBtn = document.getElementById('sq-apple-pay');
          applePayBtn.style.display = 'inline-block';
        }
  
        // Only show the button if Masterpass is enabled
        if (methods.masterpass === true) {
          var masterpassBtn = document.getElementById('sq-masterpass');
          masterpassBtn.style.display = 'inline-block';
        }
      },
  
     
      createPaymentRequest: function () {
  
        var paymentRequestJson = {
          requestShippingAddress: false,
          requestBillingInfo: true,
          shippingContact: {
            familyName: "CUSTOMER LAST NAME",
            givenName: "CUSTOMER FIRST NAME",
            email: "mycustomer@example.com",
            country: "USA",
            region: "CA",
            city: "San Francisco",
            addressLines: [
              "1455 Market St #600"
            ],
            postalCode: "94103",
            phone:"14255551212"
          },
          currencyCode: "USD",
          countryCode: "US",
          total: {
            label: "MERCHANT NAME",
            amount: "1.00",
            pending: false
          },
          lineItems: [
            {
              label: "Subtotal",
              amount: "1.00",
              pending: false
            }
          ]
        };
  
        return paymentRequestJson;
      },
  
      
      validateShippingContact: function (contact) {
  
        var validationErrorObj ;
      
        return validationErrorObj ;
      },
  
    
      cardNonceResponseReceived: function(errors, nonce, cardData, billingContact, shippingContact) {
        if (errors){
          var error_html = "";
          for (var i =0; i < errors.length; i++){
            error_html += "<li> " + errors[i].message + " </li>";
          }
          document.getElementById("error").innerHTML = error_html;
          document.getElementById('sq-creditcard').disabled = false;
  
          return;
        }else{
          document.getElementById("error").innerHTML = "";
        }
  
        // Assign the nonce value to the hidden form field
        document.getElementById('card-nonce').value = nonce;
  
        // POST the nonce form to the payment processing page
        document.getElementById('nonce-form').submit();
  
      },
  
      unsupportedBrowserDetected: function() {
       
      },
  
      inputEventReceived: function(inputEvent) {
        switch (inputEvent.eventType) {
          case 'focusClassAdded':
            break;
          case 'focusClassRemoved':
            break;
          case 'errorClassAdded':
            break;
          case 'errorClassRemoved':
            break;
          case 'cardBrandChanged':
            break;
          case 'postalCodeChanged':
            break;
        }
      },
  
      paymentFormLoaded: function() {
      }
    }
  });
  */

 function onGetCardNonce(event) {
  event.preventDefault();
  paymentForm.requestCardNonce();
}

const paymentForm = new SqPaymentForm({
     applicationId: applicationId,
      card: {
        elementId: 'sq-card',
      },

      callbacks: {
        cardNonceResponseReceived: function(errors, nonce, paymentData, contacts) {
          if (errors) {
            console.error('Encountered errors on card nonce received:');
            errors.forEach(function (error) {
              console.error('  ' + error.message);
            });
            alert('Encountered errors, check console for more details');
            return;
          } else {
            alert(`The generated nonce is:\n${nonce}`);
            document.getElementById('card-nonce').value = nonce;
            document.getElementById('nonce-form').submit();
          }
        }
      }
   });