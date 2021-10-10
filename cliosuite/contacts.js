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
var allContactTypes = []
var allGroupTypes = []
var j = 0;
var k = 0;

var i = 0;
var contacts = []

dbConnection.query("select * FROM `contacts`")
.then(([rows]) => {
	for(row in rows){
		contacts[i]={id: rows[i].id, contactID: rows[i].contact_id, title: rows[i].title, 
		contactFirstName: rows[i].contact_first_name,contactMiddleName: rows[i].contact_middle_name,
		contactLastName: rows[i].contact_last_name, contactEmail: rows[i].contact_email,contactEmail1: rows[i].contact_email1, contactEmail2: rows[i].contact_email2,
		contactPhone: "+"+rows[i].contact_mobile_country_code+"-"+rows[i].contact_mobile_number,
		contactPhone1: "+"+rows[i].contact_mobile_country_code1+"-"+rows[i].contact_mobile_number1,
		contactAddress: rows[i].contact_address_home,contactAddress1: rows[i].contact_address_work, contactType: rows[i].contact_type, 
		ssn: rows[i].contact_ssn, contactStatus: rows[i].contact_status, birthday: rows[i].contact_birthday,
		company: rows[i].contact_company_name, website: rows[i].contact_website, socialMedia: rows[i].contact_social_media,
		createdAt: rows[i].created_at, modifiedAt: rows[i].modified_at, statusChangeReason: rows[i].status_change_reason,
		multimediaFilename: rows[i].multimedia_filename, multimediaFilename1: rows[i].multimedia_filename1, 
		call_from: rows[i].start_time_to_call, call_to: rows[i].end_time_to_call};
		i++;
	}
});
	
	var j = 0;
	var groups = []
	dbConnection.query("select * FROM `groups`")
	.then(([rows]) => {
		for(row in rows){
			groups[j]={id: rows[j].id, groupID: rows[j].group_id, 
					groupName: rows[j].group_name, 
			groupDesc: rows[j].group_desc,
			groupTagLine: rows[j].group_tag_line, groupCategory: rows[j].group_category, 
			groupScope: rows[j].group_scope, groupAdminID: rows[j].group_admin_id,
			groupEmail: rows[j].group_email_id,
			sharedDriveLink: rows[j].group_storage_drive_link, groupWebsite: rows[j].group_website, groupSocialMedia: rows[j].group_social_media,
			groupLogoFilename: rows[j].multimedia_filename,
			groupStart: rows[j].group_start, groupEnd: rows[j].group_end, 
			groupCreatedAt: rows[j].created_at, groupModifiedAt: rows[j].modified_at};
			j++;
		}
		
		res.render('contacts', {userContext, contacts, groups})
	});
 
})

module.exports = router;


