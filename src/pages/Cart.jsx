import React, { useEffect } from "react";
import styled from "styled-components";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <WebNav />
      <PagaeHeader heading={"Cart"} />
      <PageWrapper>
        <Card>
          <Title>Your Reservation</Title>
          {cartItems.length === 0 ? (
            <EmptyCartMessage>Cart is Empty</EmptyCartMessage>
          ) : (
            cartItems.map((item) => {
              return (
                <ReservationDetails key={item.courseId}>
                  <CourseTitle>{item.title}</CourseTitle>
                  <DateTime>
                    {item.date}, {item.time}
                  </DateTime>
                  <Divider />
                  <DetailsRow
                    style={{
                      marginTop: "2rem",
                    }}
                  >
                    <DetailsLabel>Selling Option</DetailsLabel>
                    <DetailsValue>{item.option}</DetailsValue>
                  </DetailsRow>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                    }}
                  >
                    <DetailsRow>
                      <DetailsLabel>Speaker</DetailsLabel>
                      <DetailsValue>{item.speaker}</DetailsValue>
                    </DetailsRow>
                    <DetailsRow>
                      <DetailsLabel>Price</DetailsLabel>
                      <DetailsValue>$ {item.price}</DetailsValue>
                    </DetailsRow>{" "}
                  </div>
                  <Divider />
                  <ButtonRemove
                    onClick={() => {
                      dispatch({ type: "removefromcart", data: item });
                    }}
                  >
                    Remove
                  </ButtonRemove>
                </ReservationDetails>
              );
            })
          )}
          {cartItems.length > 0 && (
            <>
              <TotalRow>
                <TotalLabel>Total:</TotalLabel>
                <TotalValue>
                  $ {cartItems.reduce((a, b) => a + b.price, 0)}
                </TotalValue>
              </TotalRow>
              <Actions>
                <ButtonAddMore
                  onClick={() => {
                    navigate("/webinars");
                  }}
                >
                  Add More
                </ButtonAddMore>
                <ButtonNext>Next</ButtonNext>
              </Actions>
            </>
          )}
        </Card>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default Cart;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  padding: 4rem 0;
  background: #f2f6f7;
`;

const Card = styled.div`
  width: 40%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    width: 90%; /* Make card take up most of the screen on mobile */
    padding: 40px 10px;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 550;
  margin-bottom: 20px;
  text-align: start;
  color: #3b3b4e;
  padding-left: 1.5rem;

  @media (max-width: 768px) {
    font-size: 20px; /* Reduce font size on mobile */
  }
`;

const ReservationDetails = styled.div`
  text-align: left;
  margin-bottom: 20px;
  border: 1px solid #e4e4e4;
  margin-left: 1.5rem;
  margin-right: 1.5rem;

  @media (max-width: 768px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const CourseTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
  padding-left: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const DateTime = styled.p`
  font-size: 17px;
  color: #3b3b4e;
  font-weight: 500;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
`;

const DetailsRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  padding: 0rem 1.5rem;

  @media (max-width: 768px) {
    padding: 0rem 1rem;
  }
`;

const DetailsLabel = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const DetailsValue = styled.p`
  font-size: 17px;
  color: #3b3b4e;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ButtonRemove = styled.button`
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

const ButtonAddMore = styled.button`
  width: 85%;
  margin: 0px auto;
  border-radius: 2rem;
  display: block;
  background-color: white;
  color: black;
  text-transform: uppercase;
  border: none;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  padding: 19px 40px 17px;
  transition: 0.3s;
  border: 1px solid black;
  &:hover {
    opacity: 0.9;
    background-color: #408a78;
    color: white;
    border: 1px solid #408a78;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 30px;
  }
`;

const ButtonNext = styled.button`
  width: 85%;
  margin: 0px auto;
  border-radius: 2rem;
  display: block;
  background-color: #408a78;
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
    background-color: #0b0a36;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 30px;
  }
`;

const TotalRow = styled.div`
  display: flex;
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TotalLabel = styled.p`
  margin-left: 1.5rem;
  font-size: 24px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const TotalValue = styled.p`
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const EmptyCartMessage = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #3b3b4e;
  text-align: center;
  margin-top: 2rem;
  font-style: italic;
`;
