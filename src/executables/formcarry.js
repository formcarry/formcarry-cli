#!/usr/bin/env node
'use strict';

var program = require('commander');

var pkg = require('../../package.json');
var chalk = require('chalk');
var r = require('inquirer');
var request = require('request');
var fs = require('fs');
var updateNotifier = require('update-notifier');

updateNotifier({pkg}).notify();

// Formcarry Library
var addForm = require('../library/add-form');
var myForms = require('../library/my-forms');
var deleteForm = require('../library/delete-form');
var login = require('../library/login');

program
	.version(pkg.version)
	.description('create new form, edit and show via cli');


program
	.command('login')
	.description('login to your formcarry account')
	.action(function(){
		login();
	});

program
	.command('add <name>')
	.description('create a new form')
 	.option('-n, --notify <notify>', 'notify those email adresses, split with comma')
 	.option('-r, --return <return>', 'specify return url')
	.action(function(name, options){
		var notify = options.notify || false;
		var returnUrl = options.return || false;

		addForm(name, notify, returnUrl);
	});

program
	.command('delete <id>')
	.description('delete form with id')
	.action(function(id){
		deleteForm(id);
	})

program
	.command('forms')
	.description('list your forms')
	.action(function(){
		myForms();
	});


program.parse(process.argv);

var found = false;
program.args.forEach(function(arg){
	if (arg instanceof program.Command )
		found = true;
})
if (!found)
	program.help();
