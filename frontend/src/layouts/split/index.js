import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// PIP INSTALL Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// PIP INSTALL Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import axios from "axios";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";



function Split() {

    const [amt, setAmt] = useState(0);
    const [email, setEmail] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            amt: amt
        };

        try {
            console.log(data);
            const response = await axios.post('http://localhost:4000/splitbillemail', data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }



    return (
        (<CoverLayout
            title="Split Bills with Ease"
            color="white"
            description="Enter your friend's email seperated by a single comma (,)"
            premotto="INSPIRED BY THE PRESENT"
            motto="A treat for your friends and a treat for your pocket"
            image={bgSignIn}
        >
            <VuiBox component="form" role="form" onSubmit={onSubmit}>

                <VuiBox mb={2}>
                    <VuiBox mb={1} ml={0.5}>
                        <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                            E-mails
                        </VuiTypography>
                    </VuiBox>
                    <GradientBorder
                        minWidth="100%"
                        borderRadius={borders.borderRadius.lg}
                        padding="1px"
                        backgroundImage={radialGradient(
                            palette.gradients.borderLight.main,
                            palette.gradients.borderLight.state,
                            palette.gradients.borderLight.angle
                        )}
                    >
                        <VuiInput
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='text'
                            placeholder="Education Expenditure"
                            sx={({ typography: { size } }) => ({
                                fontSize: size.sm,
                            })}
                        />
                    </GradientBorder>
                </VuiBox>
                <VuiBox mb={2}>
                    <VuiBox mb={1} ml={0.5}>
                        <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                            Bill Amt
                        </VuiTypography>
                    </VuiBox>
                    <GradientBorder
                        minWidth="100%"
                        borderRadius={borders.borderRadius.lg}
                        padding="1px"
                        backgroundImage={radialGradient(
                            palette.gradients.borderLight.main,
                            palette.gradients.borderLight.state,
                            palette.gradients.borderLight.angle
                        )}
                    >
                        <VuiInput
                            value={amt}
                            onChange={(e) => setAmt(e.target.valueAsNumber)}
                            type="number"
                            placeholder="Your monthly bills"
                            sx={({ typography: { size } }) => ({
                                fontSize: size.sm,
                            })}
                        />
                    </GradientBorder>
                </VuiBox>


                <VuiBox mt={4} mb={1}>
                    <VuiButton color="info" fullWidth type='submit'>
                        SPLIT THE BILL
                    </VuiButton>
                </VuiBox>
                {(amt > 0) ?
                    (<VuiBox mb={1} ml={0.5}>
                        <VuiTypography component="label" variant="button" color="success" fontWeight="medium">
                            "You have split  monthly to spend on miscellaneous things"
                        </VuiTypography>
                    </VuiBox>) :
                    (<VuiBox mb={1} ml={0.5}>
                        <VuiTypography component="label" variant="button" color="error" fontWeight="medium">

                        </VuiTypography>
                    </VuiBox>)}
            </VuiBox>
        </CoverLayout>)

    );
}

export default Split;
