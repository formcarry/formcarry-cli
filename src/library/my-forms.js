#!/usr/bin/env node
'use strict';
var Base = require('./base');
var request = require('request');
var chalk = require('chalk');
var Table = require('cli-table');
var moment = require('moment');
var Spinner = require('cli-spinner').Spinner;

module.exports = function(){
	var spinner = new Spinner('%s processing..');

	spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
	spinner.start();

	var auth = new Base();
	auth.isAuthenticated(function(cb){
		if(cb){
			request.get({url:'https://formcarry.com/api/form?apiKey='+auth.getApiKey()}, function(err,httpResponse,body){
				var info = JSON.parse(body);
				if(!info.status){
					var table = new Table({
						head: ['ID', 'Name', 'Created At']
					});

					Object.keys(info).forEach(function(key){
						var time = moment(info[key].createdAt).format('MMMM Do YYYY, h:mm:ss a');
						table.push([info[key]._id, info[key].name, time]);
					});
					spinner.stop(true);
					console.log(table.toString());
				}else{
					spinner.stop(true);
					console.log(chalk.red('✕ ') + "Authentication Error!");
					console.log(chalk.red('✕ ') + "API Key is not valid!");
					console.log(chalk.yellow('? ') + "Type " + chalk.yellow('formcarry login') + " to log in");
				}

			});
				
		}else{
			spinner.stop(true);
			console.log(chalk.red('✕ ') + "Not authenticated!");
			console.log(chalk.yellow('? ') + "Type " + chalk.yellow('formcarry login') + " to log in");
		}
	})
}