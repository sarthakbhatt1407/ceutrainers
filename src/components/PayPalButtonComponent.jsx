import React, { useState, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const PayPalButtonComponent = (props) => {
  const cartItems = useSelector((state) => state.cart);
  const [price, setPrice] = useState(props.price); // Initialize price with props
  const [payload, setPayload] = useState(props.payload); // Initialize price with props
  const navigate = useNavigate();
  const initialOptions = {
    "client-id":
      "ATk9aUiXtazhMix65nRW52-lq_gvHgmrsiRm91xGCbRO2uVe5CtlkxP0jbZzvGVPimmRCIzZAstXIJgW", // Replace with your actual PayPal client ID
    "disable-funding": "venmo,paylater,card", // Disable credit cards, pay-later, and Venmo
    currency: "USD", // Currency
  };

  const [message, setMessage] = useState("");

  // Update the price when the prop price changes
  useEffect(() => {
    setPrice(props.price);
    setPayload(props.payload);
  }, [props.price, props.payload]); // The component will re-render whenever props.price changes

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{
          shape: "pill",
          layout: "vertical",
          color: "blue",
          label: "paypal",
        }}
        createOrder={(data, actions) => {
          // Client-side order creation - no REST API interaction
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: `${price}`, // Use the updated price
                },
              },
            ],
          });
        }}
        onCancel={async (data, actions) => {
          // Display message when payment is canceled
          setMessage("Payment was canceled. Please try again.");
          console.log("Payment canceled", actions, data);
          cartItems.map(async (item) => {
            const requestData = {
              name: payload.firstName + " " + payload.lastName,
              email: payload.email,
              number: payload.phone,
              country: payload.country,
              address: payload.address1,
              pin_code: payload.zip,
              course_id: item.courseId,
              job_profile: payload.jobTitle,
              state: payload.state,
            };

            try {
              // Send the data to the server
              const response = await fetch(
                "https://ceuservices.com/api/cancel_payment.php",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(requestData),
                }
              );

              // Parse the server's JSON response
              const result = await response.json();

              if (response.ok) {
                setMessage("Payment was canceled, and the details were saved.");
              } else {
                throw new Error(
                  result.message || "Failed to save canceled payment details."
                );
              }

              console.log("Server response:", result);
            } catch (error) {
              // Catch and handle any errors during the request
              console.error("Error sending data:", error);
              setMessage(`An error occurred: ${error.message}`);
            }
          });
        }}
        onApprove={(data, actions) => {
          // Capture the payment after approval
          return actions.order.capture().then(async (details) => {
            console.log("Transaction details:", details);

            cartItems.map(async (item) => {
              const payloadData = {
                name: payload.firstName + " " + payload.lastName,
                email: payload.email,
                country: payload.country,
                number: payload.phone,
                city: payload.city,
                pin_code: payload.zip,
                course_id: item.courseId,
                coupon_discount: payload.discount,
                attendees: payload.attendees,
                address: payload.address1,
                address2: payload.address2,
                company_name: payload.companyName,
                job_profile: payload.jobTitle,
                state: payload.state,
                order_id: details.id,
                PayerID: details.payer.payer_id,
                amount: cartItems.reduce((a, b) => a + b.price, 0),
                selling_options: item.option + " = " + item.price,
                txn_id: details.purchase_units[0].payments.captures[0].id,
                cc: "USD",
                payer_email: details.payer.email_address,
                payment_status: details.status,
              };
              console.log(payloadData);

              try {
                const response = await fetch(
                  "https://ceuservices.com/api/payment_detail.php",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payloadData),
                  }
                );
                const data = await response.json();

                if (data.status == "success") {
                  console.log("Submission successful:", data);
                } else {
                }
              } catch (err) {
                console.error("Error submitting form:", err);
              }
            });

            navigate("/order-succes");
          });
        }}
        onError={(error) => {
          // Handle errors
          setMessage(`Error: ${error}`);
          console.error("PayPal error:", error);
        }}
      />
      {message && <div>{message}</div>} {/* Show the message on UI */}
    </PayPalScriptProvider>
  );
};

export default PayPalButtonComponent;
