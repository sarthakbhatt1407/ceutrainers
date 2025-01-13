import React, { useState, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButtonComponent = (props) => {
  const [price, setPrice] = useState(props.price); // Initialize price with props
  console.log(price);

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
  }, [props.price]); // The component will re-render whenever props.price changes

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
        onCancel={(data, actions) => {
          // Display message when payment is canceled
          setMessage("Payment was canceled. Please try again.");
          console.log("Payment canceled", actions, data);
        }}
        onApprove={(data, actions) => {
          // Capture the payment after approval
          return actions.order.capture().then((details) => {
            // Successful transaction
            setMessage(`Transaction successful by ${details}`);
            console.log("Transaction details:", details);
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
