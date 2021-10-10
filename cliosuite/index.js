const express = require('express')
const app = express();
const execSync = require('child_process').execSync;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({     
	  extended: true
	}));
const multer = require('multer');
const formidable = require('formidable');
const path = require('path');
const dbConnection = require('./database');
const helpers = require('./helpers');
const fs = require('fs');
const moment = require('moment');
const dir = require('node-dir');
moment().format();

app.use(bodyParser.json());

const router = express.Router();
const directoryPath = path.join(__dirname, '../public/csv_uploads/');

app.use('/public', express.static('public'));

router.get('/', (req, res) => {
  const { userContext } = req;
  var backup_ids = [];
  var r;
  var group_names = [];
  var k;
  
  try{
	  /**dbConnection.execute("select * from db_table_backup").then(([rows]) => {
	    	for(row in rows){
	    		backup_ids[r]={id: JSON.stringify(rows[r].backup_id).trim()};
	    		r++;
	     }
	}); **/
	dbConnection.execute("select group_name from `groups`").then(([rows]) => {
	    	for(row in rows){
	    		group_names[row]={gname:rows[row].group_name};
	     }
	});   
	  
  }catch(err){
	  throw err;
  }
  res.render('index', { userContext,backup_ids,group_names})
}) 




router.post('/saveContact', function(req, res) {
	  console.log((req.body));
	  try{
		  var contactEmail1 = req.body['contactEmail'];
		  var contactEmail2 = req.body['contactEmail1'];
		  var contactEmail3 = req.body['contactEmail2'];
		  
		  var phone1 = req.body['contactMobile'];
		  var phone2 = req.body['contactMobile1'];
		  
		  
		  dbConnection.execute("select * from contacts where contact_email like '"+contactEmail1+
					"' or contact_email like '"+contactEmail2+"' or contact_email like '"+
					contactEmail3+"' or contact_mobile_number like '"+phone1+"' or " +
							"contact_mobile_number1 like '"+phone2+"'").then(([rows]) => {
			if(rows.length == 0){
		    var code = dbConnection.execute("insert into contacts (contact_id," +
	  		"title,contact_first_name,contact_middle_name,contact_last_name," +
	  		"contact_type,contact_email,contact_email1,contact_email2," +
	  		"contact_mobile_country_code,contact_mobile_number," +
	  		"contact_mobile_country_code1,contact_mobile_number1," +
	  		"contact_address_home,contact_address_work,contact_ssn,contact_company_name," +
	  		"contact_website,contact_birthday,contact_social_media,contact_status," +
	  		"start_time_to_call,end_time_to_call,status_change_reason,multimedia_filename,multimedia_filename1) " +
	  		"VALUES (\""+req.body['contactID']+'", "'+req.body['title']+'", "'+
	  		req.body['fName']+'", "'+req.body['mName']+'", "'+req.body['lName']+'", "'+
	  		req.body['contactType']+'", "'+req.body['contactEmail']+'", "'+
	  		req.body['contactEmail1']+'", "'+req.body['contactEmail2']+'", "'+
	  		req.body['countryCodeContact']+'", "'+req.body['contactMobile']+'", "'+
	  		req.body['countryCodeContact1']+'", "'+req.body['contactMobile1']+'", "'+
	  		req.body['contactAddress']+'", "'+req.body['contactAddress1']+'", "'+
	  		req.body['contactSSN']+'", "'+req.body['companyName']+'", "'+
	  		req.body['website']+'", "'+req.body['birthday']+'", "'+
	  		req.body['socialMedia']+'", "active", "'+req.body['contact_from']+'", "'+req.body['contact_to']+
	  		'", "Not_yet_changed", "'+req.body['contactMultimedia']+'", "'+req.body['contactMultimedia1']+"\")");
		    
		    res.send(code);
			}
							
		});
		    
		}catch(err){
			if(err.errno==1062){ 
				var userContext = req.userContext;
		        req.flash('message','The entry already exists.'); //we send the flash msg
		        return res.redirect('/', {userContext});
			}else{
				throw err;
			}
		}
		
	});

router.post('/deleteContact', function(req, res) {
	  console.log(req.body);
	  var code = dbConnection.execute("delete from contacts where contact_id like '"+req.body['contactID']+"'");
	  res.send(code);
	});

router.post('/updateContactStatus', function(req, res) {
	  console.log(req.body);
	  try{
	  var code = dbConnection.execute("update contacts set contact_status=\""+
			  req.body['contactStatus']+"\" and status_change_reason=\""+
			  req.body['contactStatusReason']+"\"where contact_id=\""+
			  req.body['contactid_list_status']+"\")");
	  res.send(code);
	  }catch(err){
		  throw err;
	  }
	});

router.post('/updateGroupStatus', function(req, res) {
	  console.log(req.body);
	  try{
	  	var code = dbConnection.execute("update groups set group_status=\""+
	  			req.body['groupStatus']+"\" and status_change_reason=\""+
	  			req.body['groupStatusReason']+"\"where group_id=\""+
	  			req.body['groupid_list_status']+"\")");
	  	res.send(code);
	  }catch(err){
			throw err;
	  }
});


router.post('/createGroup', function(req, res) {
	console.log(req.body);
	  try{
		    var code = dbConnection.execute("insert into `groups` (group_id," +
	  		"group_name,group_desc,group_tag_line,group_category," +
	  		"group_scope,group_status,status_change_reason,group_admin_id," +
	  		"group_email_id," +
	  		"group_storage_drive_link,group_website,group_social_media," +
	  		"group_start,group_end,multimedia_filename) " +
	  		"VALUES (\""+req.body['gID']+'", "'+req.body['gName']+'", "'+
	  		req.body['gDesc']+'", "'+req.body['gTagline']+'", "'+req.body['gCat']+'", "'+
	  		req.body['gScope']+'", "active", "Not yet changed", '+'"'+
	  		req.body['gAdminID']+'", "'+req.body['gEmail']+'", "'+
	  		req.body['driveLink']+'", "'+req.body['gWebsite']+'", "'+
	  		req.body['gSocialMedia']+'", "'+req.body['start_ctGroup']+'", "'+
	  		req.body['end_ctGroup']+'", "'+req.body['gLogoFilename']+"\")");
		    
		    res.send(code);
		    
		}catch(err){
			if(err.errno==1062){ 
				var userContext = req.userContext;
		        req.flash('message','The entry already exists.'); //we send the flash msg
		        return res.redirect('/', {userContext});
			}else{
				throw err;
			}
		}
		
	});

router.post('/enterGroupMembers', function(req, res) {
	console.log(req.body);
	  try{
		  var contactID = req.body['element1'];
		  var contactEmail = req.body['element2'];
		  
		  dbConnection.execute("select contact_id from contacts where contact_id like '"+
				  contactID+"' and contact_email like '"+contactEmail+"' or contact_email1 like '"+
				  contactEmail+"' or contact_email2 like '"+contactEmail+"'").then(([rows]) => {
		    	if(rows.length == 1){
		    		var code = dbConnection.execute("insert into group_members " +
		    				"(group_id, contact_id, contact_email) VALUES (\""+
		    				req.body['id']+'", "'+contactID+'", "'+contactEmail+"\")");
		    		res.send(code);
		    	}
		});   
		  
	  }catch(err){
			if(err.errno==1062){ 
				var userContext = req.userContext;
		        req.flash('message','One entry already exists.'); //we send the flash msg
		        return res.redirect('/', {userContext});
			}else{
				throw err;
			}
		}
		
});

router.post('/addContactToGroups', function(req, res) {
	console.log(req.body);
	  try{
		  var groupID = req.body['element1'];
		  var contactEmail = req.body['element2'];
		  
		  dbConnection.execute("select group_id from `groups` where group_id like '"+
				  groupID+"'").then(([rows]) => {
		    	if(rows.length == 1){
		    		var code = dbConnection.execute("insert into `group_members` " +
		    				"(group_id, contact_id, contact_email) VALUES (\""+
		    					groupID+", \""+req.body['id']+'", "'+contactEmail+"\")");
		    		res.send(code);
		    	}
		});   
		  
	  }catch(err){
			if(err.errno==1062){ 
				var userContext = req.userContext;
		        req.flash('message','One entry already exists.'); //we send the flash msg
		        return res.redirect('/', {userContext});
			}else{
				throw err;
			}
		}
		
});

router.post('/assignContactToGroup', function(req, res){
	  var groupID = req.body['groupID'];
	  var contactID = req.body['contactID'];
	  var email = req.body['email'];
	  console.log(req.body);
	  try{
		  var query = "insert into `group_members` (group_id, contact_id, contact_email) values ('"+groupID+"','"+contactID+"','"+email+"')";
		  var code = dbConnection.execute(query);
		  res.send(code);
	  }catch(err){
		  throw err;
	  }
	  
	});

router.post('/removeContactFromGroup', function(req, res){
	  var groupID = req.body['groupID'];
	  var contactID = req.body['contactID'];
	  console.log(req.body);
	  try{
		  var query = "delete from `group_members` where group_id like '"+groupID+"' and contact_id like '"+contactID+"'";
		  var code = dbConnection.execute(query);
		  res.send(code);
	  }catch(err){
		  throw err;
	  }
	  
	});

