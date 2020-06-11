const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employees = [];

inquirer
  .prompt([
    {
      type: "input",
      name: "manager",
      message: "Please enter name of the manager",
    },
    {
      type: "input",
      name: "managerId",
      message: "Please enter the ID of the manager",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Please enter manager's office number",
    },
    {
      type: "input",
      name: "email",
      message: "Please enter manager's email",
    },
  ])
  .then((answers) => {
    employees.push(
      new Manager(
        answers.manager,
        answers.managerId,
        answers.officeNumber,
        answers.email
      )
    );
    determineEmployee();
    console.log("Answer:", answers.name);
  });

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "intern",
        message: "Please enter name of the intern",
      },
      {
        type: "input",
        name: "internId",
        message: "Please enter the ID of the intern",
      },
      {
        type: "input",
        name: "school",
        message: "Please enter intern's school name",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter intern's email",
      },
    ])
    .then((answers) => {
      employees.push(
        new Intern(
          answers.intern,
          answers.internId,
          answers.school,
          answers.email
        )
      );
      determineEmployee();
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineer",
        message: "Please enter name of the engineer",
      },
      {
        type: "input",
        name: "engineerId",
        message: "Please enter the ID of the engineer",
      },
      {
        type: "input",
        name: "github",
        message: "Please enter engineer's github",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter engineer's email",
      },
    ])
    .then((answers) => {
      employees.push(
        new Engineer(
          answers.engineer,
          answers.engineerId,
          answers.github,
          answers.email
        )
      );
      determineEmployee();
    });
}

function determineEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please select the type of employee you would like to create:",
        name: "employee",
        choices: ["Intern", "Engineer", "Done"],
      },
    ])

    .then((answers) => {
      const { employee } = answers;
      if (employee === "Engineer") {
        createEngineer();
      }
      if (employee === "Intern") {
        createIntern();
      }
      if (employee === "Done") {
        createTeamHtml();
      }
    });
}

function createTeamHtml() {
  try {
    fs.writeFileSync("./team.html", render(employees));
  } catch (err) {
    console.log(err);
  }
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
