/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";
import {useState} from 'react';
import MDButton from "components/MDButton";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import EditIcon from '@mui/icons-material/Edit';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
//modal
//modal
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function ProfileInfoCard({ title, description, info, social, action, shadow }) {
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;
  const [open, setOpen] = useState(false);
  const modalOpen = () => {
    console.log("hello")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <MDBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </MDBox>
  ));

  return (
    
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography component={Link} to={action.route} variant="body2" color="secondary">
            <MDButton color="info" onClick={modalOpen} startIcon={<EditIcon />}>
            </MDButton>
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          {renderItems}
        </MDBox>
      </MDBox>
      <Dialog maxWidth="lg" open={open} onClose={handleClose}>
                <DialogTitle>Modal Title</DialogTitle>
                <DialogContent>
                        <Box
                                component="form"
                                sx={{
                                  '& .MuiTextField-root': { m: 2, width: '100ch' },
                                }}
                                noValidate
                                autoComplete="off"
                              >
                            <div>
                                <TextField
                                  required
                                  id="outlined-required"
                                  label="Name"
                                  placeholder="Name"
                                /><br></br>
                                <TextField
                                  required
                                  id="outlined-required"
                                  label="Staff id or Roll Number"
                                  placeholder="12345678"
                                />
                                <TextField
                                  required
                                  id="outlined-required"
                                  label="Email"
                                  placeholder="name@gmail.com"
                                />
                                <TextField
                                  required
                                  id="outlined-required"
                                  label="Domain"
                                  placeholder="name@gmail.com"
                                />
                                <TextField
                                  required
                                  id="outlined-required"
                                  label="Area of Interest"
                                  placeholder="name@gmail.com"
                                />
                                <TextField
                                  required
                                  id="outlined-required"
                                  label="hello"
                                  placeholder="name@gmail.com"
                                />
                                  <TextField
                                  required
                                  id="outlined-required"
                                  label="Phone Number"
                                  placeholder="12345678"
                                />
                                <TextField
                                  required
                                  id="outlined-required"
                                  label="Date of Birth"
                                  placeholder="1/1/2000"
                                />
                                <TextField
                                  required
                                  id="outlined-required"
                                  label="Date of Join "
                                  placeholder="1/1/2000"
                                />
                            </div>
                          </Box>
                </DialogContent>
                <DialogActions>
                  <MDButton onClick={handleClose} color="primary">
                    Cancel
                  </MDButton>
                  <MDButton onClick={handleClose} color="primary" autoFocus>
                    Save
                  </MDButton>
                </DialogActions>
              </Dialog>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
