import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";
import { Divider, message } from "antd";
import MusicLoader from "../components/Loader/MusicLoader";
import PayPalButtonComponent from "../components/PayPalButtonComponent";

const Checkout = () => {
  const [showPaymnet, setShowPayment] = useState(false);

  const [couponLoading, setCouponLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [discount, setDiscount] = useState(0);
  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const cartItems = useSelector((state) => state.cart);

  const [attendees, setAttendees] = useState(null);
  const [checked, setChecked] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    jobTitle: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    address1: "",
    zip: "",
    country: "",
    address2: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [payload, setpayload] = useState(null);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [appliedCoupon, setAppliedCoupon] = useState(""); // To store the applied coupon code
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Checkout";
    let obj;
    if (cartItems.length == 1) {
      // Extract the numeric value from the option string
      const extractedValue = cartItems[0]["option"].split(" ")[0];

      // Check if the extracted value is a valid number
      if (!isNaN(extractedValue)) {
        console.log(extractedValue);

        // Convert the extracted value into an array of numbers
        const attendeeCount = parseInt(extractedValue, 10); // Convert to a number

        // Create an array of numbers (e.g., [1, 2, 3, ..., attendeeCount])
        const attendeesArray = Array.from(
          { length: attendeeCount },
          (_, index) => index + 1
        );

        setAttendees(attendeesArray); // Set attendees as an array of numbers
        const numberOfPeople = parseInt(extractedValue, 10);

        const attendeesObj = {};
        for (let i = 1; i <= numberOfPeople; i++) {
          attendeesObj[`attendee${i}Email`] = "";
          attendeesObj[`attendee${i}Name`] = "";

          attendeesObj[`attendee${i}Phone`] = "";
          attendeesObj[`attendee${i}JobTitle`] = "";
        }
        obj = { ...formValues, ...attendeesObj };
        setFormValues(obj);
        console.log(obj);
      }
    }
  }, [cartItems]);

  const handleApplyCoupon = async () => {
    setCouponLoading(true);
    try {
      const response = await fetch(
        "https://ceuservices.com/api/sales_promotion_coupon.php",
        {
          method: "POST", // Use POST to send data
          headers: {
            "Content-Type": "application/json", // Inform the server that the body contains JSON data
          },
          body: JSON.stringify({
            coupon_code: couponCode, // Send the coupon code in the body
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          // Assume the discount is in the response data
          setDiscount(data[0].discount); // Set discount from the response
          setAppliedCoupon(couponCode); // Store the applied coupon
          setIsCouponApplied(true); // Mark coupon as applied
          success(`Coupon code ${couponCode} applied!`);
        } else {
          // Coupon not found or invalid
          setIsCouponApplied(false);
          setDiscount(0);
          error("Invalid coupon code. Please try again.");
        }
      } else {
        // Handle HTTP errors
        setIsCouponApplied(false);
        setDiscount(0);
        error("Failed to validate coupon. Please try again later.");
      }
    } catch (err) {
      // Handle network or other errors
      setIsCouponApplied(false);
      setDiscount(0);
      error("An error occurred. Please try again later.");
      console.error(err);
    }
    setCouponLoading(false);
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setCouponCode("");
    setIsCouponApplied(false); // Reset coupon applied state
    setAppliedCoupon(""); // Clear the applied coupon
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    let attendeesData = [];
    // Extract attendees data
    if (cartItems.length < 2) {
      attendeesData = attendees.map((_, index) => {
        const attendeeIndex = index + 1; // Attendee indices start from 1
        return {
          name: formValues[`attendee${attendeeIndex}Name`],
          email: formValues[`attendee${attendeeIndex}Email`],
          phone: formValues[`attendee${attendeeIndex}Phone`],
          jobTitle: formValues[`attendee${attendeeIndex}JobTitle`],
        };
      });
    }

    // Log the structured attendees array (optional for debugging)
    // console.log("Attendees:", attendeesData);

    // Form validation
    let errors = {};
    let isValid = true;

    // Validate general form fields
    Object.keys(formValues).forEach((field) => {
      const value = formValues[field];
      if (!value) {
        errors[field] = "This field is required";
        isValid = false;
      }

      // Email validation
      if (field.includes("Email") && value && !/\S+@\S+\.\S+/.test(value)) {
        errors[field] = "Please enter a valid email address";
        isValid = false;
      }
    });

    // If validation fails, set errors and stop submission
    if (!isValid) {
      console.log(formValues);
      setFormErrors(errors);
      alert("Please fill in all required fields correctly.");
      return;
    }
    setShowPayment(true);

    // Prepare data for submission
    const { attendees: _, ...otherFormValues } = formValues; // Exclude attendees from top-level fields
    const payloadVal = {
      ...otherFormValues,
      attendees: attendeesData, // Include attendees array
      discount, // Include discount if applicable
      paymentMethod, // Include selected payment method
      appliedCoupon, // Include applied coupon if any
    };
    setpayload(payloadVal);
  };

  const isFormValid = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {" "}
      {contextHolder}
      <WebNav />
      <PagaeHeader heading={"Checkout"} />
      <PageWrapper>
        <ContentWrapper>
          <FormCard>
            <Title>Billing Information</Title> <Divider />
            <Form>
              <InputRow>
                <InputGroup>
                  <Label>
                    First Name <Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.firstName && (
                    <Error>{formErrors.firstName}</Error>
                  )}
                </InputGroup>
                <InputGroup>
                  <Label>
                    Last Name <Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.lastName && <Error>{formErrors.lastName}</Error>}
                </InputGroup>
              </InputRow>

              <InputRow>
                <InputGroup>
                  <Label>
                    Company Name <Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="companyName"
                    value={formValues.companyName}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.companyName && (
                    <Error>{formErrors.companyName}</Error>
                  )}
                </InputGroup>
                <InputGroup>
                  <Label>
                    Job Title <Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="jobTitle"
                    value={formValues.jobTitle}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.jobTitle && <Error>{formErrors.jobTitle}</Error>}
                </InputGroup>
              </InputRow>

              <InputRow>
                <InputGroup>
                  <Label>
                    Phone <Required>*</Required>
                  </Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.phone && <Error>{formErrors.phone}</Error>}
                </InputGroup>
                <InputGroup>
                  <Label>
                    Email <Required>*</Required>
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.email && <Error>{formErrors.email}</Error>}
                </InputGroup>
              </InputRow>

              <InputRow>
                <InputGroup>
                  <Label>
                    Country <Required>*</Required>
                  </Label>
                  <Select
                    name="country"
                    value={formValues.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a Country</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">UK</option>
                  </Select>
                  {formErrors.country && <Error>{formErrors.country}</Error>}
                </InputGroup>
                <InputGroup>
                  <Label>
                    Zip Code <Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="zip"
                    value={formValues.zip}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.zip && <Error>{formErrors.zip}</Error>}
                </InputGroup>
              </InputRow>

              <InputRow>
                <InputGroup>
                  <Label>
                    City <Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="city"
                    value={formValues.city}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.city && <Error>{formErrors.city}</Error>}
                </InputGroup>
                <InputGroup>
                  <Label>
                    State <Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="state"
                    value={formValues.state}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.state && <Error>{formErrors.state}</Error>}
                </InputGroup>
              </InputRow>

              <InputGroup>
                <Label>
                  Address 1 <Required>*</Required>
                </Label>
                <Input
                  type="text"
                  name="address1"
                  value={formValues.address1}
                  onChange={handleChange}
                  required
                />
                {formErrors.address1 && <Error>{formErrors.address1}</Error>}
              </InputGroup>

              <InputGroup>
                <Label>Address 2 (Optional)</Label>
                <Input
                  type="text"
                  name="address2"
                  value={formValues.address2}
                  onChange={handleChange}
                />
              </InputGroup>

              {attendees && attendees.length < 2 && cartItems.length < 2 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <Label>Attendee same as upper person</Label>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const isChecked = e.target.checked;

                      if (isChecked) {
                        setFormValues((prevState) => ({
                          ...prevState,
                          attendee1Name:
                            formValues.firstName + " " + formValues.lastName,
                          attendee1Email: formValues.email,
                          attendee1Phone: formValues.phone,
                          attendee1JobTitle: formValues.jobTitle,
                        }));
                      } else {
                        setFormValues((prevState) => ({
                          ...prevState,
                          attendee1Name: "",
                          attendee1Email: "",
                          attendee1Phone: "",
                          attendee1JobTitle: "",
                        }));
                      }

                      console.log(isChecked);
                      setChecked(isChecked);
                    }}
                  />
                </div>
              )}
            </Form>
          </FormCard>

          <CartHighlight>
            <CartTitle>Order Summary</CartTitle>
            <Divider />
            <CartList>
              {cartItems.map((item, index) => {
                return (
                  <CartItem key={index}>
                    <CartItemName>{item.title}</CartItemName>
                    <CartItemDetails>
                      <SellingOption>{item.option}</SellingOption>
                      <CartItemPrice>$ {item.price}</CartItemPrice>
                    </CartItemDetails>
                    <Divider />
                  </CartItem>
                );
              })}
            </CartList>

            {/* Coupon code */}
            <CouponSection>
              {" "}
              {couponLoading && <MusicLoader />}
              {!isCouponApplied ? (
                <>
                  <Label>Apply Coupon</Label>
                  <CouponWrapper>
                    <CouponInput
                      type="text"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toLocaleUpperCase())
                      }
                      placeholder="Enter coupon code"
                    />
                    <ApplyButton onClick={handleApplyCoupon}>Apply</ApplyButton>
                  </CouponWrapper>
                </>
              ) : (
                <AppliedCoupon>
                  <Label>
                    Applied Coupon:{" "}
                    <span
                      style={{
                        backgroundColor: "#3F8978",
                        color: "white",
                        padding: ".3rem .6rem",
                        borderRadius: ".2rem",
                        textTransform: "uppercase",
                        marginLeft: ".4rem",
                        fontStyle: "italic",
                      }}
                    >
                      {appliedCoupon}
                    </span>
                  </Label>
                  <RemoveCouponButton onClick={handleRemoveCoupon}>
                    Remove
                  </RemoveCouponButton>
                </AppliedCoupon>
              )}
            </CouponSection>

            <TableWrapper>
              <table>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>$ {cartItems.reduce((a, b) => a + b.price, 0)}</td>
                  </tr>
                  <tr>
                    <td>Coupon Discount</td>
                    <td>-${discount}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong style={{ fontSize: "1.3rem" }}>Total</strong>
                    </td>
                    <td>
                      <strong
                        style={{
                          fontSize: "1.3rem",
                        }}
                      >
                        ${" "}
                        {cartItems.reduce((a, b) => a + b.price, 0) - discount}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </TableWrapper>

            {/* Payment options */}
            <PaymentSection>
              <Label>Payment Method</Label>
              <PaymentOptions>
                <PaymentOption>
                  <RadioInput
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowPayment(false);
                    }}
                  />
                  <PaymentLabel>PayPal</PaymentLabel>
                </PaymentOption>

                <PaymentOption>
                  <RadioInput
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowPayment(false);
                    }}
                  />
                  <PaymentLabel>Stripe</PaymentLabel>
                </PaymentOption>
              </PaymentOptions>{" "}
              {/* <TotalRow>
                <TotalLabel>Total:</TotalLabel>
                <TotalValue>
                  $ {cartItems.reduce((a, b) => a + b.price, 0)}
                </TotalValue>
              </TotalRow> */}
            </PaymentSection>
            {showPaymnet && paymentMethod == "paypal" && (
              <PayPalButtonComponent
                price={cartItems.reduce((a, b) => a + b.price, 0) - discount}
                payload={{ ...payload }}
              />
            )}
            {isFormValid && !showPaymnet && (
              <Actions>
                <ButtonSubmit onClick={handleSubmit}>Continue</ButtonSubmit>
              </Actions>
            )}
          </CartHighlight>
        </ContentWrapper>
      </PageWrapper>
      <PageWrapper2>
        <ContentWrapper2>
          <FormCard2>
            {!checked &&
              cartItems.length < 2 &&
              attendees &&
              attendees.map((i, ind) => {
                const name = `attendee${ind + 1}Name`;
                const email = `attendee${ind + 1}Email`;
                const phone = `attendee${ind + 1}Phone`;
                const jobTitle = `attendee${ind + 1}JobTitle`;
                return (
                  <div
                    style={{
                      padding: ".5rem",
                      margin: ".5rem 0 ",
                      borderRadius: ".5rem",
                    }}
                  >
                    <Title>Attendee {ind + 1}</Title>

                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      <InputGroup>
                        <Label>
                          Name<Required>*</Required>
                        </Label>
                        <Input
                          type="text"
                          name={`attendee${ind + 1}Name`}
                          onChange={handleChange}
                          required
                        />
                        {formErrors[name] && <Error>{formErrors[name]}</Error>}
                      </InputGroup>

                      <InputGroup>
                        <Label>
                          Email<Required>*</Required>
                        </Label>
                        <Input
                          type="text"
                          name={`attendee${ind + 1}Email`}
                          onChange={handleChange}
                          required
                        />
                        {formErrors[email] && (
                          <Error>{formErrors[email]}</Error>
                        )}
                      </InputGroup>
                      <InputGroup>
                        <Label>
                          Job Title<Required>*</Required>
                        </Label>
                        <Input
                          type="text"
                          name={`attendee${ind + 1}JobTitle`}
                          onChange={handleChange}
                          required
                        />
                        {formErrors[jobTitle] && (
                          <Error>{formErrors[jobTitle]}</Error>
                        )}
                      </InputGroup>
                      <InputGroup>
                        <Label>
                          Phone<Required>*</Required>
                        </Label>
                        <Input
                          type="text"
                          name={`attendee${ind + 1}Phone`}
                          onChange={handleChange}
                          required
                        />
                        {formErrors[phone] && (
                          <Error>{formErrors[phone]}</Error>
                        )}
                      </InputGroup>
                    </div>
                  </div>
                );
              })}
          </FormCard2>
        </ContentWrapper2>
      </PageWrapper2>
      <Footer />
    </>
  );
};

export default Checkout;
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  background: #f2f6f7;
`;
const PageWrapper2 = styled.div`
  display: flex;
  /* grid-template-columns: 1fr; */
  padding: 0rem 0;
  padding-bottom: 3rem;
  background: #f2f6f7;
  align-items: center;
  justify-content: center;
  margin-top: -2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0 1rem;
  }
`;
const ContentWrapper2 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: 1200px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0 1rem;
  }
`;

const FormCard = styled.div`
  width: 60%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  padding: 8px 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 95%;
    padding: 1rem;
  }
`;
const FormCard2 = styled.div`
  width: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  padding: 7px 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 95%;
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 2rem;
  font-family: "Raleway";

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Form = styled.form`
  text-align: left;
  font-family: "Raleway";
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 10px;
  font-family: "Raleway";

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const InputGroup = styled.div`
  flex: 1;
  margin-bottom: 10px;
  font-family: "Raleway";
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  font-family: "Raleway";

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Required = styled.span`
  color: red;
  font-family: "Raleway";
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Raleway";
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 9px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Raleway";
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const Actions = styled.div`
  margin-top: 20px;
  font-family: "Raleway";
`;

const ButtonSubmit = styled.button`
  width: 85%;
  margin: 25px auto;
  border-radius: 2rem;
  display: block;
  background-color: #0b0a36;
  color: white;
  text-transform: uppercase;
  border: none;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  padding: 19px 40px 17px;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
    background-color: #408a78;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 30px;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  font-family: "Raleway";
`;

const CouponSection = styled.div`
  margin-top: 20px;
  font-family: "Raleway";
  position: relative;
`;

const CouponInput = styled.input`
  padding: 10px;
  width: 200px;
  font-family: "Raleway";
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }
`;

const ApplyButton = styled.button`
  padding: 10px 20px;
  background-color: #0b0b0b;
  color: white;
  border: none;
  font-family: "Raleway";
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 0;
  }
`;

const PaymentSection = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 40px;
  font-family: "Raleway";

  @media (max-width: 768px) {
    margin: 20px 0;
  }
`;

const PaymentOptions = styled.div`
  display: flex;
  gap: 30px;
  font-family: "Raleway";

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  font-family: "Raleway";
`;

const RadioInput = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #0b0b0b;
  background-color: #fff;
  transition: all 0.3s ease;
  position: relative;
  margin-right: 10px;
  outline: none;
  font-family: "Raleway", sans-serif;

  &:checked {
    background-color: #0b0b0b;
    border-color: #0b0b0b;
  }

  &:checked::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    border-color: #0b0b0b;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(105, 90, 224, 0.3);
  }
`;

const PaymentLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  font-family: "Raleway";
`;

const CartHighlight = styled.div`
  width: 40%;
  background: white;
  padding: 20px;
  border-radius: 10px;
  height: fit-content;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  font-family: "Raleway";

  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem;
  }
`;

const AppliedCoupon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 15px 10px;
  margin-top: 10px;
  border-radius: 5px;
  font-family: "Raleway";
`;

const CartTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
  font-family: "Raleway";

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: "Raleway";
`;

const CartItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.5rem 0;
  font-family: "Raleway";
`;

const TotalRow = styled.div`
  display: flex;
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
  gap: 0.5rem;
  font-family: "Raleway";

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TotalLabel = styled.p`
  font-size: 24px;
  font-weight: 500;
  font-family: "Raleway";

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const TotalValue = styled.p`
  font-size: 24px;
  font-family: "Raleway";

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const CartItemName = styled.span`
  font-size: 16px;
  font-weight: 500;
  font-family: "Raleway";
`;
const CartItemDetails = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  font-family: "Raleway";
`;

const SellingOption = styled.span`
  font-size: 15px;
  font-family: "Raleway";
`;

const CartItemPrice = styled.span`
  font-size: 16px;
  font-family: "Raleway";
  font-weight: bold;
`;

const EmptyCartMessage = styled.div`
  font-size: 18px;
  color: #e74c3c;
  text-align: center;
  margin-top: 20px;
  font-family: "Raleway";
`;

const CouponWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
  font-family: "Raleway";
`;

const TableWrapper = styled.div`
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  font-family: "Raleway";

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 20px 0px;
      text-align: left;
      font-size: 14px;
      color: #333;
      border-bottom: 1px solid #e0e0e0;
      font-family: "Raleway";
    }

    th {
      font-weight: 600;
      color: #4a4a4a;
      background-color: #f7f7f7;
    }

    tr:hover td {
      background-color: #f8f8f8;
    }

    tr:last-child td {
      border-bottom: none;
    }
  }
`;

const AppliedCouponWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  font-family: "Raleway";
`;

const AppliedCouponText = styled.span`
  font-size: 14px;
  color: #333;
  font-family: "Raleway";
`;

const RemoveCouponButton = styled.button`
  background: transparent;
  border: none;
  color: #ff4d4d;
  font-size: 16px;
  cursor: pointer;
  font-family: "Raleway";
`;

const CouponInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-family: "Raleway";
`;
