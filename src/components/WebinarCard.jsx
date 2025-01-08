import React, { useState } from "react";
import { Card, Typography, Row, Col, Tag, Button } from "antd";
import { ClockCircleOutlined, AudioOutlined } from "@ant-design/icons";
import { CalendarMonthOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

const WebinarCard = (props) => {
  const webinar = props.webinar;
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onClick={() => {
        navigate(`/webinars/${webinar.id}`);
      }}
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        height: "540px", // Set a fixed height for the card
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
          height: "220px",
          position: "relative",
        }}
      >
        <img
          src={`https://ceuservices.com/${webinar.thumbnail_url}`}
          alt="Webinar Thumbnail"
          style={{
            width: "100%",
            height: "100%", // Maintain aspect ratio
          }}
        />

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
          position: "relative",
          transition: "all 0.5s ease",
          marginTop: hovered ? "-10%" : "0", // Move the content upwards when hovered
          backgroundColor: "white",
          padding: ".5rem .7rem",
          display: "grid",
          gridTemplateColumns: "1fr", // 1fr for each column
          gap: "1rem",
        }}
      >
        {/* Main Heading */}
        <Row style={{ margin: "1rem 0" }}>
          <Col span={24}>
            <Title
              level={4}
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                margin: "0",
                color: "black",
                textAlign: "left",
                lineHeight: 1.5,
              }}
            >
              {webinar.title}
            </Title>
          </Col>
        </Row>

        {/* Duration and Speaker */}
        <Row
          justify="space-between"
          align="middle"
          style={{
            width: "90%",
            padding: "0 1rem",
            marginBottom: "1rem",
            flexDirection: "row",
            justifyContent: "start",
            gap: "2rem",
          }}
        >
          <Col
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: "16px",
                color: "#666",
                fontSize: "16px",
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <ClockCircleOutlined
                style={{
                  color: "#9CD161",
                  marginRight: 3,
                  transform: "scale(1.2)",
                }}
              />{" "}
              Duration: {webinar.duration} Mins
            </Text>
          </Col>
          <Col>
            <Text
              style={{
                fontSize: "16px",
                color: "#666",
                fontSize: "16px",
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <AudioOutlined
                style={{
                  color: "#9CD161",
                  marginRight: 3,
                  transform: "scale(1.2)",
                }}
              />{" "}
              Margie Faulk
            </Text>
          </Col>
        </Row>
        <Row
          justify="space-between"
          // align="middle"
          style={{
            width: "90%",
            padding: "0 1rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            gap: "2rem",
          }}
        >
          <Col style={{}}>
            <Text
              style={{
                fontSize: "16px",
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <CalendarMonthOutlined
                style={{
                  color: "#9CD161",
                  marginRight: 3,
                  transform: "scale(1.2)",
                }}
              />{" "}
              {webinar.date}
            </Text>
          </Col>
          <Col>
            <Text
              style={{
                fontSize: "16px",
                color: "#666",
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <AudioOutlined
                style={{
                  color: "#9CD161",
                  marginRight: 3,
                  transform: "scale(1.2)",
                }}
              />{" "}
              {webinar.time}
            </Text>
          </Col>
        </Row>

        {/* Learn More Button on Hover */}
        <div
          style={{
            display: hovered ? "flex" : "none", // Show button only on hover
          }}
        >
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{
              backgroundColor: "#9CD161",
              borderColor: "#9CD161",
              fontWeight: "bold",
            }}
          >
            Learn More
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WebinarCard;
