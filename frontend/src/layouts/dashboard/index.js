// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack, useScrollTrigger } from "@mui/material";

// AI CORPS Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import VuiButton from "components/VuiButton";

// AI CORPS Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// AI CORPS Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { fs } from "layouts/authentication/firebase";
import { useEffect, useState } from "react";

// import {database} from "../../layouts/authentication/firebase.js"
import { db } from "layouts/authentication/firebase";
import { onValue, ref } from "firebase/database";

import InvoiceModal from "./components/Agreement/Agreement";

function Dashboard() {

  const { gradients } = colors;
  const { cardContent } = gradients;

  const [income, setIncome] = useState(null);
  const [points, setPoints] = useState(null);
  const [expense, setExpense] = useState(null);
  const [suggestion, setSuggestion] = useState(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthIndex = new Date().getMonth();
  let monthName = monthNames[monthIndex];
  var today = new Date();
  var date = today.getDate() + monthName + today.getFullYear();
  const [info, setInfo] = useState(null);

  const rewards = doc(fs, "kshitij", "details");
  const balanceref = doc(fs, "kshitij", monthName + " Expense");
  const [linedata, setlinedata] = useState(null);

  const onSubmit = () => {
    axios.post("http://localhost:4000/forecast-spending").then((e) => {
      setlinedata(e.data);
    });
  };

  // querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
        await getDocs(
          collection(fs, "kshitij", "February Expense", "transactions")
        ).then((data1) => {
          data1.forEach((doc) => {
            data.push(doc);
          });
        });
        console.log(data);
        await axios.post("http://localhost:4000/llm", data).then((e) => {
          setSuggestion(e.data);
        });
        console.log("dasda")
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };
    fetchData();

    getDocs(
      collection(fs, "kshitij", monthName + " Expense", "transactions")
    ).then((data) => {
      setInfo(data);
    });

    getDoc(balanceref)
      .then((data) => {
        setIncome(data.data().income);
        setExpense(data.data().expense);
        setPoints(data.data().rewards);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    //  const querySnapshot = await getDocs(collection(fs, "kshitij", monthName + " Expense", "transactions"));
    //  setInfo(querySnapshot);
    const query = ref(db, "1");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        setProjects(data);
      }
    });
  }, []);

  const print123 = () => {
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = (event) => setIsOpen(false);
  const [states, setStates] = useState([]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        {Object.values(projects).map((project) => (
          <div>{project.name}</div>
        ))}
        {console.log(projects)}
      </div>
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Your Buddy Points", fontWeight: "regular" }}
                count={{ color: "success", text: points }}
                icon={{
                  color: "info",
                  component: <IoWallet size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "This month's Income" }}
                count={{ color: "white", text: income }}
                icon={{
                  color: "info",
                  component: <IoGlobe size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "This month's Expense" }}
                count={{ color: "error", text: expense }}
                icon={{
                  color: "info",
                  component: <IoDocumentText size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <VuiButton variant="contained" color="info" onClick={print123}>
                GET MONTHLY REPORT
              </VuiButton>
            </Grid>
            {/* <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid> */}
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <InvoiceModal
            showModal={isOpen}
            closeModal={closeModal}
            info={info}
            expense={expense}
            income={income}
            suggestion={suggestion}
          />
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={5}>
              <WelcomeMark />
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    mb="5px"
                  >
                    Sales Overview
                  </VuiTypography>
                  <VuiBox mt={4} mb={1}>
                    {/* <VuiButton color="info" fullWidth onClick={onSubmit}>
                    Forecast
                  </VuiButton> */}
                  </VuiBox>
                  {/* <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 20251
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox> */}
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={lineChartDataDashboard}
                      lineChartOptions={lineChartOptionsDashboard}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                    <BarChart
                      barChartData={barChartDataDashboard}
                      barChartOptions={barChartOptionsDashboard}
                    />
                  </VuiBox>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    mb="5px"
                  >
                    Active Users
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography
                      variant="button"
                      color="success"
                      fontWeight="bold"
                    >
                      (+23){" "}
                      <VuiTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px">
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <IoWallet color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Users
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        32,984
                      </VuiTypography>
                      <VuiProgress
                        value={60}
                        color="info"
                        sx={{ background: "#2D2E5F" }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <IoIosRocket color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Clicks
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        2,42M
                      </VuiTypography>
                      <VuiProgress
                        value={60}
                        color="info"
                        sx={{ background: "#2D2E5F" }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <FaShoppingCart color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Sales
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        2,400$
                      </VuiTypography>
                      <VuiProgress
                        value={60}
                        color="info"
                        sx={{ background: "#2D2E5F" }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <IoBuild color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Items
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        320
                      </VuiTypography>
                      <VuiProgress
                        value={60}
                        color="info"
                        sx={{ background: "#2D2E5F" }}
                      />
                    </Grid>
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;

