const express = require('express');
const app = express();
const execSync = require('child_process').execSync;
const bodyParser = require('body-parser');
const path = require('path');
app.use('/public', express.static('public'));
const dbConnection = require('./database');
app.use(bodyParser.json());
const router = express.Router()

router.get('/', (req, res) => {
const {userContext} = req
var members = []

var all_other_contacts = [];

var groupID = req.query.groupID;

dbConnection.query("select contacts.contact_id, contacts.contact_first_name, " +
		"contacts.contact_last_name, contacts.contact_email, contacts.contact_email1, " +
		"contacts.contact_email2 from `contacts`  where not exists " +
		"(select group_id from `group_members` where contacts.contact_id = group_members.contact_id " +
		"and group_members.group_id = '"+groupID+"')").then(([rows]) => {
	for(row in rows){
		all_other_contacts[row] = {contactID: rows[row].contact_id, 
				contactName: rows[row].contact_first_name+" "+rows[row].contact_last_name, 
				email: rows[row].contact_email, email1: rows[row].contact_email1, 
				email2: rows[row].contact_email2};
	console.log(all_other_contacts[row]);
	}
	
});

dbConnection.query("select group_members.contact_id, group_members.contact_email, contacts.contact_first_name, contacts.contact_last_name FROM `group_members` " +
		"INNER JOIN contacts ON group_members.contact_id = contacts.contact_id where `group_id` like '"+groupID+"'").then(([rows]) => {
	for(row in rows){
		
		members[row]={contactID: rows[row].contact_id, contactEmail: rows[row].contact_email, 
				contactName: rows[row].contact_first_name+" "+rows[row].contact_last_name};
		console.log(members[row]);
	  }
	res.render('groupmembers', {userContext, groupID, members, all_other_contacts});
   });
  	
});

module.exports = router;

