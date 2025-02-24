import React, { useEffect } from "react";
import styled from "styled-components";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import Footer from "../components/Footer";

const TermsAndConditionsArea = styled.section`
  padding: 60px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

const Col = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 15px;
`;

const TermsAndConditionsWrapper = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
`;

const TextBlock = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Subtitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
`;

const TermAndConditions = () => {
  useEffect(() => {
    document.title = "Term & Conditions";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);
  return (
    <>
      <WebNav />
      <PagaeHeader heading={"Terms and Conditions"} />
      <TermsAndConditionsArea>
        <Container>
          <Row>
            <Col>
              <TermsAndConditionsWrapper>
                <TextBlock>
                  <Title>
                    Definitions of Basic Terms, Rights and Restrictions
                  </Title>
                  <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip commodo consequat.
                  </Paragraph>
                  <Paragraph>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat.
                  </Paragraph>
                </TextBlock>
                <TextBlock>
                  <Subtitle>Basic Terms</Subtitle>
                  <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip commodo consequat aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore
                    eu fugiat nulla pariatur. Excepteur sint occaecat.
                  </Paragraph>
                </TextBlock>
                <TextBlock>
                  <Subtitle>Rights & Restrictions</Subtitle>
                  <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Paragraph>
                  <List>
                    <ListItem>
                      Members must be at least 18 years of age.
                    </ListItem>
                    <ListItem>
                      Members are granted a time-limited, non-exclusive,
                      revocable, nontransferable, and non-sublicenseable right
                      to access that portion of the online course corresponding
                      to the purchase.
                    </ListItem>
                    <ListItem>
                      The portion of the online course corresponding to the
                      purchase will be available to the Member as long as the
                      course is maintained by the Company, which will be a
                      minimum of one year after Member’s purchase.
                    </ListItem>
                    <ListItem>
                      The videos in the course are provided as a video stream
                      and are not downloadable.
                    </ListItem>
                    <ListItem>
                      By agreeing to grant such access, the Company does not
                      obligate itself to maintain the course, or to maintain it
                      in its present form.
                    </ListItem>
                  </List>
                </TextBlock>
              </TermsAndConditionsWrapper>
            </Col>
          </Row>
        </Container>
      </TermsAndConditionsArea>
      <Footer />
    </>
  );
};

export default TermAndConditions;
