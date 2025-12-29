CipherSQLStudio (I used as Deep_SQL)
Deep_SQL is a browser-based SQL practice platform designed to help students master database queries in a live environment. It bridges the gap between theoretical SQL and real-world execution by providing a secure sandbox for practicing assignments.

* Technology Choices
We selected this stack to provide a professional, high-performance learning experience:

Monaco Editor: We use the same engine that powers VS Code to give students a professional-grade SQL editing experience (autocompletion, syntax highlighting).

PostgreSQL (The Sandbox): Unlike simulators, we execute queries against a real Postgres instance to ensure students learn actual syntax nuances.

Node.js & Express: Handles the heavy lifting of secure query execution and communicates with the AI for hint generation.

MongoDB (The Library): Used for storing assignment metadata, schemas, and user progress due to its flexible document structure.

React.js & SCSS: Built with a mobile-first approach to ensure students can practice even on the go.


=> Setup
=> Backend

cd backend  
npm install  
npm run dev 

npm install express cors dotenv pg mongoose
npm install openai
npm install @google/generative-ai
npm install groq-sdk

=> Frontend

cd frontend  
npx create-react-app@latest .
npm install  
npm start 


=> Tech Stack

* React.js
* Node.js + Express
* PostgreSQL (Sandbox execution)
* MongoDB (Assignments)
* Monaco Editor
* SCSS (Mobile-first)

 

=> Features

* Assignment listing
* SQL editor with Monaco
* Real-time query execution
* Intelligent hints via LLM
* Secure SELECT-only execution





1. Prerequisites
Ensure you have Node.js, PostgreSQL, and MongoDB installed on your system.

2. Installation
Bash

* Clone the repository
git clone https://github.com/DEEPSHIKHA102/CipherSchools.git
cd CipherSchools

* Install Backend dependencies
cd backend && npm install

* Install Frontend dependencies
cd ../frontend && npm install


3. Environment Variables
Create a .env file in the backend folder. Use the following template (do not share your real keys!):

Code snippet

PORT=5000
MONGO_URI=your_mongodb_connection_string
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=sql_practice
PG_PASSWORD=your_password
PG_PORT=5432
AI_API_KEY=your_llm_api_key_here




4. Running the App
Open two terminals:

Backend: cd backend && npm run dev

Frontend: cd frontend && npm start




=> Data Flow
User -> React -> Express -> PostgreSQL -> Express -> React -> UI