import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState, useEffect } from "react";
import DataTable from "examples/Tables/DataTable";

// Data
import MDButton from "components/MDButton";
//modal
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
// components
import StaffEntryTable from "./data/StaffEntryTable";
function StaffEntry() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    DOJ: "",
    email: "",
    domain: "",
    department: "",
    number: "",
  });
  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await fetch(`http://localhost:5001/staffAdd`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert("success");
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };
  const Department = [
    { label: "Computer science and engineering", value: "cse" },
    { label: "Information Technology", value: "IT" },
    { label: "Artificial Intelligence and Machine Learning", value: "AIML" },
    { label: "Artificial Intelligence and Data Science", value: "AIDS" },
    { label: "Civil engineering", value: "Civil" },
    { label: "Electronics communications and Engineering", value: "ECE" },
    { label: "Electronical and Electronics Engineering", value: "EEE" },
    { label: "Mechanical Engineering", value: "MECH" },
    { label: "Computer Science and Buisness Systems", value: "CSBS" },
    { label: "Master of Buisness Administration", value: "MBA" },
    { label: "Master of Computer Administration", value: "MCA" },
  ];
  const handleDelete = async (ID) => {
    try {
      const response = await fetch(`http://localhost:5001/staffDelete/${ID}`);
      const result = await response.json();
      staffData();
    } catch (error) {
      console.error("Error fetching  awareness program:", error);
    }
  };
  const [staffData, setStaffData] = useState([]);
  useEffect(() => {
    const staffFetch = async () => {
      try {
        const response = await fetch(`http://localhost:5001/staffData`);
        const result = await response.json();
        setStaffData(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    staffFetch();
  }, [staffData]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between" // To space elements evenly
                alignItems="center" // Align items vertically
              >
                <MDTypography variant="h6" color="white">
                  Staff Info
                </MDTypography>
                <MDButton color="success" onClick={handleOpen}>
                  ADD Staff
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <StaffEntryTable staffData={staffData} />
              </MDBox>
              <Dialog maxWidth="lg" open={open} onClose={handleSubmit}>
                <DialogTitle>Staff Entry</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 2, width: "100ch" },
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
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                        <br></br>
                        <TextField
                          required
                          id="outlined-required"
                          label="Staff ID"
                          value={formData.id}
                          onChange={(e) =>
                            setFormData({ ...formData, id: e.target.value })
                          }
                        />
                        <Autocomplete
                          id="combo-box-demo"
                          options={Department}
                          sx={{ width: 300 }}
                          value={formData.department}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              department: e.target.value,
                            })
                          }
                          renderInput={(params) => (
                            <TextField {...params} label="Department" />
                          )}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="contact Number"
                          value={formData.number}
                          onChange={(e) =>
                            setFormData({ ...formData, number: e.target.value })
                          }
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="staff email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                        <TextField
                          required
                          id="outlined-required"
                          type="date"
                          label="Date of Joining"
                          value={formData.DOJ}
                          onChange={(e) =>
                            setFormData({ ...formData, DOJ: e.target.value })
                          }
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Domain name"
                          value={formData.domain}
                          onChange={(e) =>
                            setFormData({ ...formData, domain: e.target.value })
                          }
                        />
                      </div>
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <MDButton onClick={handleSubmit} color="primary" autoFocus>
                    Save
                  </MDButton>
                </DialogActions>
              </Dialog>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default StaffEntry;
