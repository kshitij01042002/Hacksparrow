import { createServer } from "miragejs";
import axios from "axios";
import { v4 as uuid } from "uuid";
createServer(
  {
    routes() {
      this.namespace = "api";

      this.get("/quiz", () => {
        return {
          quiz: [
            {
              id: 1,
              categoryName: "Stock Investment",
              categoryImg: "https://assetpoint.netlify.app/images/stock.jpg",
              allQuiz: [
                {
                  id: uuid(),
                  quizTitle: "Basics of Stock Market",
                  quizData: [
                    {
                      id: uuid(),
                      question: "What is the full form LTCG?",
                      options: [
                        {
                          option: "Long Term Capital Gain",
                          isCorrect: true,
                        },
                        { option: "Legal Term Capital Gain", isCorrect: false },
                        { option: "Long Term Capital Gross", isCorrect: false },
                      ],
                    },
                    {
                      id: uuid(),
                      question: "DeMat account is used to store?",
                      options: [
                        { option: "Money", isCorrect: false },
                        { option: "Shares", isCorrect: true },
                        { option: "Digital Gold", isCorrect: false },
                      ],
                    },
                    {
                      id: uuid(),
                      question: "BSE was established before NSE?",
                      options: [
                        { option: "True", isCorrect: true },
                        { option: "False", isCorrect: false },
                      ],
                    },
                    {
                      id: uuid(),
                      question: "Return on investment in shares is called?",
                      options: [
                        { option: "Capital", isCorrect: false },
                        { option: "Dividend", isCorrect: true },
                        { option: "Remainder", isCorrect: false },
                      ],
                    },
                    {
                      id: uuid(),
                      question:
                        "Free shares issued by the company to the investors is called?",
                      options: [
                        { option: "Bonds", isCorrect: false },
                        { option: "Derivatives", isCorrect: false },
                        { option: "Bonus", isCorrect: true },
                      ],
                    },
                  ],
                },
                {
                  id: uuid(),
                  quizTitle: "Advance Stock Market",
                  quizData: [
                    {
                      id: uuid(),
                      question: "What is Face Value?",
                      options: [
                        {
                          option: "Original Price of the share",
                          isCorrect: true,
                        },
                        {
                          option: "Current Price of the share",
                          isCorrect: false,
                        },
                        {
                          option: "Future Price of the share",
                          isCorrect: false,
                        },
                      ],
                    },
                    {
                      id: uuid(),
                      question: "What Top Line means in Financial Analysis?",
                      options: [
                        { option: "Profit", isCorrect: false },
                        { option: "Turnover", isCorrect: true },
                        { option: "Loss", isCorrect: false },
                      ],
                    },
                    {
                      id: uuid(),
                      question: "What Bottom Line means in Financial Analysis?",
                      options: [
                        { option: "Loss", isCorrect: false },
                        { option: "Profit after tax", isCorrect: true },
                        { option: "Loss after tax", isCorrect: false },
                      ],
                    },
                    {
                      id: uuid(),
                      question: "What is Stock Split?",
                      options: [
                        {
                          option: "Spliting current share price",
                          isCorrect: false,
                        },
                        { option: "Spliting company profit", isCorrect: false },
                        { option: "Spliting face value", isCorrect: true },
                      ],
                    },
                    {
                      id: uuid(),
                      question: "Dividend is tax free upto?",
                      options: [
                        { option: "1 Lac", isCorrect: false },
                        { option: "5 Lac", isCorrect: false },
                        { option: "10 Lac", isCorrect: true },
                      ],
                    },
                  ],
                },
                {
                  id: uuid(),
                  quizTitle: "Basics of Finance",
                  quizData: [
                    {
                      id: uuid(),
                      question: "What is Asset?",
                      options: [
                        { option: "debt you owe", isCorrect: false },
                        {
                          option: "that can be converted into cash",
                          isCorrect: true,
                        },
                        { option: "fees you need to pay", isCorrect: false },
                      ],
                    },
                    {
                      id: uuid(),
                      question:
                        "Which is correct Fundamental accounting equation?",
                      options: [
                        {
                          option: "Asset = Liability + Equity",
                          isCorrect: true,
                        },
                        {
                          option: "Equity = Asset + Liability",
                          isCorrect: false,
                        },
                        {
                          option: "Liability = Asset + Equity",
                          isCorrect: false,
                        },
                      ],
                    },
                    {
                      id: uuid(),
                      question: "What is Balance Sheet?",
                      options: [
                        { option: "Employee details", isCorrect: false },
                        { option: "Debt of company", isCorrect: false },
                        {
                          option: "Financial statement of company",
                          isCorrect: true,
                        },
                      ],
                    },
                    {
                      id: uuid(),
                      question: "What is Net worth?",
                      options: [
                        { option: "Asset - Liability", isCorrect: true },
                        { option: "Asset + Liability", isCorrect: false },
                        { option: "NOTA", isCorrect: false },
                      ],
                    },
                    {
                      id: uuid(),
                      question: "Which of the following have high Liquidity?",
                      options: [
                        { option: "Real Estate", isCorrect: false },
                        { option: "Stock/Bond", isCorrect: true },
                        { option: "Vehicle", isCorrect: false },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 2,
              categoryName: "Evaluate Your Financial Sentiment",
              categoryImg: "https://assetpoint.netlify.app/images/stock.jpg",
              allQuiz: [
                {
                  id: uuid(),
                  quizTitle: "Financial Sentiment Analysis",
                  quizData: [
                    {
                      id: uuid(),
                      question: "How often do you make impulse purchases?",
                      options: [
                        {
                          option: " Rarely or Never",
                          isCorrect: true,
                        },
                        { option: "Occasionally ", isCorrect: true },
                        { option: " Frequently", isCorrect: false },
                      ],
                    },
                    {
                      id: uuid(),
                      question:
                        "When faced with a sale or discount, what is your typical reaction?",
                      options: [
                        {
                          option:
                            "I carefully evaluate if I need the item before making a purchase",
                          isCorrect: true,
                        },
                        {
                          option:
                            "ShaI consider buying even if I don't need it, but try to control myselfres",
                          isCorrect: true,
                        },
                        {
                          option:
                            "I often succumb to the temptation and make the purchase impulsively Gold",
                          isCorrect: false,
                        },
                      ],
                    },
                    {
                      id: uuid(),
                      question: "How do you feel after making a big purchase?",
                      options: [
                        { option: "Satisfied and content", isCorrect: true },
                        {
                          option: "Slightly guilty or anxious",
                          isCorrect: true,
                        },
                        { option: "Regretful or stressed", isCorrect: false },
                      ],
                    },
                    {
                      id: uuid(),
                      question:
                        "How do you plan for major expenses, such as vacations or home renovations?",
                      options: [
                        {
                          option:
                            "I create a detailed budget and save up for expenses in advance",
                          isCorrect: true,
                        },
                        {
                          option:
                            "I plan somewhat but may rely on credit or loans for certain expenses",
                          isCorrect: true,
                        },
                        {
                          option:
                            "I tend to overspend and worry about the financial consequences later",
                          isCorrect: false,
                        },
                      ],
                    },
                    {
                      id: uuid(),
                      question:
                        "When making a purchase decision, what influences you the most?",
                      options: [
                        {
                          option:
                            "Rational considerations such as utility and necessity",
                          isCorrect: true,
                        },
                        {
                          option: "Social influences or peer pressure ",
                          isCorrect: true,
                        },
                        {
                          option: "Emotional appeal or instant gratification ",
                          isCorrect: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        };
      });

      this.passthrough('http://localhost:4000/quiz');
    },
  },
  { timing: 4000 }
);
