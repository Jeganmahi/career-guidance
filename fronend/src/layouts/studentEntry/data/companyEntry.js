/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import MDButton from "components/MDButton";

export default function CompanyEntry() {
  const ComName = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={5} lineHeight={1}>
        <MDTypography display="block" variant="caption" color="text" fontWeight="bold">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
  

  const Role = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="bold">
        {title}
      </MDTypography>
    </MDBox>
  );
  const ComNam = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="bold">
        {title}
      </MDTypography>
    </MDBox>
  );

  return {
// Inside the component where the error occurserform the operation that's causing the error
// For example:


    columns: [
    
      { Header: "Company Name", accessor: "comNam", align: "center" },
      { Header: "Role", accessor: "Role", align: "center" },

      { Header: "Eligibilty", accessor: "Eligibility", align: "center" },
      { Header: "Required Skills", accessor: "Skills", align: "center" },
      {Header:"EndDate",accessor:"EndDate",align:"center"},
      { Header: "Status", accessor: "Status", align: "center" },
    ],

    rows: [
      {

        comNam: <ComNam title="TATA"/>,
        Role: <Role title="software developer"/>,
        Eligibility: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={5} lineHeight={1}>
            <MDTypography display="block" variant="caption" color="text" fontWeight="bold">
              above 60% in all
            </MDTypography>
          </MDBox>
        </MDBox>
        ),
        Skills:(
          <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={5} lineHeight={1}>
            <MDTypography display="block" variant="caption" color="text" fontWeight="bold">
              c, java
            </MDTypography>
          </MDBox>
        </MDBox>
        ),
        EndDate: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    22/2/2024
            </MDTypography>
        ),
        Status: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              open
            </MDTypography>
          ),
      },
    
    ],
  };
}
