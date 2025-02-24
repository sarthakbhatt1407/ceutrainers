import React, { useEffect } from "react";
import styled from "styled-components";
import WebNav from "../components/Navbars/WebNav";
import PagaeHeader from "../components/PagaeHeader";
import Footer from "../components/Footer";

const RefundPolicyArea = styled.section`
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

const RefundPolicyWrapper = styled.div`
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

const RefundPolicy = () => {
  useEffect(() => {
    document.title = "RefundPolicy";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <WebNav />
      <PagaeHeader heading={"Refund Policy"} />
      <RefundPolicyArea>
        <Container>
          <Row>
            <Col>
              <RefundPolicyWrapper>
                <TextBlock>
                  <Title>Refund Policy</Title>
                  <Paragraph>
                    Thank you for purchasing online training courses from CEU
                    Trainers. We strive hard to provide you the best and most
                    rewarding experience while you discover information, assess,
                    and purchase our online webinars.
                  </Paragraph>
                  <Paragraph>
                    Customers are always a priority for CEU Trainers. We wish to
                    serve to the best of our capabilities through our webinar
                    programs. Our money refund policy is one very important part
                    of the commitment towards our customers.
                  </Paragraph>
                  <Paragraph>
                    Please browse through our policy here to understand how our
                    refund system works before applying for a refund
                    requisition.
                  </Paragraph>
                </TextBlock>
                <TextBlock>
                  <Subtitle>
                    What is Cancellations, Substitutions and Refund policy?
                  </Subtitle>
                  <Subtitle>Cancellation</Subtitle>
                  <List>
                    <ListItem>
                      Cancellations won’t be accepted if done less than 48 hours
                      (2 Working Days) prior to the start time of the webinar.
                      Only Conference cancellations received 48 hours (2 Working
                      Days) prior to the start time of the webinar are
                      refundable.
                    </ListItem>
                    <ListItem>
                      If you are not able to attend for any reason, please
                      notify us at the earliest prior to the event.
                    </ListItem>
                  </List>
                  <Subtitle>Substitution</Subtitle>
                  <List>
                    <ListItem>
                      Substitutions are permitted and should be informed prior
                      to 48 hours before the start of the registered webinar.
                    </ListItem>
                    <ListItem>
                      Substitutions mean either substituting a webinar for
                      another webinar scheduled at a different day or
                      substituting the attendee in place of the registered
                      participant.
                    </ListItem>
                    <ListItem>
                      Substitution/Cancellations will not be accepted in the
                      following cases:
                      <List>
                        <ListItem>If the attendee missed the session</ListItem>
                        <ListItem>
                          If the attendee didn’t receive the webinar
                          instructions due to e-mail bounce/firewall protection.
                          If there is a system incompatibility issue at the
                          attendee side
                        </ListItem>
                      </List>
                    </ListItem>
                  </List>
                </TextBlock>
                <TextBlock>
                  <Subtitle>
                    REFUND POLICY FOR LIVE WEBINAR/ON-DEMAND/PRE-RECORDED
                  </Subtitle>
                  <Paragraph>
                    CEU Trainers is committed to refund the full order amount of
                    live webinars / On-Demand / Pre Recorded Webinars if
                    canceled with the given criteria:
                  </Paragraph>
                  <List>
                    <ListItem>
                      Cancelled by CEU Trainers due to unforeseen
                      circumstances/technical problems.
                    </ListItem>
                    <ListItem>
                      Registrants unable to attend a training session should
                      notify us at least 24 hours prior to the training date in
                      order to receive a refund or credit. Notice of
                      cancellation must be in writing via email. To cancel via
                      email, send the cancellation notice to:
                      support@ceutrainers.com
                    </ListItem>
                    <ListItem>
                      At the same time, we are not liable for any refund in the
                      following scenarios:
                      <List>
                        <ListItem>
                          If there is any technical problem at the
                          customer/attendee’s end.
                        </ListItem>
                        <ListItem>
                          If a customer/attendee has left the webinar in the
                          middle of it/after logging in.
                        </ListItem>
                        <ListItem>
                          If a customer is not satisfied with the presentation
                          or audio content of the webinar.
                        </ListItem>
                        <ListItem>
                          In case of LIVE if you have not received the webinar
                          login credentials you need to inform CEU Trainers at
                          least 3 hours prior to the scheduled time of the
                          webinar, no refund will be made after the webinar has
                          been conducted.
                        </ListItem>
                        <ListItem>
                          In the case of a refund due to being unable to listen
                          to audible or problem with the visual part or any
                          other technical problem during the live
                          webinar/on-demand/pre-recorded webinar, then it will
                          be properly scrutinized on the basis of time and
                          duration provided by the customer/attendee. Once, we
                          have reconciled and are satisfied, we would initiate
                          the process of your refund.
                        </ListItem>
                      </List>
                    </ListItem>
                  </List>
                </TextBlock>
                <TextBlock>
                  <Subtitle>
                    REFUND POLICY FOR e-TRANSCRIPT/ANY DIGITAL DOWNLOAD
                  </Subtitle>
                  <List>
                    <ListItem>
                      CEU Trainers will issue a 100% money refund, in case of
                      cancellation of e-Transcript before the webinar
                      commencement date.
                    </ListItem>
                    <ListItem>
                      No refund is possible in the case of e-Transcript or any
                      other digital downloads.
                    </ListItem>
                  </List>
                </TextBlock>
                <TextBlock>
                  <Subtitle>REFUND POLICY FOR COMBO OFFER</Subtitle>
                  <Paragraph>
                    This Policy is applicable if the customer has bought any
                    combination of Live Webinar, On-demand, e-Transcript, or any
                    digital download.
                  </Paragraph>
                  <List>
                    <ListItem>
                      If you are making a part cancellation of the order, For
                      e.g. – If you have bought a Combo offer of Live Webinar +
                      e-Transcript and decided to cancel e-Transcript from it.
                      You would be charged according to the original price of
                      the Live Webinar and the rest of the amount will be
                      refunded back to your account.
                    </ListItem>
                    <ListItem>
                      Policy for Live/On-demand/Pre-recorded Webinar and
                      e-Transcript/Any digital download stands along with this
                      combo offer policy.
                    </ListItem>
                    <ListItem>
                      Please get in touch with our Customer Care for more
                      details on the refund process for combo offers.
                    </ListItem>
                  </List>
                </TextBlock>
                <TextBlock>
                  <Subtitle>Disclaimer</Subtitle>
                  <Paragraph>
                    CEU Trainers webinars are subject to customer demand. CEU
                    Trainers reserves the right to cancel/postpone webinars on
                    any subject at short notice at no loss or liability where,
                    in its absolute sole discretion, it deems this necessary and
                    binding.
                  </Paragraph>
                </TextBlock>
                <TextBlock>
                  <Subtitle>Questions or Complaints</Subtitle>
                  <Paragraph>
                    For any general questions about your registration, refund
                    status (if any), and complaints regarding your refund
                    details, please contact support@ceutrainers.com to sort out
                    your queries.
                  </Paragraph>
                </TextBlock>
              </RefundPolicyWrapper>
            </Col>
          </Row>
        </Container>
      </RefundPolicyArea>
      <Footer />
    </>
  );
};

export default RefundPolicy;
