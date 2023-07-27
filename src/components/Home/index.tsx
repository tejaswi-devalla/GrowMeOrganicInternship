import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { brown } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import "./index.css";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: brown[500],
    },
  },
});

export default function Home() {
  const [error, setError] = useState("");
  const [isValid, setValid] = useState(false);

  const isValidEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const result: boolean = emailRegex.test(email);
    return result;
  };

  const isPhoneNumberValid = (number: string): boolean => {
    const phoneNumberRegex: RegExp =
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const result: boolean = phoneNumberRegex.test(number);
    return result;
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if (!isValidEmail(email) || email === "") {
      setError("ex: abc@gmail.com");
      setValid(true);
    } else {
      setError("");
      setValid(false);
    }
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isPhoneNumberValid(event.target.value) || event.target.value === "") {
      setError("Enter 10 numbers");
      setValid(true);
    } else {
      setError("");
      setValid(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const phoneNumber = data.get("number");
    if (isValid || name === "" || email === "" || phoneNumber === "") {
      setError("Enter Respective Details");
      setValid(true);
    } else {
      setError("");
      setValid(false);
      const newData = {
        name,
        email,
        phoneNumber,
      };
      localStorage.setItem("userDetails", JSON.stringify(newData));
      navigate("/data");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      navigate("/data");
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://st.depositphotos.com/8521256/54909/v/600/depositphotos_549093500-stock-video-glitch-the-word-welcome-icon.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "dark"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(event) => {
                  event.target.value === ""
                    ? `${(setError("Enter Name"), setValid(true))}`
                    : setValid(false);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="number"
                label="Phone Number"
                type="tel"
                id="number"
                autoComplete="number"
                onChange={(event) => handlePhoneNumberChange(event)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleEmailChange}
              />
              {isValid ? <p className="error">{error}</p> : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
