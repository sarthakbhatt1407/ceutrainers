import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  TextField,
  Button,
  Paper,
  Rating,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import { useNavigate } from "react-router";
const SubmitButton = styled(Button)`
  width: 35%;
  margin: auto;
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

const StyledAccordion = styled(Accordion)({
  margin: "16px 0",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
  backgroundColor: "#ffffff",

  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "16px 0",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  },
});

const StyledAccordionSummary = styled(AccordionSummary)({
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#ffffff",
  },
  "& .MuiAccordionSummary-content": {
    margin: "16px 0",
  },
});

const SearchWrapper = styled(Box)({
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: "#ffffff",
  padding: "24px 0",
});

const FAQPage = () => {
  useEffect(() => {
    document.title = "FAQ";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPanel, setExpandedPanel] = useState(false);
  const navigate = useNavigate();

  const faqData = [
    {
      question: "What is a Webinar and how it works?",
      answer:
        "A Webinar is simply a web-based seminar, where a participant can interact directly with the presenter and can ask questions during Q&A.",
    },
    {
      question: "How do I access the live webinar?",
      answer:
        "Register for a Webinar. Then login to your user account. Go to Orders > Webinar. You will see a “How to Join” button. Click on that, and you will be taken to Event Details page, where you can see “How to Join” tab.\n\nYou will also receive an e-mail on the day or the previous day of the webinar which contain “Join Link” for the webinar. Once you click on the the link, you will automatically redirected to the Live Event when it starts.",
    },
    {
      question: "Can I ask questions during webinar?",
      answer:
        "Yes, you can ask Question directly to the speaker over the call or via chat in the Q&A Session after the webinar.",
    },
    {
      question: "Do I need any special software to attend a webinar?",
      answer:
        "You will be provided a link to access the webinar, this will install a very small software just once. You don’t have to download it again in future.",
    },
    {
      question:
        "I am registering for someone else, but I need the Invoice on my name, how should I go about this?",
      answer:
        "While signing up, please use your details on Sign Up page and once you complete your order, you can login to your account and add actual attendee details against your order. Or you can provide the details of that person in the “Order Note” section of the Checkout Page.",
    },
    {
      question: "Where can I put the Actual Attendee details?",
      answer:
        "You can add the actual attendee detail from your CEU Trainers account after logging in.",
    },
    {
      question:
        "I haven’t received the Invoice of my purchase, how can I get one?",
      answer:
        "You can download the Invoice by Logging into your account. You can find that under order history.\n\nOr mail us at support@ceutrainers.com and we will assist you.",
    },
    {
      question: "I have a discount coupon, where can I apply those?",
      answer: "You can apply those coupons on checkout page.",
    },
    {
      question: "How can I register for a group?",
      answer:
        "While registering online for any course you need to choose the quantity of the webinar. You can also change the quantity in your shopping cart. On next page, please use the billing details for creating account and once your registration is completed, you can add all attendee details from your account.",
    },
    {
      question: "Can I share the webinar login details with my colleague?",
      answer:
        "No, the login details are unique to each paid registrant. You need to buy additional registration for each of the other participants.",
    },
    {
      question:
        "I have not received an email with instructions on accessing the webinar. What should I do?",
      answer:
        "Login to your user account. Go to Orders > Webinar. You will see a “How to Join” button. Click on that, and you will be taken to Event Details page, where you can see “How to Join” tab.\n\nAlso, please check your junk mail or spam folder for support@ceutrainers.com or customercare@gotowebinar.com. If you are still unable to find it, contact our Customer Service at (702)-605-0095 between 8:00 AM-4:30 PM EST Monday-Friday, for a new one.",
    },
    {
      question: "What is Recording and how will I receive this?",
      answer:
        "If you opt for On Demand/Recording, we will share a link of the respective webinar which you have chosen within 2-3 business days after the Live webinar day on your registered e-mail address. You can download it and access it anytime, anywhere. The link that is shared over the e-mail as well as the downloaded file(recording) are valid for lifetime.\n\nIf link doesn’t work or you have lost it or mail got deleted, you can ask for it by mailing us at support@ceutrainers.com and we will provide you again. This facility can be availed within 180 Days of conducting the LIVE webinar.",
    },
    {
      question: "Can I share the recordings with my colleague?",
      answer:
        "No. You need to buy additional recordings for each of the other participants.",
    },
    {
      question: "What is On-Demand and how can I access that?",
      answer:
        "On Demand webinars are the online programs that allow you to earn CEUs at your convenience. You can watch it multiple times as it comes with no expiry.\n\nOnce you have purchased a On-demand video, login to user account. Go to Orders->On-demand tab. You will find a Watch Now button. Click Watch Now button to watch the video.",
    },
    {
      question:
        "Can I still receive Continuing Education Credits if I view the webinar recording or On Demand instead of the live presentation?",
      answer:
        "Continuing Education Credits can be availed for On-Demand option but not for the recordings.",
    },
    {
      question: "Is there a deadline to register for a webinar?",
      answer:
        "You may register online up to 5-Minutes prior to the live webinar.",
    },
    {
      question: "Can I print the Presentation Materials and Handouts?",
      answer: "Yes, you can.",
    },
    {
      question: "What are the Packages?",
      answer:
        "We have created some packages of previously held webinars from similar interest group. By going for this option, you can save almost 50% or even more every time as compare to the individual products.",
    },
    {
      question: "Can I create my own package?",
      answer:
        "Yes, you can. Please select the webinars and let us know by mailing us at support@ceutrainers.com. Or you can submit your requirement on the “Contact Us” page. We will adjust the price accordingly for you and get back to you at the earliest.",
    },
  ];

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const filterFAQs = useCallback(() => {
    return faqData.filter(
      (qa) =>
        qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const [helpfulRatings, setHelpfulRatings] = useState({});

  const handleHelpfulRating = (questionId, value) => {
    setHelpfulRatings((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const filteredFAQs = filterFAQs();

  return (
    <>
      {" "}
      <WebNav />
      <PagaeHeader heading={"FAQ"} />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, fontWeight: "bold" }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Find answers to common questions about our products and services
        </Typography>

        <SearchWrapper>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <FaSearch style={{ marginRight: 8 }} />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "white",
              },
            }}
          />
        </SearchWrapper>

        <Box sx={{ mt: 4 }}>
          {filteredFAQs.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center", borderRadius: "12px" }}>
              <Typography variant="h6">No matching questions found</Typography>
              <Typography color="textSecondary">
                Try adjusting your search terms
              </Typography>
            </Paper>
          ) : (
            filteredFAQs.map((qa, index) => (
              <StyledAccordion
                key={index}
                expanded={expandedPanel === `faq-${index}`}
                onChange={handleAccordionChange(`faq-${index}`)}
              >
                <StyledAccordionSummary expandIcon={<FaChevronDown />}>
                  <Typography sx={{ fontWeight: "500" }}>
                    {qa.question}
                  </Typography>
                </StyledAccordionSummary>
                <AccordionDetails sx={{ p: 3 }}>
                  <Typography paragraph sx={{ fontSize: "1.1rem" }}>
                    {qa.answer}
                  </Typography>
                </AccordionDetails>
              </StyledAccordion>
            ))
          )}
        </Box>

        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Still have questions?
          </Typography>
          <SubmitButton
            onClick={() => {
              navigate("/get-in-touch");
            }}
          >
            Contact Support
          </SubmitButton>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default FAQPage;
