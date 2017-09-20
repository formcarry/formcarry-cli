var r = require('inquirer');
var request = require('request');
var fs = require('fs');
var chalk = require('chalk');
var Spinner = require('cli-spinner').Spinner;

module.exports = function(){

	var prompt = [
		{
			name: "email",
			message: "email address"
		},
		{
			name: "password",
			message: "password",
			type: "password"	
		}
	];

	r.prompt(prompt).then(function (answers) {
		var spinner = new Spinner('%s processing..');
		spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
		spinner.start();

		request.post({url:'https://formcarry.com/api/auth', form: {username:answers.email, password:answers.password}}, function(err,httpResponse,body){
			spinner.stop(true);
			var info = JSON.parse(body);
			if(info.status){
				var homeDir = process.env.HOME || process.env.USERPROFILE;
				fs.writeFile(homeDir + '/.formcarry', JSON.stringify(info, null, 4), function(err) {
			     if(err) {
			       console.log(chalk.red("✕") + " Can not save your data to '~/.formcarry'!");
			       console.log(chalk.yellow("?") + " It's probably a permission issue.");
			     } else {
			     		console.log(chalk.green("✔") + " Successfully logged in");
			     		console.log(chalk.green("✔") + " Fetched your personal details");
			        console.log(chalk.green("✔ Ready!")+ " API Key saved in \"~/.formcarry\"");
			     }
			    });
			}else{
				spinner.stop(true);
				console.log(chalk.red("✕") + " Authentication failed!");
				console.log(chalk.yellow("?") + " If you have signed up with Google, make sure you have setted up a password.");
			}
		});

	});
}