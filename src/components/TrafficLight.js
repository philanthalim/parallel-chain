import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const themeOptions = {
  mobile: {
    containerMaxWidth: "xs",
    lightSize: "65px",
    lightMargin: "10px",
    lightBorderRadius: "50%",
    lightInactiveColor: "#7A7A7A",
    lightTransition: "background-color 0.3s ease-in-out",
    appBackground: "linear-gradient(to top, #09203f 0%, #537895 100%)",
    lightContainer: "#404040",
    textColor: "#FFFFFF",
  },
  desktop: {
    containerMaxWidth: "lg",
    lightSize: "100px",
    lightMargin: "20px",
    lightBorderRadius: "50%",
    lightInactiveColor: "#7A7A7A",
    lightTransition: "background-color 0.3s ease-in-out",
    appBackground: "linear-gradient(#9BD5FF 30%, #FFF 100%)",
    lightContainer: "#d9d9d9",
    textColor: "#000000",
  },
};

const TrafficLight = () => {
  const [currentLight, setCurrentLight] = useState("green");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      switch (currentLight) {
        case "red":
          setCurrentLight("green");
          setTimeout(() => setCurrentLight("yellow"), 3000); // Switch to yellow after 3000ms
          break;
        case "yellow":
          setCurrentLight("red");
          setTimeout(() => setCurrentLight("green"), 500); // Switch to green after 500ms
          break;
        case "green":
          setCurrentLight("yellow");
          setTimeout(() => setCurrentLight("red"), 4000); // Switch to red after 4000ms
          break;
        default:
          setCurrentLight("green");
      }
    }, 8000); 

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [currentLight]);

  const theme = createTheme(themeOptions[isMobile ? "mobile" : "desktop"]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: theme.appBackground,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          maxWidth={theme.containerMaxWidth}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.lightContainer,
              display: "flex",
              flexDirection: "column",
              marginTop: "5px",
              borderRadius: "20px",
              width: "25%",
              alignItems: "center",
              textShadow: "0 0 8px #000",
            }}
          >
            <Box
              className={`light ${
                currentLight === "green" ? "green" : "inactive"
              }`}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: theme.textColor,
                width: theme.lightSize,
                height: theme.lightSize,
                margin: theme.lightMargin,
                borderRadius: theme.lightBorderRadius,
                backgroundImage:
                  currentLight === "green"
                    ? "linear-gradient(#9BF824 80%)"
                    : theme.lightInactiveColor,
                transition: theme.lightTransition,
              }}
            >
              GREEN
            </Box>
            <Box
              className={`light ${
                currentLight === "yellow" ? "yellow" : "inactive"
              }`}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: theme.textColor,
                width: theme.lightSize,
                height: theme.lightSize,
                margin: theme.lightMargin,
                borderRadius: theme.lightBorderRadius,
                backgroundImage:
                  currentLight === "green"
                    ? "linear-gradient(#FFC700 80%)"
                    : theme.lightInactiveColor,
                transition: theme.lightTransition,
              }}
            >
              YELLOW
            </Box>
            <Box
              className={`light ${currentLight === "red" ? "red" : "inactive"}`}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: theme.textColor,
                width: theme.lightSize,
                height: theme.lightSize,
                margin: theme.lightMargin,
                borderRadius: theme.lightBorderRadius,
                backgroundImage:
                  currentLight === "green"
                    ? "linear-gradient(#FF176B 80%)"
                    : theme.lightInactiveColor,
                transition: theme.lightTransition,
              }}
            >
              RED
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default TrafficLight;
