import React, { useState } from "react";
import { Card, Typography, Row, Col, Tag, Button } from "antd";
import { ClockCircleOutlined, AudioOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const WebinarCard = (props) => {
  const webinar = props.webinar;

  const [hovered, setHovered] = useState(false);

  return (
    <Card
      style={{
        width: "370px",
        display: "flex",
        flexDirection: "column",
        height: "400px", // Set a fixed height for the card
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        // transition: "transform .5s ease, box-shadow 0.5s ease",
        // transform: hovered ? "scale(1.05)" : "scale(1)",
        position: "relative", // Position relative to apply absolute positioning to content
        // backgroundColor: "#F7F5F1",
      }}
      bodyStyle={{ padding: "0rem 0rem" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-aos="fade-up"
    >
      {/* Image Container */}
      <div
        style={{
          width: "100%",
          height: "170px",
          background: `url(https://ceuservices.com/${webinar.thumbnail_url})`,
          backgroundSize: "cover", // Change to 'contain'
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        {/* Time and Date Overlay */}
        <Row
          justify="space-between"
          style={{
            position: "absolute",
            bottom: hovered ? 12 : -20,
            left: 0,
            right: 0,
            padding: "8px",
            zIndex: 1000,
            transition: "all 0.5s ease",
          }}
        >
          <Col>
            <Tag
              icon={<ClockCircleOutlined />}
              color="green"
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "12px",
              }}
            >
              {webinar.time}
            </Tag>
          </Col>
          <Col>
            <Tag
              color="red"
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "12px",
              }}
            >
              {webinar.date.split(",")[0]}
            </Tag>
          </Col>
        </Row>
      </div>
      {/* Main Heading and Content */}
      <div
        style={{
          position: "relative", // Make the content overlap the image
          transition: "all 0.5s ease",
          marginTop: hovered ? "-10%" : "0", // Move the content upwards when hovered
          backgroundColor: hovered ? "white" : "white",
          padding: ".5rem .7rem",
          height: "65%",
          // backgroundColor: "red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        {/* Main Heading */}
        <Row style={{ margin: "1rem 0" }}>
          <Col span={24}>
            <Title
              level={4}
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                margin: "0",
                color: "#0056b3",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              {webinar.title}
            </Title>
          </Col>
        </Row>

        {/* Duration and Speaker */}
        <Row justify="space-between" align="middle">
          <Col>
            <Text
              style={{
                fontSize: "13px",
                color: "#666",
              }}
            >
              <ClockCircleOutlined /> Duration: {webinar.duration} Mins
            </Text>
          </Col>
          <Col>
            <Text
              style={{
                fontSize: "13px",
                color: "#666",
              }}
            >
              <AudioOutlined /> Margie Faulk
            </Text>
          </Col>
        </Row>
        {/* Learn More Button on Hover */}
        <div
          style={{
            display: hovered ? "flex" : "none", // Show button only on hover
          }}
        >
          <Button type="primary" shape="round" size="large">
            Learn More
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WebinarCard;
