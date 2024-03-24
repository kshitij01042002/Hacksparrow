import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// AI CORPS Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// AI CORPS Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import axios from "axios";

// Images
import bgSignIn from "assets/images/signInImage.png";
import { fs } from "layouts/authentication/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";

import NavbarDarkExample from "components/NavbarDarkExample";
import OCR from "layouts/ocr/OCR";

function Plan() {
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
  const [income, setIncome] = useState("");
  const balanceref = doc(fs, "kshitij", monthName + " Expense");
  const [message, setMessage] = useState("");
  const [risk, setRisk] = useState("");
  const [investments, setInvestments] = useState("");
  const [time, setTime] = useState();
  const [financialGoal, setFinancialGoal] = useState("");

  function onSubmit() {
    axios
      .post("http://localhost:4000/create_budget", { 
        income: income,
        risk: risk,
        investments: investments,
        time: time,
        goal: financialGoal,
      })
      .then((e) => {
        console.log(e);
        setMessage(e.data.generated_text);
      });
  }

  const handlerisk = (option) => {
    setRisk(option.value);
  };
  const handleInvestments = (option) => {
    setInvestments(option.value);
  };

  const riskOptions = [
    { label: "Low", value: "bills" },
    { label: "Moderate", value: "education" },
    { label: "High", value: "grocery" },
  ];
  const investmentOptions = [
    { label: "Stocks", value: "stocks" },
    { label: "Real estate", value: "realestate" },
    { label: "Bonds", value: "bonds" },
    { label: "Crypto", value: "crypto" },
  ];

  useEffect(() => {
    getDoc(balanceref)
      .then((data) => {
        setIncome(data.data().income);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  });

  return (
    <>
      <CoverLayout
        title="Now Generate an ideal financial plan for you within seconds!!!"
        color="white"
        description="Your Financial Plan"
        premotto="DON'T SPEND MUCH"
        image={bgSignIn}
      >
        {/* <div style={{margin: "10px"}}>
        <NavbarDarkExample options={riskOptions} onSelect={handlerisk} label="Risk Tolerance"/>
        </div> */}

        {/* <NavbarDarkExample
          options={investmentOptions}
          onSelect={handleInvestments}
          label="Investment Preference"
        /> */}
      
        {/* <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography
              component="label"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Enter the time period in months...
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              type="number"
              placeholder="Enter the Time Period in months..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox> */}

<VuiBox mb={2}>
  <VuiBox mb={1} ml={0.5}>
    <VuiTypography
      component="label"
      variant="button"
      color="white"
      fontWeight="medium"
    >
      Enter your Goal...
    </VuiTypography>
  </VuiBox>
  <GradientBorder
    minWidth="100%"
    padding="1px"
    borderRadius={borders.borderRadius.lg}
    backgroundImage={radialGradient(
      palette.gradients.borderLight.main,
      palette.gradients.borderLight.state,
      palette.gradients.borderLight.angle
    )}
  >
    <VuiInput
      value={financialGoal}
      onChange={(e) => setFinancialGoal(e.target.value)}
      required
      type="text"
      placeholder="Enter your Goal..."
      sx={({ typography: { size } }) => ({
        fontSize: size.sm,
      })}
    />
  </GradientBorder>
</VuiBox>
<VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography
              component="label"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Enter the time period in months...
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              type="number"
              placeholder="Enter the Time Period in months..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </VuiBox>

        <VuiTypography
         color="text"
         fontWeight="bold"
         textAlign="center"
         mb="14px"
         sx={({ typography: { size } }) => ({ fontSize: size.lg })}
       >
         {message && (
           <div style={{ maxWidth: '1200px' }}>
             <p style={{ textAlign: 'left' }}>
               <strong>Financial Plan:</strong>
             </p>
             <ul style={{ paddingLeft: '20px', textAlign: 'left' }}>
               {message.split('\n').map((line, index) => (
                 <li key={index}>{line.replace(/\*/g, '')}</li>
               ))}
             </ul>
           </div>
         )}
        </VuiTypography>
      
       


        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth onClick={onSubmit}>
            GENERATE
          </VuiButton>
        </VuiBox>
      </CoverLayout>
    </>
  );
}
export default Plan;

