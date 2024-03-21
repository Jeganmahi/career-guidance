import React from 'react'
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import DataTable from 'examples/Tables/DataTable';
export default function StudentEntryTable({studentData}) {
    const columns=[
        { Header: "Name", accessor: "name", width: "45%", align: "left" },
        { Header: "Staff ID", accessor: "id", align: "left" },
        { Header: "email", accessor: "email", align: "center" },
        { Header: "Domain", accessor: "domain", align: "center" },
        { Header: "Action", accessor: "action", align: "center" },
      ]
    
      
      const rows = studentData.map(data => ({
        name: data.name,
        id:data.regno,
        email: data.department, 
        year:data.year,// Add logic to calculate difficulty if neede
        domain: data.Domain,
        action: (
          <MDBox>
            <MDButton  onClick={() => handleDelete(data.regno)} color="error">
              Delete
            </MDButton>
          </MDBox>
        ),
      }));
      const handleDelete = async (ID) => {
        try {
          const response = await fetch(`http://localhost:5001/studentDelete/${ID}`);
          const result = await response.json();
        } catch (error) {
          console.error("Error fetching  awareness program:", error);
        }
      };
  return (
    <MDBox>
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
