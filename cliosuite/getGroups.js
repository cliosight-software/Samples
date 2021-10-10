const express = require('express');
const app = express();
const execSync = require('child_process').execSync;
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
app.use('/public', express.static('public'));
const dbConnection = require('./database');
app.use(bodyParser.json());
const router = express.Router()

router.get('/', (req, res) => {
const {userContext} = req

var all_other_groups = []
var k =0;

var groups = []
var i = 0;

var email_list = []

var contactID = req.query.contactID;

dbConnection.query("select contact_email, contact_email1, contact_email2 from `contacts` where contact_id like '"+contactID+"'").then(([rows]) => {
	for(row in rows){
		email_list[0] = {email1: rows[0].contact_email};
		if(rows[0].contact_email1!="")
			email_list[0] = {email1: rows[0].contact_email, email2: rows[0].contact_email1};
		if(rows[0].contact_email2!="")
			email_list[0] = {email1: rows[0].contact_email, email2: rows[0].contact_email1, email3: rows[0].contact_email2};
		console.log(email_list[0]);
	  }
   });

dbConnection.query("select group_id, group_name, group_admin_id, group_email_id FROM `groups` where group_id " +
		" in (select group_id from `group_members` where contact_id like '"+contactID+"')").then(([rows]) => {
	for(row in rows){
		groups[i]={groupID: rows[i].group_id, groupName: rows[i].group_name,
				groupAdminID: rows[i].group_admin_id, groupEmail: rows[i].group_email_id};
		console.log(groups[i]);
		i++;	
	  }
   });

dbConnection.query("select DISTINCT groups.group_id, groups.group_name from " +
		"`groups` INNER JOIN `group_members` ON group_members.group_id = groups.group_id " +
		"where group_members.group_id NOT IN (select group_id from `group_members` " +
				"where contact_id like '"+contactID+"')").then(([rows]) => {
	for(row in rows){
		all_other_groups[k]={groupID: rows[k].group_id, groupName: rows[k].group_name};
		k++;
	}
	res.render('getGroups', {userContext, groups, all_other_groups, email_list, contactID})  
});

});

module.exports = router;

