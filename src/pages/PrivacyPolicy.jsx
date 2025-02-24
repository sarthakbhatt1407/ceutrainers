import React, { useEffect } from "react";
import styled from "styled-components";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import Footer from "../components/Footer";

const PrivacyPolicyArea = styled.section`
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

const PrivacyPolicyWrapper = styled.div`
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

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);
  return (
    <>
      <WebNav />
      <PagaeHeader heading={"Privacy Policy"} />
      <PrivacyPolicyArea>
        <Container>
          <Row>
            <Col>
              <PrivacyPolicyWrapper>
                <TextBlock>
                  <Title>Privacy Policy</Title>
                  <Paragraph>
                    This privacy notice for CEU Trainers (“Company,” “we,” “us,”
                    or “our”), describes how and why we might collect, store,
                    use, and/or share (“process”) your information when you use
                    our services (“Services”), such as when you:
                  </Paragraph>
                  <List>
                    <ListItem>
                      Visit our website at{" "}
                      <a href="https://ceu-trainers.com/">
                        https://ceu-trainers.com
                      </a>
                      , or any website of ours that links to this privacy notice
                    </ListItem>
                    <ListItem>
                      Engage with us in other related ways, including any sales,
                      marketing, or events
                    </ListItem>
                  </List>
                  <Paragraph>
                    Questions or concerns? Reading this privacy notice will help
                    you understand your privacy rights and choices. If you do
                    not agree with our policies and practices, please do not use
                    our Services. If you still have any questions or concerns,
                    please contact us at – support@ceutrainers.com
                  </Paragraph>
                </TextBlock>
                <TextBlock>
                  <Subtitle>SUMMARY OF KEY POINTS</Subtitle>
                  <Paragraph>
                    This summary provides key points from our privacy notice,
                    but you can find out more details about any of these topics
                    by clicking the link following each key point or by using
                    our table of contents below to find the section you are
                    looking for. You can also click here to go directly to our
                    table of contents.
                  </Paragraph>
                  <Paragraph>
                    <b>What personal information do we process?</b> When you
                    visit, use, or navigate our Services, we may process
                    personal information depending on how you interact with CEU
                    Trainers and the Services, the choices you make, and the
                    products and features you use.
                  </Paragraph>
                  <Paragraph>
                    <b>Do we process any sensitive personal information?</b> We
                    do not process sensitive personal information.
                  </Paragraph>
                  <Paragraph>
                    <b>Do we receive any information from third parties?</b> We
                    do not receive any information from third parties.
                  </Paragraph>
                  <Paragraph>
                    <b>How do we process your information?</b> We process your
                    information to provide, improve, and administer our
                    Services, communicate with you, for security and fraud
                    prevention, and to comply with law. We may also process your
                    information for other purposes with your consent. We process
                    your information only when we have a valid legal reason to
                    do so.
                  </Paragraph>
                  <Paragraph>
                    <b>
                      In what situations and with which parties do we share
                      personal information?
                    </b>{" "}
                    We may share information in specific situations and with
                    specific third parties.
                  </Paragraph>
                  <Paragraph>
                    <b>How do we keep your information safe?</b> We have
                    organizational and technical processes and procedures in
                    place to protect your personal information. However, no
                    electronic transmission over the internet or information
                    storage technology can be guaranteed to be 100% secure, so
                    we cannot promise or guarantee that hackers, cybercriminals,
                    or other unauthorized third parties will not be able to
                    defeat our security and improperly collect, access, steal,
                    or modify your information.
                  </Paragraph>
                  <Paragraph>
                    <b>What are your rights?</b> Depending on where you are
                    located geographically, the applicable privacy law may mean
                    you have certain rights regarding your personal information.
                  </Paragraph>
                  <Paragraph>
                    <b>How do you exercise your rights?</b> The easiest way to
                    exercise your rights is by filling out our data subject
                    request form available here or by contacting us. We will
                    consider and act upon any request in accordance with
                    applicable data protection laws.
                  </Paragraph>
                </TextBlock>
                <TextBlock>
                  <Paragraph>
                    Want to learn more about what CEU Trainers does with any
                    information we collect? Continue reading to review the
                    notice in full.
                  </Paragraph>
                  <Subtitle>TABLE OF CONTENTS</Subtitle>
                  <List>
                    <ListItem>WHAT INFORMATION DO WE COLLECT?</ListItem>
                    <ListItem>HOW DO WE PROCESS YOUR INFORMATION?</ListItem>
                    <ListItem>
                      WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                    </ListItem>
                    <ListItem>
                      DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                    </ListItem>
                    <ListItem>HOW LONG DO WE KEEP YOUR INFORMATION?</ListItem>
                    <ListItem>HOW DO WE KEEP YOUR INFORMATION SAFE?</ListItem>
                    <ListItem>DO WE COLLECT INFORMATION FROM MINORS?</ListItem>
                    <ListItem>WHAT ARE YOUR PRIVACY RIGHTS?</ListItem>
                    <ListItem>CONTROLS FOR DO-NOT-TRACK FEATURES</ListItem>
                    <ListItem>
                      DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                    </ListItem>
                    <ListItem>
                      DO VIRGINIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                    </ListItem>
                    <ListItem>DO WE MAKE UPDATES TO THIS NOTICE?</ListItem>
                    <ListItem>
                      HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                    </ListItem>
                    <ListItem>
                      HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                      FROM YOU?
                    </ListItem>
                  </List>
                </TextBlock>
              </PrivacyPolicyWrapper>
            </Col>
          </Row>
        </Container>
      </PrivacyPolicyArea>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
