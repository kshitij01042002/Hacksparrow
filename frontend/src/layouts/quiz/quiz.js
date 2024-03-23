
// import React from 'react';// Bootstrap Paradox Dashboard React components
// import VuiBox from "components/VuiBox";
// import VuiTypography from "components/VuiTypography";
// import Card from "@mui/material/Card";
// // Bootstrap Paradox Dashboard React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";


// export default function Quiz() {

//     const cardStyle = {
//         height: '100%', // Ensure the Card takes full height
//       };
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
    

//     <VuiBox py={3}>
//     <VuiBox mb={3}>

//     </VuiBox>
//     <Card style={cardStyle}>
//       <VuiBox display="flex" justifyContent="space-between" alignItems="center">
//         <VuiTypography variant="lg" color="white">
//           Test your Financial Knowledge
//         </VuiTypography>
//       </VuiBox>
//       <VuiBox
//         lg={{
//           "& th": {
//             borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
//               `${borderWidth[1]} solid ${grey[700]}`,
//           },
//           "& .MuiTableRow-root:not(:last-child)": {
//             "& td": {
//               borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
//                 `${borderWidth[1]} solid ${grey[700]}`,
//             },
//           },
//         }}
//       >
//     <div className="quiz-container">
//       <div className="sidebar">
//         {/* Sidebar content */}
//       </div>
//       <div className="iframe-container">
//         <iframe
//           src="http://localhost:3001"
//           width="100%"
//           height="100%"
//           title="Quiz iframe"
//         ></iframe>
//       </div>
//       {/* Other components to be overlapped */}
//       <div className="overlay-component">
//         {/* Overlapping component content */}
//       </div>
//     </div>
//       </VuiBox>
//     </Card>
//   </VuiBox>
//     </DashboardLayout>
//   );
// }
import React from 'react';
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export default function Quiz() {
    const cardStyle = {
        height: '80vh', // Adjust the height of the Card
        display: 'flex',
        justifyContent: 'space-between',
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <VuiBox py={3}>
                <VuiBox mb={3}></VuiBox>
                <Card style={cardStyle}>
                    {/* <VuiBox display="flex" justifyContent="space-between" alignItems="center">
                        <VuiTypography variant="lg" color="white">
                            Test your Financial Knowledge
                        </VuiTypography>
                    </VuiBox> */}
                    <VuiBox
                        sx={{
                            "& th": {
                                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                                    `${borderWidth[1]} solid ${grey[700]}`,
                            },
                            "& .MuiTableRow-root:not(:last-child)": {
                                "& td": {
                                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                                        `${borderWidth[1]} solid ${grey[700]}`,
                                },
                            },
                        }}
                        style={{ height: '100%' }}
                    >
                        <div className="quiz-container" style={{ height: '100%' }}>
                            <div className="sidebar">
                                {/* Sidebar content */}
                            </div>
                            <div className="iframe-container" style={{ height: '100%' }}>
                                <iframe
                                    src="http://localhost:3001"
                                    width="100%"
                                    height="100%"
                                    title="Quiz iframe"
                                ></iframe>
                            </div>
                            {/* Other components to be overlapped */}
                            <div className="overlay-component">
                                {/* Overlapping component content */}
                            </div>
                        </div>
                    </VuiBox>
                </Card>
            </VuiBox>
        </DashboardLayout>
    );
}
