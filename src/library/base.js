#!/usr/bin/env node
'use strict';
var fs = require('fs');

class Base{

	constructor(){
		var home = process.env.HOME || process.env.USERPROFILE;
		this.homeDir = home.toString();
	}

	isAuthenticated(cb){
		// is .formcarry file exist ?
		if (fs.existsSync(this.homeDir+"/.formcarry")){
	    var authFile = JSON.parse(fs.readFileSync(this.homeDir+'/.formcarry', 'utf8'));
	    if(authFile.status){
	    	this.authStatus = true;
	    	this.apiKey = authFile.apiKey;
	    	cb(true);
	    }
	    else{
	    	cb(false);
	    }
		}
		else{
			cb(false);
		}
	}

	getApiKey(){
		return this.apiKey;
	}

	getHomeDir(){
		return this.homeDir;
	}

}

module.exports = Base;