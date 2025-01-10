import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col, Tag, Button } from "antd";
import {
  ClockCircleOutlined,
  AudioOutlined,
  CalendarFilled,
  CalendarOutlined,
} from "@ant-design/icons";
import { AlarmOutlined, CalendarMonthOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

const WebinarCard = (props) => {
  const [times, setTimes] = useState("");
  const convertESTtoTimeZones = (estTime) => {
    // Parse the EST time as a Date object (assuming EST input is in HH:mm:ss format)
    const [hours] = estTime.split(":").map(Number); // Get only the hours from the input time
    const estDate = new Date();
    estDate.setUTCHours(hours + 5, 0, 0, 0); // Convert EST to UTC, only using hours

    // Formatting options to get 24-hour format with only hours
    const timeFormatOptions = {
      hour: "2-digit",
      hour12: false, // 24-hour format
    };

    // Format times in all required timezones in 24-hour format (with only hours)
    const estTime24 = estDate.toLocaleTimeString("en-US", {
      ...timeFormatOptions,
      timeZone: "America/New_York",
    });

    const cstTime24 = estDate.toLocaleTimeString("en-US", {
      ...timeFormatOptions,
      timeZone: "America/Chicago",
    });

    const mstTime24 = estDate.toLocaleTimeString("en-US", {
      ...timeFormatOptions,
      timeZone: "America/Denver",
    });

    const pstTime24 = estDate.toLocaleTimeString("en-US", {
      ...timeFormatOptions,
      timeZone: "America/Los_Angeles",
    });

    // Function to add AM/PM to 24-hour time
    const addAMPM = (time24) => {
      const [hour] = time24.split(":");
      const period = hour >= 12 ? "PM" : "AM";
      return `${time24} ${period}`;
    };

    // Return the times with only hours in 24-hour format with AM/PM
    return {
      EST: addAMPM(estTime24),
      CST: addAMPM(cstTime24),
      MST: addAMPM(mstTime24),
      PST: addAMPM(pstTime24),
    };
  };

  // Example usage:
  const estTime = "13:00:00"; // EST input time
  const timeZones = convertESTtoTimeZones(estTime);

  const webinar = props.webinar;
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const resTime = convertESTtoTimeZones(webinar.time);
    setTimes(resTime);
  }, []);
  return (
    <Card
      onClick={() => {
        navigate(`/webinars/${webinar.slug}/${webinar.id}`);
      }}
      style={{
        cursor: "pointer",
        width: "400px",
        display: "flex",
        flexDirection: "column",
        height: "570px", // Set a fixed height for the card
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        fontFamily: "Raleway",
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

        {/* <Row
          justify="space-between"
          style={{
            position: "absolute",
            bottom: hovered ? 37 : -20,
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
                fontFamily: "Raleway",
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
                fontFamily: "Raleway",
              }}
            >
              {webinar.date.split(",")[0]}
            </Tag>
          </Col>
        </Row> */}
      </div>
      {/* Main Heading and Content */}
      <div
        style={{
          position: "relative",
          transition: "all 0.5s ease",
          marginTop: hovered ? "-20%" : "0", // Move the content upwards when hovered
          backgroundColor: "white",
          padding: ".5rem .7rem",
          display: "grid",
          fontFamily: "Raleway",
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
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0",
                color: "black",
                textAlign: "left",
                fontFamily: "Raleway",
                lineHeight: "34px",
              }}
            >
              {webinar.title}
            </Title>
          </Col>
        </Row>

        {/* Duration and Speaker */}
        {/* <Row
          style={{
            width: "100%",
            padding: "0 1rem",
            marginBottom: "1rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: ".5rem",
            fontFamily: "Raleway",
          }}
        >
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Raleway",
            }}
          >
            <Text
              style={{
                color: "#666",
                fontSize: "15px",
                color: "#666",
                display: "flex",
                alignItems: "center",
                fontFamily: "Raleway",
                gap: "5px",
              }}
            >
              <ClockCircleOutlined
                style={{
                  color: "#9CD161",
                  marginRight: 3,
                  transform: "scale(1.2)",
                  fontFamily: "Raleway",
                }}
              />{" "}
              Duration: {webinar.duration} Mins
            </Text>
          </Col>
          <Col>
            <Text
              style={{
                fontSize: "15px",
                color: "#666",

                color: "#666",
                display: "flex",
                alignItems: "center",
                fontFamily: "Raleway",
                gap: "5px",
              }}
            >
              <AudioOutlined
                style={{
                  color: "#9CD161",
                  marginRight: 3,
                  transform: "scale(1.2)",
                  fontFamily: "Raleway",
                }}
              />{" "}
              {webinar.speaker_name}
            </Text>
          </Col>
        </Row> */}
        <Row
          style={{
            width: "100%",
            padding: "0 1rem",
            paddingLeft: 0,
            marginBottom: "0rem",
            display: "grid",
            gridTemplateColumns: "1fr",
            fontFamily: "Raleway",
            gridGap: ".5rem",
            borderBottom: "1px solid #e9e9e9",
            paddingBottom: "1rem",
          }}
        >
          <Col style={{}}>
            <Text
              style={{
                fontSize: "15px",
                color: "#666",
                display: "flex",
                alignItems: "center",
                fontFamily: "Raleway",
                gap: "5px",
                fontWeight: "600",
              }}
            >
              <AlarmOutlined
                style={{
                  color: "#9CD161",
                  marginRight: 3,
                  transform: "scale(1.2)",
                }}
              />
              {times["EST"]} (EST) | {"  "} {times["CST"]} (CST) |{"  "}{" "}
              {times["PST"]} (PST)
            </Text>
          </Col>
        </Row>
        <Row
          style={{
            width: "100%",
            padding: "0 1rem",
            paddingLeft: 0,
            marginBottom: "1rem",
            display: "grid",
            gridTemplateColumns: "1fr",
            fontFamily: "Raleway",
            gridGap: ".5rem",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: ".5rem",
              }}
            >
              <img
                src={`https://ceuservices.com/ceuadmin/assets/images/speaker/${webinar.speaker_image}`}
                alt=""
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                }}
              />

              <h3
                style={{
                  fontSize: "1rem",
                }}
              >
                {webinar.speaker_name}
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: ".3rem",
                fontWeight: "600",
                fontSize: ".95rem",
                color: "#666",
              }}
            >
              <CalendarMonthOutlined
                style={{
                  color: "#9CD161",
                }}
              />
              {webinar.date.split(",")[0].split(" ")[0].slice(0, 3)}{" "}
              {webinar.date.split(",")[0].split(" ")[1]}
            </div>
            {/* <div>hi</div> */}
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
              fontFamily: "Raleway",
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
