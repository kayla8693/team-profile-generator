const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMembers = [];




async function promptUser() {
    do {

        var response = await inquirer.prompt(
            [

                {
                    type: 'list',
                    name: 'role',
                    message: 'Would you like to add a manager, engineer, or intern?',
                    choices: [
                        'Manager',
                        'Engineer',
                        'Intern',
                        'Done adding team members'
                    ]
                },

                {
                    type: 'list',
                    name: 'role',
                    message: 'Would you like to add an engineer or intern?',
                    choices: [
                        'Engineer',
                        'Intern',
                        'Done adding team members'
                    ],
                    when: function (employees) {
                        return employees.addAnotherEmployee;
                    }
                },
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is the name of this team member?'
                },
                {
                    type: 'input',
                    name: 'email',
                    message: "What is the team member's email?"
                },
                {
                    type: 'input',
                    name: 'id',
                    message: "What is the team member's ID?"
                },
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: "What is the team member's office number?",
                    when: function (employees) {
                        return employees.role === 'Manager';
                    }
                },
                {
                    type: 'input',
                    name: 'github',
                    message: "What is the team member's gitlab username?",
                    when: function (employees) {
                        return employees.role === 'Engineer';
                    }
                },
                {
                    type: 'input',
                    name: 'school',
                    message: "What is the team member's school name?",
                    when: function (employees) {
                        return employees.role === 'Intern'
                    }
                },

                {
                    type: 'confirm',
                    name: 'addEmployee',
                    message: 'Would you like to add a team member?'
                }

            ]
        )

        if (response.role === 'Manager') {
            const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
            teamMembers.push(manager)
        }
        else if (response.role === 'Engineer') {
            const engineer = new Engineer(response.name, response.id, response.email, response.github);
            teamMembers.push(engineer);
        }
        else if (response.role === 'Intern') {
            const intern = new Intern(response.name, response.id, response.email, response.school);
            teamMembers.push(intern);
        }
            console.log(teamMembers)


    } while (response.addEmployee);
}

promptUser()