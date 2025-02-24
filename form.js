import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  Paper,
} from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Phone } from "@mui/icons-material";

const fields = [
  { name: "firstName", label: "First Name", xs: 6 },
  { name: "lastName", label: "Last Name", xs: 6 },
  { name: "email", label: "Email", xs: 12, type: "email" },
  {
    name: "phone",
    label: "Phone Number",
    xs: 12,
    type: "tel",
    InputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <Phone />
        </InputAdornment>
      ),
    },
  },
  { name: "address", label: "Address", xs: 12 },
  { name: "city", label: "City", xs: 4 },
  { name: "region", label: "Region", xs: 4 },
  { name: "postalCode", label: "Postal Code", xs: 4 },
];

const AppointmentForm = () => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), { date: null, time: null })
  );

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleDateChange = (date) => setFormData((prev) => ({ ...prev, date }));
  const handleTimeChange = (time) => setFormData((prev) => ({ ...prev, time }));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Business Appointment Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {fields.map(({ name, label, xs, type, InputProps }) => (
                <Grid item xs={xs} key={name}>
                  <TextField
                    label={label}
                    name={name}
                    type={type || "text"}
                    fullWidth
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    InputProps={InputProps || {}}
                  />
                </Grid>
              ))}
              <Grid item xs={6}>
                <DatePicker
                  label="Date"
                  value={formData.date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  label="Time"
                  value={formData.time}
                  onChange={handleTimeChange}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default AppointmentForm;
