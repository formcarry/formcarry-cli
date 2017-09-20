#!/usr/bin/env node
'use strict';
var Base = require('./base');
var request = require('request');
var chalk = require('chalk');
var Spinner = require('cli-spinner').Spinner;


module.exports = function(id){
	var spinner = new Spinner('%s processing..');
	spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
	spinner.start();

	var auth = new Base();
	auth.isAuthenticated(function(cb){
		if(cb){
			request.delete({url:'https://formcarry.com/api/form/'+id+'?apiKey='+auth.getApiKey()}, function(err,httpResponse,body){
				var info = JSON.parse(body);
				spinner.stop(true);
				if(info.code == 200){
					console.log(chalk.green('✔ ') + info.message);
				}else{
					console.log(chalk.yellow('? ') + info.message);
				}
			});
				
		}else{
			spinner.stop(true);
			console.log(chalk.red('✕ ') + "Not authenticated!");
			console.log(chalk.yellow('? ') + "Type " + chalk.yellow('formcarry login') + " to log in");
		}
	})
}