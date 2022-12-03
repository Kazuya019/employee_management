# Advanced Employee Management System
Link to the github: [Link](https://github.com/Kazuya019/employee_management)

## Code / File Structure
1. Employee_management/src/main is where all the development occurred.
2. In main, there are two folders, server and ui, that are used to run the project.
3. These are the main main folders/files in the server folder:
  - A config folder with a JavaScript file to connect to the mysql database.
  - A routes folder with the JavaScript files to process the post and get calls from the different screens of the application and execute SQL queries.
  - An index.js file that runs to start the server and load the different routes available.
4. In the ui folder, all the development was done in the src folder which contains these main folders/files:
  - An App.js file that loads all the different Routes to webpage screens we made.
  - An index.js file that compiles and starts the development server.
  - A screens folder that contains an images folder and all the JavaScript and CSS files for each of the different webpage screens that get loaded whenever a Link is clicked.


## Required Technology
  - Node.js
  - MySQL server and MySQL Workbench
  - Visual Studio Code (IDE)
  - Web Browser (all team members used Chrome)


## Setup / Build Instructions
1. Git clone the employee_management project (or unzip the downloaded file).
  - If git clone does not work, git-lfs may have to be installed to support large files.
2. Open the project folder (employee_management) in Visual Studio Code (VSCode).
3. Open a new terminal in VSCode.
4. From the employee_management folder, go to the server folder by doing cd src/main/server
5. In the server folder, run the command ‘npm install’.
6. Open another new terminal in vscode.
7. In this terminal, go from the employee_management folder to the ui folder by doing cd src/main/ui
8. In the ui folder, run ‘npm install’.
9. Open MySQL Workbench.
10. Open the employee_tables.sql file.
11. Run the SQL commands in the file.
12. In VSCode, open the db.js file in the config folder (employee_management/src/main/server/config)
13. Check if the user, host, and password for your mysql database matches the local one where you loaded the employee tables, otherwise change it and save the changes in db.js
14. In the VSCode terminal for the server folder, run the command ‘npm start’. 
  - The terminal should output ‘running server’.
15. In the VSCode terminal for the ui folder, try to run the command ‘npm start’. 
  - For Mac users, the terminal might say ‘Permission denied’. In this case, you can type 'sudo chmod +x node_modules/.bin/react-scripts'. Run the command and it will ask you for the password which is the password you use to log in to your computer (if you have one). Type the password and press enter. Run ‘npm start’ again and it should work. 
16. The project will compile and pop up in your browser.

***Note:** 
npm install should load all the node_modules needed to run the project. However, if errors occur, here is a list of potential installations that might help. These were compiled from group member updates during development:
  - npm i react-alice-carousel
  - npm install react-icons --save
  - npm install axios
  - npm install react-calendar
  - npm install @emailjs/browser
  - npm install reactjs-popup --save
  - npm install --save moment-holiday

We mostly tested the application functionalities using the employee IDs 6 (manager) and 16 (regular employee), both with the password 'abc123#'
*


## Structure of the Application
1. The project will start on the homepage where the user can navigate to different parts of the page and choose to register or log in.
2. There is a standard form for registering, where we enter the employee id, first and last name, email, and password. It will check for a valid employee ID based on the company database table, confirm the password, and check that all the fields are filled out. 
3. Once the user registers, they will be redirected to a sign in page, where they enter their id and password. 
4. After that, they get to the main page, where they can see their name, id, department, and position. 
5. From there, we can access 5 other pages from the side navigation bar:
  - My tasks: displays a list of tasks with the completion status (green check mark filled vs empty) and task title, due date, and priority.
    - The employees who are in the manager position can also see a list of tasks they assigned to their team members.
    - Managers can also create tasks by inputting the task title, description, member, priority and due date and time.
    - If the user clicks on the task name, they can see more information about the task, such as the due time, description, and comments. They can also mark the task as completed.
  - Calendar: displays a calendar on the current month and displays the selected date and any tasks or holidays on the selected day.
  - Message: displays a compose message page where the user can send a message to other employees' emails.
  - Payroll: displays a timecard showing the hours worked for the previous week and the current week, as well as the employees salary and next payday.
    - The hours are calculated from the clock in and clock out buttons. When the employee clicks clock in, the time will be recorded and subtracted from the time when the employee clicks clock out. After clocking in and out, the time the employee worked will show up for that day in the timecard table.
  - People: displays the employees in the application with their name, position, department, and email. 
    - The list of people can be filtered using a drop down, where they can specify all employees, just manager, just teammates, or (for managers only) just subordinates. 
6. Lastly, we can log out from the button in the side navigation bar.
