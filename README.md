\# 7-Day Fitness \& Diet Planner



A full-stack web application that generates personalized 7-day fitness and diet plans.



\## Overview



The Fitness \& Diet Planner is designed to help users kickstart their health journey with a customized weekly plan. Users can input their personal information such as weight, height, age, and select a fitness goal and diet type. The application then generates a comprehensive plan including a workout schedule and a daily meal plan. The generated plan can be downloaded as a PDF for convenience.



\## Features



&nbsp; - \*\*Personalized Plan Generation\*\*: Get a custom 7-day workout and diet plan based on your individual data and goals.

&nbsp; - \*\*Multiple Fitness Goals\*\*: Choose from "Weight Loss," "Weight Gain," or "Stay Fit".

&nbsp; - \*\*Diverse Diet Options\*\*: Select from "Vegetarian," "Non-Vegetarian," or "Vegan" diet types.

&nbsp; - \*\*Plan Retrieval\*\*: Existing users can retrieve their most recently generated plan by entering their email address.

&nbsp; - \*\*BMI Calculation\*\*: The app calculates and displays your Body Mass Index (BMI) as part of the plan.

&nbsp; - \*\*PDF Download\*\*: Download your complete fitness and diet plan as a PDF document for offline access.



\## Technology Stack



\### Frontend



&nbsp; - \*\*HTML5\*\*: For the structure of the web page.

&nbsp; - \*\*CSS3\*\*: For styling, including a modern, responsive design.

&nbsp; - \*\*JavaScript\*\*: For all interactive functionality, form handling, and API communication.

&nbsp; - \*\*jsPDF\*\*: A client-side library to generate the PDF download.

&nbsp; - \*\*html2canvas\*\*: A library used to render HTML elements into a canvas, assisting with PDF generation.



\### Backend



&nbsp; - \*\*Node.js\*\*: The runtime environment for the server.

&nbsp; - \*\*Express.js\*\*: A web framework for building the REST API endpoints.

&nbsp; - \*\*CORS\*\*: A middleware to enable cross-origin resource sharing.

&nbsp; - \*\*File System (fs)\*\*: Node.js module to read from and write to the local `database.json` file.



\## How to Use



1\.  \*\*Start a New Plan\*\*: Fill out the form with your personal details, goal, and diet type.

2\.  \*\*Generate Plan\*\*: Click "Generate My 7-Day Plan" to receive your personalized plan.

3\.  \*\*View Plan\*\*: The workout and diet plans will be displayed on the page. The diet plan is organized by day in a tabbed interface.

4\.  \*\*Download Plan\*\*: Click "Download as PDF" to save a copy of your plan.

5\.  \*\*Find an Existing Plan\*\*: If you've used the planner before, click "Find My Existing Plan" and enter your email address to retrieve your most recent plan.



\## How to Run Locally



1\.  Clone the repository:

&nbsp;   ```

&nbsp;   git clone \[repository-url]

&nbsp;   ```

2\.  Navigate to the project directory:

&nbsp;   ```

&nbsp;   cd \[project-folder]

&nbsp;   ```

3\.  Install the dependencies:

&nbsp;   ```

&nbsp;   npm install

&nbsp;   ```

4\.  Start the server:

&nbsp;   ```

&nbsp;   npm start

&nbsp;   ```

5\.  Open your browser and navigate to `http://localhost:4000` to view the application.



\
Screenshots


\<img src="group-fitness.jpg" \>
\<img src="fitness-planner-homepage.jpg" \>


