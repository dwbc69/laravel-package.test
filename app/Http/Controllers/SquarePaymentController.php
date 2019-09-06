<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SquarePaymentController extends Controller
{
    public function index(){
        return view('square-payment');
    }

    public function processCard(Request $request){

        
                $access_token = (env('USE_PROD'))?env('PROD_ACCESS_TOKEN'):env('SANDBOX_ACCESS_TOKEN');
                $host_url = (env('USE_PROD'))?"https://connect.squareup.com":"https://connect.squareupsandbox.com";
                /*$api_config = new \SquareConnect\Configuration();
                $api_config->setHost($host_url);
                $api_config->setAccessToken($access_token);
                $api_client = new \SquareConnect\ApiClient($api_config);
                $nonce = $request->nonce;
             
                if (is_null($nonce)) {
                echo "Invalid card data";
                http_response_code(422);
                return;
                }
                $payments_api = new \SquareConnect\Api\PaymentsApi($api_client);
                $request_body = array (
                "source_id" => $nonce,
                "amount_money" => array (
                "amount" => 100,
                "currency" => "USD"
                ),
                "idempotency_key" => uniqid()
                );
                try {
                $result = $payments_api->createPayment($request_body);
                dd($result);
                } catch (\SquareConnect\ApiException $e) {
                dd($e->getResponseBody(),$e->getResponseHeaders());
                }*/

               # setup authorization
                $api_config = new \SquareConnect\Configuration();
                $api_config->setHost($host_url);
                $api_config->setAccessToken($access_token);
                $api_client = new \SquareConnect\ApiClient($api_config);

                # create an instance of the Payments API class
                $payments_api = new \SquareConnect\Api\PaymentsApi($api_client);
                $location_id  = (env('USE_PROD'))?env('PROD_LOCATION_ID'):env('SANDBOX_LOCATION_ID');;
                $nonce = $request->nonce;
                $body = new \SquareConnect\Model\CreatePaymentRequest();

                $amountMoney = new \SquareConnect\Model\Money();

                # Monetary amounts are specified in the smallest unit of the applicable currency.
                # This amount is in cents. It's also hard-coded for $1.00, which isn't very useful.
                $amountMoney->setAmount(100);
                $amountMoney->setCurrency("USD");

                $body->setSourceId($nonce);
                $body->setAmountMoney($amountMoney);
                $body->setLocationId($location_id);

                $body->setIdempotencyKey(uniqid());
                try {
                    $result = $payments_api->createPayment($body);
                    $payment = $result->getPayment();
                    dd($payment['card_details']['card']['last_4']);
                } catch (\SquareConnect\ApiException $e) {
                    
                    dd($e->getResponseBody());
                }



    }
}
