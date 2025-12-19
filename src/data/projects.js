const projects = [
  {
    id: 1,
    title: "Flight Tracker",
    description: `
      A production-focused full-stack application for tracking real-time flight data.
    Built with a React frontend and a Node/Express API, featuring authenticated users,
    dynamic search and filtering, and persistent flight data stored in PostgreSQL.
    `,
    image: "/assets/Flight_tracker_desktop.png", // <-- use this path
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "TailwindCSS",
      "Amadeus API",
      "JWT",
      "Render",
      "Netlify"
    ],
    liveUrl: "https://flight-tracker-50qa.onrender.com",
    repoUrl: "https://github.com/jonathandew-dev/flight-tracker",
  },
  {
    id: 2,
    title: "AI Budget Advisor",
    description: `
      A full-stack personal finance application that tracks income and expenses
    while providing AI-assisted budgeting insights. Built with Flask and Python,
    featuring dynamic data visualizations, progress tracking, and theming support.
    `,
    image: "/assets/ai_budget_advisor_desktop.png",
    techStack: [
      "Python",
      "Flask",
      "SQLAlchemy",
      "SQLite",
      "HTML",
      "CSS",
      "JavaScript",
      "Jinja2",
      "Pytest"
    ],
    liveUrl: null,
    repoUrl: "https://github.com/jonathandew-dev/budget_ai_advisor",
  },
  {
    id: 3,
    title: "Expense Tracker",
    description: `
     A full-stack expense tracking application designed to manage and visualize
    daily spending. Built with Flask and SQLite, featuring categorized expenses,
    dashboard summaries, and interactive charts.
    `,
    image: "/assets/Expense_tracker_desktop.png",
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "Flask",
      "SQLite",
      "Plotly.js"
    ],
    liveUrl: null,
    repoUrl: "https://github.com/jonathandew-dev/expense-tracker",
  },
];

export default projects;
