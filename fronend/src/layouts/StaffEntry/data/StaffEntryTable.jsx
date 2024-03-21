import React from 'react'
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import DataTable from 'examples/Tables/DataTable';
export default function StaffEntryTable({staffData}) {
    const handleDelete = async (ID) => {
        try {
          const response = await fetch(`http://localhost:5001/staffDelete/${ID}`);
          const result = await response.json();
          staffData();
        } catch (error) {
          console.error("Error fetching  awareness program:", error);
        }
      };
    const columns=[
        { Header: "Name", accessor: "name", width: "45%", align: "left" },
        { Header: "Staff ID", accessor: "id", align: "left" },
        { Header: "email", accessor: "email", align: "center" },
        { Header: "Domain", accessor: "domain", align: "center" },
        { Header: "DOJ", accessor: "doj", align: "center" },
        { Header: "Action", accessor: "action", align: "center" },
      ]
    
      
      const rows = staffData.map(data => ({
        name: data.staff_name,
        id:data.staff_id,
        email: data.staff_email, // Add logic to calculate difficulty if neede
        domain: data.Domain,
        doj: data.DOJ, // Add logic to calculate creation date if needed
        action: (
          <MDBox>
            <MDButton  onClick={() => handleDelete(data.staff_id)} color="error">
              Delete
            </MDButton>
          </MDBox>
        ),
      }));
  return (
    <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
  )
}
