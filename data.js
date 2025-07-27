const passages = [
  {
    title: "Passage 1: The History of Tea",
    text: `Tea is the most widely consumed beverage in the world after water. It originated in China over 5,000 years ago and was first used for medicinal purposes before becoming a popular drink. Today, tea is grown in many countries, and millions of people drink it daily.`,
    questions: [
      { type: "truefalse", question: "Tea is the most consumed beverage after coffee.", correct: false },
      { type: "truefalse", question: "Tea was originally used for medicine.", correct: true },
      { type: "mcq", question: "Where did tea originate?", options: ["India", "China", "Japan", "England"], correct: 1 },
      { type: "mcq", question: "Which countries produce the most tea today?", options: ["USA, Canada, UK", "India, Sri Lanka, Kenya", "China, Brazil, Russia", "France, Italy, Spain"], correct: 1 },
      { type: "fillblank", question: "Tea originated in ______.", correct: "China" },
      { type: "fillblank", question: "Tea is the most widely consumed beverage after ______.", correct: "water" },
      { type: "truefalse", question: "Tea was introduced to Europe by Asian traders.", correct: true },
      { type: "mcq", question: "Which of the following is TRUE?", options: ["Tea is older than coffee.", "Tea is only consumed in Asia.", "Tea was never used for medicine.", "Tea started in India."], correct: 0 },
      { type: "fillblank", question: "Tea culture spread through ______ routes.", correct: "trade" },
      { type: "truefalse", question: "Tea is produced only in China today.", correct: false }
    ]
  },
  {
    title: "Passage 2: Space Exploration",
    text: `Space exploration began in the 20th century with the launch of the first artificial satellite, Sputnik, in 1957. Since then, humans have landed on the Moon and sent probes to distant planets.`,
    questions: [
      { type: "truefalse", question: "Sputnik was launched by the USA.", correct: false },
      { type: "truefalse", question: "The first manned Moon landing occurred in 1969.", correct: true },
      { type: "mcq", question: "Which country launched Sputnik?", options: ["USA", "China", "Soviet Union", "Japan"], correct: 2 },
      { type: "fillblank", question: "The space race was between the USA and ______.", correct: "Soviet Union" },
      { type: "truefalse", question: "Space exploration stopped after the Moon landing.", correct: false }
    ]
  },
  {
    title: "Passage 3: The Internet Revolution",
    text: `The internet began as a US military project in the 1960s called ARPANET. It was designed to allow computers to communicate over long distances. In the 1990s, the World Wide Web made the internet accessible to the general public. Today, billions of people rely on the internet for communication, work, and entertainment.`,
    questions: [
      { type: "truefalse", question: "The internet was originally created for the military.", correct: true },
      { type: "mcq", question: "What was ARPANET?", options: ["A computer virus", "A search engine", "An early form of the internet", "A software company"], correct: 2 },
      { type: "fillblank", question: "The internet became public in the ______.", correct: "1990s" },
      { type: "truefalse", question: "Billions of people use the internet today.", correct: true }
    ]
  }
];
