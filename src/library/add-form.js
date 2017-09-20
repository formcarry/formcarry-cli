#!/usr/bin/env node
'use strict';
var Base = require('./base');
var request = require('request');
var chalk = require('chalk');
var Spinner = require('cli-spinner').Spinner;
var clipboardy = require('clipboardy');

module.exports = function(name, notify, returnUrl){
	var spinner = new Spinner('%s processing..');
	spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
	spinner.start();

	var auth = new Base();
	auth.isAuthenticated(function(cb){
		if(cb){
			var form = {};
			if(name) form.name = name;
			if(notify) form.email = notify;
			if(returnUrl) form.returnurl = returnUrl;
			form.apiKey = auth.getApiKey();

			request.put({url:'https://formcarry.com/api/form', form: form }, function(err,httpResponse,body){
				
				spinner.stop(true);
				var info = JSON.parse(body);
				if(info.code == 200){
					clipboardy.write(info.formUrl);
					console.log(chalk.green('✔ ') + info.message);
					console.log(chalk.green('✔ ') + "Your endpoint url copied to clipboard:");
					console.log(chalk.green(info.formUrl + '\n'));
				}else{
					console.log(chalk.yellow('✕ ') + info.message);
				}

			});
				
		}else{
			spinner.stop(true);
			console.log(chalk.red('✕ ') + "Not authenticated!");
			console.log(chalk.yellow('? ') + "Type " + chalk.yellow('formcarry login') + " to log in");
		}
	})
}