
// @mui material components
import Card from "@mui/material/Card";

// AI CORPS Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// AI CORPS Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

import { db } from "layouts/authentication/firebase";
import { onValue, ref } from "firebase/database";

import { useState, useEffect } from "react";
import axios from 'axios';

import { makeStyles } from "@mui/styles";
import { fs } from "layouts/authentication/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";


import MicIcon from '@mui/icons-material/Mic';

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 1000,
    margin: "0 auto",
  },
  chatMessages: {
    minHeight: 200,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    overflowY: "auto",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  inputField: {
    flex: 1,
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
  },
  sendButton: {
    cursor: "pointer",
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: 0,
    "&:hover": {
      background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
    },
  },
  voiceButton: {
    cursor: "pointer",
    background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.dark} 90%)`,
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: 0,
    marginLeft: theme.spacing(2),
    "&:hover": {
      background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.main} 90%)`,
    },
  },
}));

const ChatPage = () => {
  const classes = useStyles();
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', text: inputMessage },
        // { type: 'bot', text: handleVoiceOutput(getBotResponse(inputMessage)) },
        getBotResponse(inputMessage)
      ]);

      try {
        const response = await axios.post('http://localhost:4000/get_bot_response', {
          userMessage: inputMessage,
        });
        const botResponse = response.data.botResponse;
        console.log(botResponse);
        const [number, medicine, medicalAssign] = botResponse.split(',').map(item => item.trim());
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let monthIndex = (new Date().getMonth());
        let monthName = monthNames[monthIndex];

        const currentDate = new Date();

        // Get the components of the date
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(currentDate.getDate()).padStart(2, '0');

        // Get the components of the time
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        // Create the simple date and time format
        const simpleDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        const transactionCollectionRef = setDoc(doc(fs, "kshitij", monthName + " Expense", "transactions/t" + simpleDateTime), {
          amount: number,
          datetime: simpleDateTime,
          option: medicalAssign,
          product: medicine

        });
        console.log("transaction saved")


        //
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', text: botResponse },
        ]);
      } catch (error) {
        console.error('Error fetching bot response:', error);
      }
      setInputMessage('');
      // Add voice output for bot's response
      // handleVoiceOutput(getBotResponse(inputMessage));
    }
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = async (event) => {
      const userVoiceInput = event.results[0][0].transcript;
      getBotResponse(userVoiceInput)
      // const h = await handleVoiceOutput(getBotResponse());
      try {
        const response = await axios.post('http://localhost:4000/get_bot_response', {
          userMessage: userVoiceInput,
        });
        const botResponse = response.data.botResponse;
        console.log(botResponse);
        const [number, medicine, medicalAssign] = botResponse.split(',').map(item => item.trim());
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let monthIndex = (new Date().getMonth());
        let monthName = monthNames[monthIndex];

        const currentDate = new Date();

        // Get the components of the date
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(currentDate.getDate()).padStart(2, '0');

        // Get the components of the time
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        // Create the simple date and time format
        const simpleDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        const transactionCollectionRef = setDoc(doc(fs, "kshitij", monthName + " Expense", "transactions/t" + simpleDateTime), {
          amount: number,
          datetime: simpleDateTime,
          option: medicalAssign,
          product: medicine

        });
        console.log("transaction saved")


        //
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { type: 'user', text: userVoiceInput },
          // { type: 'bot', text: h },
        ]);
      } catch (error) {
        console.error('Error fetching bot response:', error);
      }



    };

    recognition.onend = () => {
      recognition.stop();
    };
  };

  const handleVoiceOutput = (text) => {
    let hh = String(text);
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(hh);

    synth.speak(utterance);
  };


  const getBotResponse = async (userInput) => {
    // Implement your chatbot logic here
    // For simplicity, use a predefined response


    const response = await axios.post('http://localhost:4000/get_bot_response', {
      userMessage: userInput,
    });

    const botResponse = response.data.botResponse;
    console.log(typeof botResponse);

    handleVoiceOutput(botResponse);
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { type: 'bot', text: botResponse },
    ]);




    // Check for specific user inputs and provide corresponding responses

  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3} className={classes.chatContainer}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center" padding={2}>
            <VuiTypography variant="lg" color="white">
              Chat with the Stylish ChatBot
            </VuiTypography>
          </VuiBox>
          <VuiBox className={classes.chatMessages}>
            {/* Render chat messages */}
            {chatMessages.map((message, index) => (
              <div key={index} style={{ marginBottom: 10, color: message.type === 'user' ? '#2196F3' : '#4CAF50' }}>
                {message.type === 'user' ? 'You: ' : ' '}
                {message.text}
              </div>
            ))}
          </VuiBox>
          {/* Input area */}
          <VuiBox className={classes.inputContainer} padding={2}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className={classes.inputField}
            />
            <button className={classes.sendButton} onClick={handleSendMessage}>
              Send
            </button>
            <button className={classes.sendButton} onClick={handleVoiceInput}>
              <MicIcon />
            </button>
          </VuiBox>
        </Card>
      </VuiBox>
    </DashboardLayout>
  );
};

export default ChatPage;
