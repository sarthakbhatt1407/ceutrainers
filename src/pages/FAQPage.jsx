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
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all unused items in original packaging.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order through your account dashboard or using the tracking number sent to your email.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs vary by location.",
    },
    {
      question: "What warranty do your products come with?",
      answer: "All products come with a standard 1-year manufacturer warranty.",
    },
    {
      question: "Are your products eco-friendly?",
      answer:
        "Yes, we prioritize sustainable materials and eco-friendly packaging.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers.",
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
