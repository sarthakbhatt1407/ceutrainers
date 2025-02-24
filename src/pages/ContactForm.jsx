import React, { useEffect } from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import Footer from "../components/Footer";
import contact from "../assets/contact.png";
import { AccountCircle } from "@mui/icons-material";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  background-color: #f2f6f7;
  padding: 2rem;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem;
  border-radius: 10px;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Image = styled.img`
  width: 84%;
  border-radius: 10px;
`;

const Form = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`;

const Title = styled.h2`
  margin: 3rem 0;
  font-size: 34px;
  font-family: "Raleway", sans-serif;
  color: #0b0a36;
  font-weight: 800;
  letter-spacing: 0.07rem;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem !important;
  background-color: white;
`;

const SubmitButton = styled.button`
  width: 35%;
  margin-top: 1rem;
  border-radius: 2rem;
  display: block;
  background-color: #408a78 !important;
  color: white !important;
  text-transform: uppercase !important;
  border: none !important;
  font-family: "Raleway", sans-serif !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  padding: 19px 40px 17px !important;
  transition: 0.3s !important;

  &:hover {
    opacity: 0.9;
    background-color: #0b0a36 !important;
  }

  @media (max-width: 768px) {
    width: 100% !important;
    padding: 14px 30px !important;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;
const ContactSection = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
  margin-bottom: 3rem;
  div {
    h5 {
      font-size: 24px;
      color: #0b0a36;
    }
    div {
      display: flex;
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Raleway", Sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #3b3b4e;
  cursor: pointer;
  &:hover {
    color: #3f8978;
  }
`;

const ContactForm = () => {
  useEffect(() => {
    document.title = "Contact Us";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);
  return (
    <>
      <WebNav />
      <PagaeHeader heading={"Get in Touch"} />
      <Container>
        <FormContainer>
          <ImageContainer>
            <Image src={contact} alt="Teaching" />
          </ImageContainer>
          <Form>
            <Title>Leave your thought here</Title>
            <Row>
              <StyledTextField
                label="Your Name"
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <AccountCircle style={{ marginRight: 8, color: "#ccc" }} />
                  ),
                }}
              />
              <StyledTextField
                label="Your Email"
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <EmailIcon style={{ marginRight: 8, color: "#ccc" }} />
                  ),
                }}
              />
            </Row>
            <StyledTextField
              label="Your Message"
              fullWidth
              multiline
              rows={10}
              variant="outlined"
            />
            <SubmitButton variant="contained">SEND MESSAGE</SubmitButton>
          </Form>
        </FormContainer>
        <ContactSection>
          <div>
            <h5>Contacts</h5>
            <div>
              {" "}
              <ContactItem>
                <FaPhone color="#3F8978" /> +1 (333) 222 12 34
              </ContactItem>
              <ContactItem
                style={{
                  marginLeft: "2rem",
                }}
              >
                <FaEnvelope color="#3F8978" /> hello@edme.com
              </ContactItem>
            </div>
          </div>
          <div>
            <h5>Hour of operation</h5>
            <div>
              {" "}
              <ContactItem>Monday – Friday: 09:00 – 20:00</ContactItem>
            </div>
          </div>
          <div>
            <h5>Address</h5>
            <div>
              {" "}
              <ContactItem>
                <FaMapMarkerAlt color="#3F8978" /> 1800 Abbot Kinney Blvd. Unit
                D & E Venice
              </ContactItem>
            </div>
          </div>
        </ContactSection>
      </Container>
      <Footer />
    </>
  );
};

export default ContactForm;
