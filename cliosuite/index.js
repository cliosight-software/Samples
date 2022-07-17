/******** Please use GET, PUT and DELETE REST methods instead of POST wherever applicable in the html to follow the correct semantics *******/

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



/**************** Start of Contact Management *****************/

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

/******************* End of Contact Management ********************/



/******************* Start of File Management Operations ********************/

/////////////////Set File Storage//////////////////

 var storage_file = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/csv_uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname+'-'+file.originalname.replace(path.extname(file.originalname), "")+'-' + moment(Date.now()).format("DD-MM-YYYY_h:mm:ss")+path.extname(file.originalname))
  }
});
 

var upload_file = multer({ storage: storage_file });


///////////////////////File upload method//////////////////////

router.post('/uploadfile', upload_file.single('file'), (req, res, next) => {
	 // isMaxRowsCountReached('filenames'); 
	 // isMaxRowsCountReached('filedata');
	  const file = req.file;
	  console.log(file);
	  var file_type = "csv";
	  
	  if (!file) {
	    const error = new Error('The file path is empty or invalid!')
	    error.httpStatusCode = 400
	    return next(error)
	  }else if (!file.originalname.match(/\.(xlsx|XLSX|xls|XLS|xlt|XLT|xla|XLA|xlm|XLM|csv|CSV|txt|TXT|odt|ODT|doc|DOC|docx|DOCX|pdf|PDF)$/)) {
	        let result = "<hr/><h2 style=\"display: flex;justify-content: center;color:grey; margin-top:30px;\">There was an error in uploading your file. Please check for valid extensions - .csv, .txt,.docx, .pdf, .xls, .xlsx, .xlt, xls, xlm  et al only.</h2><br/><h2><a href=\"/files\">Go Back</a></h2><hr/>";
	        res.send(result)
	        
	  }else{
		 
		 if(file.originalname.match(/\.(pdf|PDF)$/)){
			file_type = "pdf";
		}
		 
		 var file_id = file.originalname.replace(path.extname(file.originalname), "")+'-' + moment(Date.now()).format("DD-MM-YYYY_h:mm:ss")+path.extname(file.originalname);
		 var filename = file.fieldname+'-'+file_id;
		 dbConnection.execute("INSERT INTO `filenames` (`file_id`, `file_path`, `file_type`) VALUES(?,?,?)",[file_id, file.path, file_type]);
		 if(file_type=='csv'){
		 var row_data = [];
		 var file_rows = [];
		 var i =0;
		 fs.readFile(directoryPath+filename, 'utf-8', (err, filedata) => { 
			    if (err) throw err; 
			    file_rows = filedata.split("\n");
			    for(row in file_rows){
			    	row_data[row]={file_row: file_rows[row]};
			    	console.log(row_data[row]);
			    	dbConnection.execute("insert into filedata (file_id,file_data) values ('"+file_id+row+"','"+row_data[row]['file_row']+"')");
		    	}
			    });
			
		 }
		 let result = "<hr/><h2 style=\"display: flex;justify-content: center;color:grey; margin-top:30px;\">You have uploaded the file:"+file.originalname+"</h2><br/> <div class=\"container\"><div class=\"row\"><div class=\"col-md-10\"> <p style=\"font-size:20px;\">System Filename:  </p><p style=\"font-size:20px;\" id=\"filepath\">"+file.filename+"</p></div><div class=\"col-md-2\"><button class=\"btn btn-default btn-lg btn-block btn-huge\" style=\"width:200px; margin-bottom:10px; height:50px; border-width:3px; border-color:grey; background-color: lightcyan;\" onclick=\"copyPath()\"><font size=\"5\">Copy Path</font></button></div></div></div> <hr/><div class=\"container\"><div class=\"row-md-12\">";
		 result += '</div></div><hr/><script>function copyPath() {var range = document.createRange(); range.selectNode(document.getElementById("filepath")); window.getSelection().removeAllRanges(); window.getSelection().addRange(range); document.execCommand("copy"); window.getSelection().removeAllRanges();}</script><div class="container"><div class="row" style="display: flex;justify-content: center;"><h2><a href="/files">Go Back</a></h2></div><div class="row" style="display: flex;justify-content: center;"><h2><a href="/">Cliosuite Home</a></h2></div></div><hr/>';
	     result += '<div class=\"container\" style="display: flex; justify-content: center; \"><p><font size="4" color="grey">Copyright © 2022 Cliosight - All Rights Reserved.</font></p></div>';
		  
		 res.send(result)
	  }
	  
});


//////////////////////Refresh CSV filenames////////////////////////

router.get('/listFileNamesCSV', (req, res) => {
	var userContext = req.userContext;
	var files = [];
	var media_files = [];
	var all_entities = [];
	var assigned_entities = [];
	var i = 0;
	var j = 0;
	var k = 0;
	var l = 0;
    dbConnection.query("SELECT `file_id` FROM `filenames` where `file_type` like 'csv'")
    .then(([rows]) => {
    	for(row in rows){
    		files[i]={name: rows[i].file_id};
    		i++;
    	}
    });
    dbConnection.query("select `product_id` from `product` union select `service_id` from `service` union select `store_id` FROM `store`")
    .then(([rows]) => {
    	for(row in rows){
    		all_entities[k]={name: rows[k].product_id};
    		k++;
    	}
    	
        });
    dbConnection.query("SELECT DISTINCT `entity_id` FROM `media_entity`")
    .then(([rows]) => {
    	for(row in rows){
    		assigned_entities[l]={name: rows[l].entity_id};
    		l++;
    	}
    	
        });
    dbConnection.query("select `file_id` FROM `filenames` union SELECT `file_id` FROM `image_filenames` union select `file_id` FROM `video_filenames` union select `file_id` FROM `i3D_filenames`")
        .then(([rows]) => {
        	for(row in rows){
        		media_files[j]={name: rows[j].file_id};
        		j++;
        	}
        	res.render('files', {userContext, files, media_files, all_entities, assigned_entities})
        });
    	
    }); 



//////////////////////// Get media files and attributes //////////////////////

router.get('/listFileNames', (req, res) => {
	var userContext = req.userContext;
	var files = [];
	var media_files = [];
	var assigned_entities = [];
	var all_entities = [];
	var i = 0;
	var j = 0;
	var k = 0;
	var l = 0;
	
	var file_id = req.query.media_file;
	console.log(req.query.media_file);
	
    dbConnection.query("SELECT `file_id` FROM `filenames` where `file_type` like 'csv'")
    .then(([rows]) => {
    	for(row in rows){
    		files[i]={name: rows[i].file_id};
    		i++;
    	}
    });
    dbConnection.query("select store_id from store s where not exists (select entity_id from media_entity i  " +
    		"where file_id like \""+file_id+"\" and s.store_id = i.entity_id) union select product_id from product " +
    				"p where not exists (select entity_id from media_entity i where file_id like \""+file_id+"\" " +
    						"and p.product_id = i.entity_id) union select service_id from service sv " +
    						"where not exists (select entity_id from media_entity i where file_id like \""+file_id+
    						"\" and sv.service_id = i.entity_id);")
    .then(([rows]) => {
    	for(row in rows){
    		all_entities[k]={name: rows[k].store_id};
    		k++;
    	}
    	
        });
    dbConnection.query("select `entity_id` from `media_entity` where `file_id` like '"+file_id+"'")
    .then(([rows]) => {
    	for(row in rows){
    		assigned_entities[l]={name: rows[l].entity_id};
    		l++;
    	}
    	
        });
    dbConnection.query("select `file_id` FROM `filenames` where `file_type` like 'pdf' union SELECT `file_id` FROM `image_filenames` union select `file_id` from `video_filenames` union select `file_id` FROM `i3D_filenames`")
        .then(([rows]) => {
        	for(row in rows){
        		media_files[j]={name: rows[j].file_id};
        		j++;
        	}
        	res.render('files', {userContext, files, media_files, assigned_entities, all_entities, file_id})
        });
    	
    }); 


///////////////////////////// Managing Media Files assigned to Entities of Cliosuite ////////////////////////////

router.post('/assignMedia', (req,res) => {
	//isMaxRowsCountReached('media_entity');
	var userContext = req.userContext;
	var media_file = req.query.media_file;
	var entity_id = req.query.entity_id;
	console.log(media_file+"  entity-id: "+entity_id);
	var code = dbConnection.execute("insert into `media_entity` (`file_id`, `entity_id`) VALUES (\""+media_file+"\", \""+entity_id+"\");");
	res.render('files',{userContext});

    });

router.post('/dissociateMedia', (req,res) => {
	var userContext = req.userContext;
	var media_file = req.query.media_file;
	var entity_id = req.query.entity_id;
	console.log(media_file+"   "+entity_id);
	var code = dbConnection.execute("delete from `media_entity` where `file_id` like \""+media_file+"\" and `entity_id` like \""+entity_id+"\";");
	res.render('files',{userContext});

    });


router.post('/updateMediaTag', function(req, res){
	  var userContext = req.userContext;
	  var media_file = req.query.media_file;
	  var media_tag = req.query.media_tag;
	  var table_name = req.query.table_name;
	  var tag_field = "file_type";
	  if(table_name=="filenames"){
		  tag_field = "media_tag";
	  }
	  var code = dbConnection.execute("update "+table_name+" set "+tag_field+"='"+media_tag+"' where `file_id` like '"+media_file+"'");
	  res.render('files',{userContext});
	});



////////////////////////// Insert CSV rows to database - file or textarea ////////////////////////
/////////// Option - LOAD DATA INFILE for Mysql ////////////////

function executeInsertQuery(tableName, schema, data, id){
	//isMaxRowsBreached(tableName);
	var rows = data.split('\n');
	var schemaFields = schema.split(",");
	var row;
	for(row in rows){
		console.log(rows[row]);
		fields = rows[row].split(",");
		if(id!=""){ //Text area records
			if(tableName == "store_images_list"){
					var image_id = id+"_CSV_IMG_"+row; // or check if image is already assigned
					fields.unshift(image_id);
					
			    } else {
			    	fields.unshift(id);
			    }
		}
		var db_col_count = schemaFields.length-(id.split(",").length+1);
		if(fields.length!=db_col_count){
			console.log("Column count mismatch");
		} else {
			var col_count = db_col_count;
			var query = "INSERT INTO "+ tableName + " (";
			while(col_count > 1){
				query += schemaFields[db_col_count-col_count]+", "; 
				col_count--;
			}
			query += schemaFields[db_col_count-1]+",'created_at','modified_at') VALUES('"+fields[0]+"',";
			col_count = db_col_count-1;
			while(col_count > 1){
				if(isNumberField(fields[db_col_count-col_count].trim())==true){
					query += fields[db_col_count-col_count].trim()+",";
				}else{
					query += "'"+fields[db_col_count-col_count].trim()+"',";
				}
				col_count--;
			}
			if(isNumberField(fields[db_col_count-1].trim())==true){
				query+= fields[db_col_count-1].trim();
			}else {
				query+= "'"+fields[db_col_count-1].trim()+"'";
			}
			var currentTimestamp = moment(Date.now()).format("YYYY-MM-DDTh:mm:ss");
			query +=",'"+currentTimestamp+"','"+currentTimestamp+"');"
			console.log(query);
			dbConnection.execute(query);
		}
	}
}


/////////////////// For inserting from CSV file /////////////////////

router.post('/uploadContents', (req, res) => {  
var filename = "file-"+req.query.file;	
var table = req.query.table;
console.log(filename+" "+table);
var id = req.query.id;
if (id!="")
	console.log(id);

fs.readFile(directoryPath+filename, 'utf-8', (err, data) => { 
    if (err) throw err; 
    console.log(data); 
    	try{
    		var schema = getSchema(table);
    		console.log(schema);
    		executeInsertQuery(table, schema, data, id);
    	   }catch (err){
    		res.send(err);
    		
    	}
    
    });
});


///////////////// For inserting from text area //////////////////////

router.post('/uploadTextCSV', (req, res) => {  
	var table = req.query.table;
	console.log("Table: "+table+" Data: "+req.query.data);  
	try{
	      var schema = getSchema(table);
	      console.log(schema);
	      executeInsertQuery(table, schema, req.query.data, "");
	}catch(err){
		res.send(err);
	}
});


//////////////////// Set Image Storage ////////////////////

const storage_img = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + file.originalname.replace(path.extname(file.originalname), "") + '-' + 
        		moment(Date.now()).format("DD-MM-YYYY_h:mm:ss") + path.extname(file.originalname));
    }
});

let upload_img = multer({ storage: storage_img, fileFilter: helpers.imageFilter}).array('multiple_images', 10);
router.post('/upload-multiple-images', (req, res) => {
    
	upload_img(req, res, function(err) {
		
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        	
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        
        let result = "<body style=\"background-color: lightcyan\"><hr/><h2 style=\"display: flex;justify-content: center;color:grey; margin-top:30px;\">You have uploaded these images:</h2> <hr /><div class=\"container\"><div class=\"row-md-12\">";
        const files = req.files;
        console.log(req.files);
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            if(files[index].filename.count("multiple_images-") > 1)
            		files[index].filename = files[index].filename.replace("multiple_images-","");
        	var file_id = files[index].filename;
        	var image_type = "image_media";
   		 	dbConnection.execute("INSERT INTO `image_filenames` (`file_id`, `filename`, `file_type`) VALUES(?,?,?)",[file_id, files[index].path, image_type]);
            result += `<div class="col-md-4"><p>Image Endpoint: ${files[index].path}</p><br/><p>Image System Filename: </p><p id=\"filepath\">${files[index].filename}</p><button class=\"btn btn-default btn-lg btn-block btn-huge\" style=\"width:300px; margin-bottom:10px; height:50px; border-width:3px; border-color:grey; background-image: url('/public/images/bg1.jpg');\" onclick=\"copyPath()\"><font size=\"5\">Copy System Filename</font></button><br/><img src="${files[index].path}" width="40%" height="70%" style="margin-left: 20px;"></div>`;
        }
        
        result += '</div></div><script>function copyPath() {var range = document.createRange(); range.selectNode(document.getElementById("filepath")); window.getSelection().removeAllRanges(); window.getSelection().addRange(range); document.execCommand("copy"); window.getSelection().removeAllRanges();}</script><hr/><div class="container"><div class="row" style="display: flex;justify-content: center;"><h2><a href="/files">Go Back</a></h2></div><div class="row" style="display: flex;justify-content: center;"><h2><a href="/">Cliosuite Home</a></h2></div></div><hr/>';
        result += '<div class=\"container\" style="display: flex; justify-content: center; \"><p><font size="4" color="grey">Copyright © 2020 Cliosight - All Rights Reserved.</font></p></div></body>'
        res.send(result);
    });
});

//////////////////// Set Image Storage ////////////////////////

const storage_vid = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/Users/apple/Desktop/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + file.originalname.replace(path.extname(file.originalname), "") + '-' + 
        		moment(Date.now()).format("DD-MM-YYYY_h:mm:ss") + path.extname(file.originalname));
    }
});

let upload_vid = multer({ storage: storage_vid, fileFilter: helpers.videoFilter}).array('multiple_videos', 10);
router.post('/upload-multiple-videos', (req, res) => {
    
	upload_vid(req, res, function(err) {
		
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select a video to upload');
        	
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        
        let result = "<body style=\"background-color: lightcyan\"><hr/><h2 style=\"display: flex;justify-content: center;color:grey; margin-top:30px;\">You have uploaded these videos:</h2> <hr /><div class=\"container\"><div class=\"row-md-12\">";
        const files = req.files;
        console.log(req.files);
        let index, len;
        ///////////////// Loop through all the uploaded images and display them on frontend ///////////////////
        for (index = 0, len = files.length; index < len; ++index) {
        	if(files[index].filename.count("multiple_videos-") > 1)
        		files[index].filename = files[index].filename.replace("multiple_videos-","");
        	var file_id = files[index].filename;
        	var video_type = "video";
   		 	dbConnection.execute("INSERT INTO `video_filenames` (`file_id`, `filename`, `file_type`) VALUES(?,?,?)",[file_id, files[index].path, video_type]);
            result += `<div class="col-md-4"><p>Video Endpoint: ${files[index].path}</p><br/><p>Video System Filename: </p><p id=\"filepath\">${files[index].filename}</p><button class=\"btn btn-default btn-lg btn-block btn-huge\" style=\"width:300px; margin-bottom:10px; height:50px; border-width:3px; border-color:grey; background-color: lightcyan;\" onclick=\"copyPath()\"><font size=\"5\">Copy System Filename</font></button><br/><video width="320" height="240" controls><source src="${files[index].path}" type="video/avi" width="320" height="240" style="margin-left: 20px;">Your browser does not support the video tag.</video></div>`;
        }
        
        result += '</div></div><script>function copyPath() {var range = document.createRange(); range.selectNode(document.getElementById("filepath")); window.getSelection().removeAllRanges(); window.getSelection().addRange(range); document.execCommand("copy"); window.getSelection().removeAllRanges();}</script><hr/><div class="container"><div class="row" style="display: flex;justify-content: center;"><h2><a href="/files">Go Back</a></h2></div><div class="row" style="display: flex;justify-content: center;"><h2><a href="/">Cliosuite Home</a></h2></div></div><hr/>';
        result += '<div class=\"container\" style="display: flex; justify-content: center; \"><p><font size="4" color="grey">Copyright © 2022 Cliosight - All Rights Reserved.</font></p></div></body>'
        res.send(result);
    });
});




///////////////////////// Get DB records and refresh other filenames //////////////////////////////

router.get('/getRecords', function(req, res){
	   	var userContext = req.userContext;
	   	var files = [];
		var media_files = [];
		var all_entities = [];
		var assigned_entities = [];
		var table_rows = [];
		var table_keys = [];
		var i = 0;
		var j = 0;
		var k = 0;
		var l = 0;
		var r = 0;
		var o = 0;
		
		var table_name = req.query.table_mdb;
		var table_key = req.query.table_key;
		console.log("table_key from getRecords:"+table_key);
		
		var table_key_value = "";
		
		if(table_name=="none"){
			var errMsg = "Please choose a database table name to fetch all records. " +
					"Choose table_name+unique_key to filter results."
			res.render('files', {userContext, errMsg});
		} else {
		var unique_key = getUniqueKeySet(table_name);
		console.log("Table name for getRecords:"+table_name+" Unique key:"+unique_key);
		if(table_name=="groups"){
			table_name ="`groups`";
		}
		
		if(table_key=="none"){
			
			dbConnection.query("select * from "+table_name).then(([rows]) => {
	    	for(row in rows){
	    		table_rows[r]={db_row: JSON.stringify(rows[r]).trim()};
	    		r++;
	    	}
	    });
		} else if(table_key!="none"){
			var key = 0;
			var keys = "";
			var table_key_json = JSON.parse(table_key);
			var code = "";
			for(key in unique_key){
				
				  var current_key_value = JSON.stringify(table_key_json[unique_key[key]]);
				  console.log("current_key_value ---- "+current_key_value);
				  if(table_name=="image_filenames"){
					  keys = "file_id like \"multiple_images-"+current_key_value.replace("\"","");
					  break;
				  }
				  else if(table_name=="video_filenames"){
					  keys = "file_id like \"multiple_videos-"+current_key_value.replace("\"","");
					  break;
				  }
				  else if(table_name=="i3D_filenames"){
					  keys = "file_id like \"multiple_3D-"+current_key_value.replace("\"","");
					  break;
				  }
				  else {
					  	 table_key_value += current_key_value;
					  	 keys += unique_key[key]+" like "+current_key_value;
					  	 if(key < unique_key.length-1){
					  		keys +=" and ";
					  		table_key_value += ",";
					  	 }
				  	   }
			}
    		console.log("Keys: "+keys+"  Query:"+"select * from "+table_name+" where "+keys);
    		var query_0 = "select * from "+table_name+" where "+keys;
    		console.log("First Query: "+query_0);
			dbConnection.query(query_0).then(([rows]) => {
			if(rows.length==0){
		    		var errMsg = "The key has been deleted or does not exist. Please choose a table name and an existing unique key.";
		    		res.render('files', {userContext, errMsg});
		    }	
		    	table_rows[0]={db_row: JSON.stringify(rows[0]).trim()};
		    });
			
		}
		  var query_1 = "select "+unique_key.join(",")+" from "+table_name;
		   console.log("Second Query: "+query_1);
		   
		   dbConnection.query(query_1).then(([rows]) => {
	    	for(row in rows){
	    		var val = JSON.stringify(rows[o]);
	    		if(table_name=="image_filenames"){
	    			val=val.replace(/multiple_images-/g,"");
	    		}else if(table_name=="video_filenames"){
	    			val=val.replace(/multiple_videos-/g,"");
	    		}else if(table_name=="i3D_filenames"){
	    			val=val.replace(/multiple_3D-/g,"");
	    		}
	    		table_keys[o]={key: val};
	    		o++;
	    	}
	    });
	    dbConnection.query("SELECT `file_id` FROM `filenames` where `file_type` like \"csv\"")
	    .then(([rows]) => {
	    	for(row in rows){
	    		files[i]={name: rows[i].file_id};
	    		i++;
	    	}
	    });
	    dbConnection.query("select `product_id` from `product` union select `service_id` from `service` union select `store_id` FROM `store`")
	    .then(([rows]) => {
	    	for(row in rows){
	    		all_entities[k]={name: rows[k].product_id};
	    		k++;
	    	}
	    	
	        });
	    dbConnection.query("SELECT DISTINCT `entity_id` FROM `media_entity`")
	    .then(([rows]) => {
	    	for(row in rows){
	    		assigned_entities[l]={name: rows[l].entity_id};
	    		l++;
	    	}
	    	
	        });
	    dbConnection.query("select `file_id` from `filenames` where `file_type` like 'pdf' union SELECT `file_id` FROM `image_filenames` union select `file_id` FROM `video_filenames` union select `file_id` from `i3D_filenames`")
	        .then(([rows]) => {
	        	for(row in rows){
	        		media_files[j]={name: rows[j].file_id};
	        		j++;
	        	}
	        	res.render('files', {userContext, files, media_files, all_entities, assigned_entities, table_name, table_key_value, table_rows, table_keys})
	        });
		}
	});

/////////////////////////// Enter the records again after editing //////////////////////////


/////////////////////////// Delete the records //////////////////////////////

router.post('/deleteRecords', function(req, res){
	  var table_name = req.query.table_name;
	  //isMaxRowsBreached(table_name);
	  var unique_key = getUniqueKeySet(table_name);
	  var key = 0;
	  var keys = "";
	  var code= "";
	  if(req.query.table_key=="none"){
		  code = dbConnection.execute("truncate table `"+table_name+"`"); // delete and reset the index
		  res.send(code);
	  } else {
		  var table_key_json = JSON.parse(req.query.table_key);
		 
		  for(key in unique_key){
			  	
			  var current_key_value = JSON.stringify(table_key_json[unique_key[key]]);
			  if(table_name=="image_filenames"){
				  keys = "file_id like \"multiple_images-"+current_key_value.replace("\"","");
				  break;
			  }
			  else if(table_name=="video_filenames"){
				  keys = "file_id like \"multiple_videos-"+current_key_value.replace("\"","");
				  break;
			  }
			  else if(table_name=="i3D_filenames"){
				  keys = "file_id like \"multiple_3D-"+current_key_value.replace("\"","");
				  break;
			  }
			  else {
				  	 keys += unique_key[key]+" like "+current_key_value;
				  	 if(key < unique_key.length-1){
				  		keys +=" and ";
				  	 }
			   }
		  }
		  
		  var query = "delete from `"+table_name+"` where "+keys;
		  console.log("Delete record --- "+query);
		  code = dbConnection.execute(query); // delete the record with key
		  res.send(code);
	  }
	  
	});
 
///////////////////////// Modify records (after delete) ////////////////////////////

router.post('/saveJsonToDB', function(req, res){
		
	  var userContext = req.userContext;
	  var db_row_data = req.query.table_data.trim();
	  var table_name = req.query.table_name;
	  var schemaFields = getSchema(table_name);
	  var code = "";
	  var currentTimestamp = moment(Date.now()).format("YYYY-MM-DDTh:mm:ss");
	  console.log("About to insert-----"+JSON.stringify(db_row_data));
	  
	  if(req.query.table_key!="none"){ //single record modified
		  var query = "insert into `"+table_name+"` values(";
		  var  jsonObject = JSON.parse(db_row_data);
		  var i = 0;
		  query += jsonObject["id"]+",";
		  for(i in schemaFields){
			  if(i < schemaFields.length-2){
				  if(isNumberField(schemaFields[i])==true){
					  query += jsonObject[schemaFields[i]]+",";
				  }
				  else {
					  query += "'"+jsonObject[schemaFields[i]]+"',";
				  }
			  }
		  }
		  query += "'"+jsonObject['created_at'].replace("Z","")+"','"+currentTimestamp+"')";
		  console.log("Single record query ----- "+query);
		  code = dbConnection.execute(query);
		  res.send(code);
		  
	  } else {
		  
	  var rows = db_row_data.trim().split("}{"); //////// multiple records modified
	  for(row in rows){
		  if(row==0 && rows.length>1){
			  rows[row]+="}"
		  } else if(row>0 && row<rows.length-1){
			  rows[row] = "{"+rows[row]+"}";
		  } else if(rows.length>1 && row == rows.length-1){
			  rows[row] = "{"+rows[row];
		  }
	  }
	  
	  var row = 0;
	  var jsonObjects = [];
	  for(row in rows){
		  jsonObjects.push(JSON.parse(rows[row]));
		  var query = "insert into `"+table_name+"` values("+jsonObjects[row]['id'];
		  
		  var field = 0;
		  for(field in schemaFields){
			  if(isNumberField(schemaFields[field])==true){
				  query +=","+jsonObjects[row][schemaFields[field]];
			  }else{
				  query +=",\""+jsonObjects[row][schemaFields[field]]+"\"";
			  }
			  if(field == schemaFields.length-3)
				  break;
		 }
		  query +=",'"+jsonObjects[row]['created_at'].replace("Z","")+"','"+currentTimestamp+"')";
		  console.log("Query for Multiple rows -------   for row count :"+row+"  ----   "+query);
		  code = dbConnection.execute(query);
		  
	   }
	  	res.send(code);
	  }
	  
  });

/*************************** End of File Operations ****************************/



/**************************** Start of Database maintenance and helper functions and APIs ****************************/

//////////////////////////// Database Cleaup and Backup operations /////////////////////////////

router.post('/clearDBTablesData', function(req, res){
	  var code;
	  var user_id = req.body['id'].split("_")[0];
	  var table_name = req.body['table_name'];
	  var current_db_schema = getCurrentSchemaVersion();
	  var table_names = getAllTableNames(current_db_schema);
	  try{
		  if(table_names.indexOf(table_name)>0){ //skip if not present in the current ou-of-the-box schema (basic subscription)
		  	code = dbConnection.execute("delete from "+table_name);
		  	dbConnection.execute("insert into db_ops (op_id,op_type,entity_name,user_id) values ('"+req.body['id']+"','table_cleanup','"+req.body['table_name']+"','"+user_id+"')");
		  	res.send(code);
		  }
	  }catch(err){
		  throw err;
	  }
});

//The basic plan will clear only pre-defined out-of-the-box tables. 
//higher versions to allow creating custom tables that will be registered in the schema metadata info table.
//Thats why not using cliosuite_schema_info table for fetching table names.
router.post('/clearDBData', function(req, res){
	  var code;
	  var current_db_schema = getCurrentSchemaVersion();
	  var table_names = getAllTableNames(current_db_schema);
	  try{
		 for(table in table_names){
			 code = dbConnection.execute("delete from "+table_names[table]);
		 }
	     dbConnection.execute("insert into db_ops (op_id,op_type,entity_name,user_id) values ('"+req.body['op_id']+"','db_cleanup','all','"+req.body['user_id']+"')");
	     res.send(code);
	  }catch(err){
		  throw err;
	  }
});

router.post('/createDBTableBackup', function(req, res){
	  console.log(req.body);
	  var backup_id = req.body['id']+"_"+moment(Date.now()).format("DD-MM-YYYY_h:mm:ss");
	  var table_name = req.body['element'];
	  var table_rows = [];
	  try{
	  dbConnection.query("select * from "+table_name).then(([rows]) => {
	    	for(row in rows){
	    		table_rows[row]={db_row: JSON.stringify(rows[row]).trim()};
	    	}
	    });
	  }catch(err){
		  throw err;
	  }
	  var json_data = table_rows.join(",");
	  console.log(json_data);
	  var user_id = backup_id.split("_")[0];
	  var op_id = user_id+"_"+Date.now();
	  try{
		  var code = dbConnection.execute("insert into db_table_backup (backup_id, table_name, json_data, user_id) values('"+backup_id+"','"+table_name+"','"+json_data+"','"+user_id+"')");
		  dbConnection.execute("insert into db_ops (op_id,op_type,entity_name,user_id) values ('"+op_id+"','table_backup','"+table_name+"','"+user_id+"')");
		  res.send(code);
	  }catch(err){
		  throw err;
	  }
});

router.post('/createDBBackup', function(req, res){
		 var backup_id = req.body['id'];
		 var op_id = req.body['op_id'];
		 var user_id = req.body['user_id'];
		 
		 try{
			 createDBBackup(backup_id, op_id, user_id);
			 dbConnection.execute("insert into db_ops (op_id,op_type,entity_name,user_id) values ('"+op_id+"','db_backup','all','"+user_id+"')");
			 res.send(code);
	  }catch(err){
		  throw err;
	  }
 });

//The basic plan will take backup of only pre-defined out-of-the-box tables. 
//higher versions to allow creating custom tables that will be registered in the schema metadata info table.
//Thats why not using cliosuite_schema_info table for fetching table names.
function createDBBackup(backup_id, op_id, user_id){ 
	var code;
	var current_db_schema = getCurrentSchemaVersion();
	var table_names = getAllTableNames(current_db_schema);
	for(tab in table_names){
		var table_rows = [];
	try{
		dbConnection.query("select * from "+table_names[tab]).then(([rows]) => {
	    	for(row in rows){
	    		table_rows[row]={db_row: JSON.stringify(rows[row]).trim()};
	    	}
		});
	}catch(err){
		throw err;
	}
	  var json_data = table_rows.join(",");
	  console.log(json_data);
	  backup_id = backup_id+"_full_"+moment(Date.now()).format("DD-MM-YYYY_h:mm:ss");
	  try{
		  code = dbConnection.execute("insert into db_table_backup (backup_id, table_name, json_data, user_id) values('"+backup_id+"','"+table_name+"','"+json_data+"','"+user_id+"')");
		  res.send(code);
	  }catch(err){
		  throw err;
	  }
	}
}

router.post('/resetDBSchema', function(req, res){
	  var version = req.body['version'];
	  var user_id = req.body['user_id'];
	  var op_id = req.body['op_id'];
	  try{
		  var code = resetDBSchema(version);
		  dbConnection.execute("insert into db_ops (op_id,op_type,entity_name,user_id) values ('"+op_id+"','schema_reset','"+version+"','"+user_id+"')");
		  res.send(code);
	  }catch(err){
		  throw err;
	  }
	});

//For resetting we are using cliosuite_schema_info as we want to delete all created tables.
//This will remain same across app versions - basic/std/premium
function resetDBSchema(version){
	var tables = [];
	var code;
	try{
	dbConnection.query("select `table_name` from `cliosuite_schema_info`")
    .then(([rows]) => {
    	for(row in rows){
    		tables[row]={name: rows[row].table_name};
    	}
    });
	for(table in tables){
			dbConnection.execute("delete from "+tables[table].name);
			dbConnection.execute("drop table "+tables[table].name);
	}
	}catch(err){
		throw err;
	}
	//run mysql script to create all the tables again.
	try{
		runCreateTablesScript(version);
	}catch(err){
		res.send(err);
	}
}

function runCreateTablesScript(version){
	//pick the cleanDB.sql file of the date and re-write the functions getAllTableNames, 
	//getSchemaWithMetaInfo, isNumberField, getInaccessibleTableList, getMaxRowCount, getMaxColCount


}

router.post('/reloadDataToTables', function(req, res){
	  var backup_id = req.query.backup_id;
	  var code = reloadData(backup_id);
	  res.send(code);
	});

function reloadData(backup_id){
	//select all table names for backup_id
	//check if they exist identical- with same subset of columns in the current schema.
	//If true, then insert the data.
	

}

/////// End of backup ///////




/////////////////////// Core DB Maintenance operations ////////////////////////

function isMaxRowsCountReached(tableName){
	var maxRowsLimit = getMaxRowCount(tableName);
	var userContext = req.userContext;
	dbConnection.query("select * from "+tableName)
    .then(([rows]) => {
    	if(rows.length== maxRowsLimit){
    		var errMsg = "Maximum rows count reached. Please delete records to add new or upgrade your plan.";
    		res.render('files',{userContext, errMsg});
    	}
    	
    });
}

function isNumberField(fieldName){
	var numberFields = ["inventory_count","threshold_percent","threshold_count",
		  "count","quantity","product_price","other_tax_percent","shipping_charges",
		  "shelf_life_months","threshold_1_percent","threshold_2_percent","threshold_1_count",
		  "threshold_2_count","backorder_count","product_variety_count","service_charges","service_tax",
		  "convinience_charge","max_weight","max_volume","min_duration","max_duration","local_min_duration","local_max_duration",
		  "local_min_distance","local_max_distance","local_min_amt","local_max_amt","nat_min_amt",
		  "nat_max_amt","intl_min_amt","intl_max_amt","nat_min_distance","nat_max_distance",
		  "intl_min_distance","intl_max_distance","nat_min_duration","nat_max_duration",
		  "intl_min_duration","intl_max_duration","ec_min_amt","ec_max_amt","ec_min_duration",
		  "ec_max_duration","ex_min_amt","ex_max_amt","ex_min_duration","ex_max_duration","special_cat_charges",
		  "radial_distance","bogo_item_quantity","bogo_free_item_qty","flat_amount","percent_amount",
		  "min_order_amount","max_order_amount","voucher_amount","giftcard_amount"];
	
	if(numberFields.indexOf(fieldName)>0)
		return true;
    else
		return false;
}

function getInaccessibleTableList(version){
	if(version=='june_18_2020-basic')
		return ['manual_order','order_products_list','order_services_list','web_call',
			'inventory_update','purchase_order','transfer_order'];
	else return ['manual_order','order_products_list','order_services_list','web_call',
		'inventory_update','purchase_order','transfer_order','db_backup_tables'];
}

function getAllTableNames(version){
	
	if(version == 'june_18_2020-basic')
			return ['filenames','image_filenames','video_filenames','i3D_filenames','media_entity','filedata','contact',
		'store','store_images_list','store_products_list','store_services_list','store_fc_list','store_delivery_services_list','store_personnel_list',
		'fc','fc_personnel_list','fc_products_list','fc_delivery_services_list','personnel','personnel_services_list',
		'personnel_stores_list','personnel_fc_list','personnel_delivery_services_list','product','product_images_list',
		'product_services_list','product_delivery_services_list','product_stores_list','product_fcs_list',
		'product_cross_sell_list','product_upsell_list','product_highlights_list','product_variety_list','product_variety_type_list',
		'service','service_images_list','service_highlights_list','service_products_list','service_related_services_list',
		'service_stores_list','service_fcs_list','delivery_service','delivery_service_stores_list','delivery_service_fcs_list',
		'pricing_rule','pricing_rule_products_list','pricing_rule_services_list','pricing_rule_customer_locations_list',
		'pricing_rule_hotspots_list','pricing_rule_stores_list','pricing_rule_fcs_list','coupon','coupon_products_list',
		'coupon_services_list','coupon_delivery_services_list','coupon_customers_list','voucher','voucher_products_list',
		'voucher_services_list','voucher_item_category_list','voucher_customers_list','gift_card','gift_card_category_list',
		'manual_order','customer','order_products_list','order_services_list','web_call','inventory_update','purchase_order','transfer_order'];
		
	else return ['filenames','image_filenames','video_filenames','i3D_filenames','media_entity','filedata','contact',
			'store','store_images_list','store_products_list','store_services_list','store_fc_list','store_delivery_services_list','store_personnel_list',
			'fc','fc_personnel_list','fc_products_list','fc_delivery_services_list','personnel','personnel_services_list',
			'personnel_stores_list','personnel_fc_list','personnel_delivery_services_list','product','product_images_list',
			'product_services_list','product_delivery_services_list','product_stores_list','product_fcs_list',
			'product_cross_sell_list','product_upsell_list','product_highlights_list','product_variety_list','product_variety_type_list',
			'service','service_images_list','service_highlights_list','service_products_list','service_related_services_list',
			'service_stores_list','service_fcs_list','delivery_service','delivery_service_stores_list','delivery_service_fcs_list',
			'pricing_rule','pricing_rule_products_list','pricing_rule_services_list','pricing_rule_customer_locations_list',
			'pricing_rule_hotspots_list','pricing_rule_stores_list','pricing_rule_fcs_list','coupon','coupon_products_list',
			'coupon_services_list','coupon_delivery_services_list','coupon_customers_list','voucher','voucher_products_list',
			'voucher_services_list','voucher_item_category_list','voucher_customers_list','gift_card','gift_card_category_list',
			'manual_order','customer','order_products_list','order_services_list','web_call','contact','inventory_update','purchase_order','transfer_order'];
}

function getNumberFields(tableName){
	var schemaFields = getSchema(tableName).split(",");
	var numberFields = [];
	for(field in schemaFields){
		if(numberFields.indexOf(schemaFields[field])>0)
			numberFields.push(schemaFields[field]);
	}
	return numberFields.join(",");
}

function getUniqueKeySet(tableName){
	var schema = []
	schema = getSchemaWithMetaInfo(tableName).split(",");
	var uk_set = [];
	var i = 0;
	for(i in schema){
		if(schema[i].includes("uk_") == true){
			uk_set.push(schema[i].replace('uk_',''));
		}
	}
	return uk_set;
}

function getSchema(tableName){
	var fields = getSchemaWithMetaInfo(tableName).split(",");
	var onlyFields = [];
	for(field in fields){
		onlyFields.push(fields[field].replace("uk_",""));
		if(field == fields.length-3)
			break;
	}
	return onlyFields;
}

function getMaxRowCount(tableName){
	var schemaFields = getSchemaWithMetaInfo(tableName).split(","); 
	return parseInt(schemaFields[schemaFields.length-2],10);
}

function getMaxColCount(tableName){
	var schemaFields = getSchemaWithMetaInfo(tableName).split(","); 
	return parseInt(schemaFields[schemaFields.length-1],10);
}

function populateDBMetadata(version){
	var table_names = getAllTableNames(version);
	var inaccessible_table_list = getInaccessibleTableList();
	var i =0;
	var code;
	for(i in table_names){
		var is_accessible = 1;
		if(inaccessible_table_list.indexOf(table_names[i]) > 0)
			is_accessible = 0;
		code = dbConnection.execute("insert into `cliosuite_schema_info` values('"+table_names[i]+
				"','"+getSchema(table_names[i])+"','"+getUniqueKeySet(table_names[i]).join(",")+
				"','"+getNumberFields(table_names[i])+"',"+getMaxRowCount(table_name[i])+","+
				getMaxColCount(table_name[i])+","+is_accessible+")");
		i++;
	}
	res.send(code);
}

////////////////// Currently in use ///////////////////////

function getSchemaWithMetaInfo(tableName){
	
	if(tableName == "store"){
		return "store_name,store_tag_line,store_description,is_fc,store_type,store_geo_coverage,store_presence," +
				"uk_store_id,store_admin_email,mobile_std_code,store_mobile,store_address,store_website," +
				"opening_time,closing_time,created_at,modified_at,5,30";
	}
	if(tableName == "store_images_list"){
		return "uk_store_id,uk_image_id,image_url,image_tag,created_at,modified_at,15,10";
	}
	if(tableName == "store_products_list"){
		return "uk_store_id,uk_product_id,inventory_count,created_at,modified_at,50,10";
	}
	if(tableName == "store_services_list"){
		return "uk_store_id,uk_service_id,count,created_at,modified_at,20,10";
	}	
	if(tableName == "store_fc_list"){
		return "uk_store_id,uk_fc_id,created_at,modified_at,10,10";
	}
	if(tableName == "store_delivery_services_list"){
		return "uk_store_id,uk_delivery_services_id,created_at,modified_at,5,10";
	}//end of store
	if(tableName == "fc"){
		return "fc_name,fc_description,uk_fc_id,fc_admin_email,mobile_std_code,fc_mobile,fc_address,opening_time,closing_time,created_at,modified_at,5,20";
	}
	if(tableName == "fc_personnel_list"){
		return "uk_fc_id,uk_personnel_id,personnel_role,created_at,modified_at,10,10";
	}
	if(tableName == "fc_products_list"){
		return "uk_fc_id,uk_product_id,inventory_count,created_at,modified_at,100,10";
	}
	if(tableName == "fc_services_list"){
		return "uk_fc_id,uk_service_id,created_at,modified_at,5,10";
	}	
	if(tableName == "fc_delivery_services_list"){
		return "uk_fc_id,uk_delivery_services_id,created_at,modified_at,5,10";
	}//end of FC
	if(tableName == "personnel"){
		return "uk_personnel_id,title,first_name,middle_name,last_name,per_suffix,email,department,other_department,mobile_std_code,personnel_mobile,personnel_address,social_security_number,date_of_joining,date_of_leaving,reporting_time,signoff_time,reporting_personnel_id,created_at,modified_at,20,30";
	}
	if(tableName == "personnel_services_list"){
		return "uk_personnel_id,uk_service_id,created_at,modified_at,5,10";
	}
	if(tableName == "personnel_stores_list"){
		return "uk_personnel_id,uk_store_id,created_at,modified_at,3,10";
	}
	if(tableName == "personnel_fc_list"){
		return "uk_personnel_id,uk_fc_id,created_at,modified_at,1,10";
	}	
	if(tableName == "personnel_delivery_services_list"){
		return "uk_personnel_id,uk_delivery_services_id,created_at,modified_at,5,10";
	}//end of personnel
	if(tableName == "product"){
		return "uk_product_id,product_title,product_desc,preorder_flag,product_start,product_end,product_price," +
				"product_price_currency,tax_type,other_tax_perc,product_category,product_subcategory," +
				"shipping_charges,special_category,shelf_life_months,threshold_1_perc,threshold_1_count," +
				"threshold_2_perc,threshold_2_count,backorder_flag,backorder_count,supplier_email,created_at,modified_at,100,50";
	}
	if(tableName == "product_images_list"){
		return "uk_product_id,uk_image_id,created_at,modified_at,500,10";
	}
	if(tableName == "product_services_list"){
		return "uk_product_id,uk_service_id,created_at,modified_at,500,10";
	}
	if(tableName == "product_delivery_services_list"){
		return "uk_product_id,uk_delivery_service_id,created_at,modified_at,500,10";
	}
	if(tableName == "product_stores_list"){
		return "uk_product_id,uk_store_id,count,created_at,modified_at,300,10";
	}
	if(tableName == "product_fcs_list"){
		return "uk_product_id,uk_fc_id,count,created_at,modified_at,100,10";
	}
	if(tableName == "product_cross_sell_list"){
		return "uk_product_id,uk_cross_sell_product_id,created_at,modified_at,500,10";
	}
	if(tableName == "product_upsell_list"){
		return "uk_product_id,uk_upsell_product_id,created_at,modified_at,500,10";
	}
	if(tableName == "product_highlights_list"){
		return "product_id,uk_property_id,property_name,property_value,created_at,modified_at,500,10";
	}
	if(tableName == "product_variety_list"){
		return "uk_product_id,uk_product_variety_name,product_variety_count,product_variety_image,created_at,modified_at,1000,10";
	}
	if(tableName == "product_variety_type_list"){
		return "uk_product_id,uk_product_variety_param,uk_product_variety_value,created_at,modified_at,1000,10";
	}//end of product
	if(tableName=="service"){
		return "uk_service_id, service_name,service_description," +
  		"service_start,service_end,currency,service_charges,service_tax,convinience_charge," +
  		"service_type,created_at,modified_at,20,20";
	}
	if(tableName == "service_images_list"){
		return "uk_service_id,uk_image_id,created_at,modified_at,100,10";
	}
	if(tableName == "service_highlights_list"){
		return "uk_service_id,uk_attribute_id,attribute_name,attribute_value,created_at,modified_at,100,10";
	}
	if(tableName == "service_products_list"){
		return "uk_service_id,uk_product_id,created_at,modified_at,100,10";
	}
	if(tableName == "service_related_services_list"){
		return "uk_service_id,uk_related_service_id,created_at,modified_at,100,10";
	}
	if(tableName == "service_stores_list"){
		return "uk_service_id,uk_store_id,created_at,modified_at,100,10";
	}
	if(tableName == "service_fcs_list"){
		return "uk_service_id,uk_fc_id,created_at,modified_at,40,10";
	}//end of service
	if(tableName == "delivery_service"){
		return "uk_delivery_service_id,delivery_service_name,delivery_service_desc,vendor,new_vendor," +
				"start_date,end_date,max_weight,weight_metric,max_volume,volume_metric,currency,min_amount," +
				"max_amountmin_duration,max_duration,local_min_amt,local_max_amt,local_vendor," +
				"local_new_vendor,local_duration_param,local_min_duration,local_max_duration,local_min_distance,local_max_distance," +
				"nat_min_amt,nat_max_amt,nat_vendor,nat_new_vendor,nat_duration_param,nat_min_duration,nat_max_duration,"+
				"intl_min_amt,intl_max_amt,intl_vendor,intl_new_vendor,intl_duration_param,intl_min_duration,intl_max_duration," +
				"ec_min_amt,ec_max_amt,ec_vendor,ec_new_vendor,ec_duration_param,ec_min_duration,ec_max_duration," +
				"ex_min_amt,ex_max_amt,ex_vendor,ex_new_vendor,ex_duration_param,ex_min_duration,ex_max_duration," +
				"is_precious,is_fragile,is_liquid,is_inflammable,is_sharp,is_drugs,other_special_cat,special_cat_charges,created_at,modified_at,5,200";
	}
	if(tableName == "delivery_service_stores_list"){
		return "uk_delivery_service_id,uk_store_id,created_at,modified_at,50,10";
	}
	if(tableName == "delivery_service_fcs_list"){
		return "uk_delivery_service_id,uk_fc_id,created_at,modified_at,50,10";
	}
	if(tableName == "pricing_rule"){//start of pricing rule
		return "uk_pricing_rule_id,pricing_rule_name,pricing_rule_desc,dynamic_flag," +
	  		"start_date,end_date,target_param_1,rule_condition,target_param_2,target_time_param,timing_start_1," +
	  		"timing_start_2,timing_start_3,timing_start_4,timing_start_5,timing_end_1,timing_end_2,timing_end_3," +
	  		"timing_end_4,timing_end_5,all_days,monday,tuesday,wednesday,thursday,friday,saturday,sunday," +
	  		"new_year,black_friday,diwali,holi,navratri,christmas,eid,all_festivals,custom_day,cust_date," +
	  		"custom_day_1,cust_date_1,custom_day_2,cust_date_2,target_location_param,radial_distance,created_at,modified_at,10,150";
	}
	if(tableName == "pricing_rule_products_list"){
		return "uk_pricing_rule_id,uk_product_id,count,created_at,modified_at,300,10";
	}
	if(tableName == "pricing_rule_services_list"){
		return "uk_pricing_rule_id,uk_service_id,count,created_at,modified_at,100,10";
	}
	if(tableName == "pricing_rule_customer_locations_list"){
		return "uk_pricing_rule_id,uk_coordinate_id,latlng,created_at,modified_at,30,10";
	}
	if(tableName == "pricing_rule_hotspots_list"){
		return "uk_pricing_rule_id,uk_coordinate_id,latlng,created_at,modified_at,30,10";
	}
	if(tableName == "pricing_rule_stores_list"){
		return "uk_pricing_rule_id,uk_store_id,created_at,modified_at,50,10";
	}
	if(tableName == "pricing_rule_fcs_list"){
		return "uk_pricing_rule_id,uk_fc_id,created_at,modified_at,50,10";
	}//end of pricing rule
	if(tableName == "coupon"){//start of coupon
		return "uk_coupon_id,coupon_name,coupon_desc,coupon_type," +
	  		"application_type,cs_start_1,cs_end_1,bogo_item_id,bogo_item_qty,bogo_free_item_id,bogo_free_item_qty," +
	  		"currency,flat,percent,min_order_amt,max_order_amt,intrument_type,new_payment_gateway," +
	  		"banks_and_cards,free_target_item_id,free_item_id_1,free_item_id_2,free_item_id_3,free_item_id_4," +
	  		"all_prods,all_services,all_delivery_services,all_customers,selected_items,created_at,modified_at,30,100";
	}
	if(tableName == "coupon_products_list"){
		return "uk_coupon_id,uk_product_id,created_at,modified_at,50,10";
	}
	if(tableName == "coupon_services_list"){
		return "uk_coupon_id,uk_service_id,created_at,modified_at,30,10";
	}
	if(tableName == "coupon_delivery_services_list"){
		return "uk_coupon_id,uk_delivery_service_id,created_at,modified_at,10,10";
	}
	if(tableName == "coupon_customers_list"){
		return "uk_coupon_id,uk_customer_email,created_at,modified_at,30,10";
	}//end of coupon
	if(tableName == "voucher"){//start of voucher
		return "uk_voucher_id,voucher_name,voucher_desc,start_v,end_v,voucher_type,currency,voucher_amount,created_at,modified_at,20,20";
	}
	if(tableName == "voucher_products_list"){
		return "uk_voucher_id,uk_product_id,created_at,modified_at,30,10";
	}
	if(tableName == "voucher_services_list"){
		return "uk_voucher_id,uk_service_id,created_at,modified_at,15,10";
	}
	if(tableName == "voucher_item_category_list"){
		return "uk_voucher_id,uk_category_name,created_at,modified_at,50,10";
	}
	if(tableName == "voucher_customers_list"){
		return "uk_voucher_id,uk_customer_email,created_at,modified_at,30,10";
	}//end of voucher
	if(tableName == "gift_card"){ //start of gift card
		return "uk_giftcard_id,giftcard_name,giftcard_desc,start_gc," +
	  		"end_gc,voucher_type,currency,giftcard_amount,giftcard_delivery_mode,giftcard_title,giftcard_body,giftcard_image_url,created_at,modified_at,10,50";
	}
	if(tableName == "gift_card_category_list"){
		return "uk_giftcard_id,uk_category_name,created_at,modified_at,50,10";
	}//end of GC
	if(tableName == "manual_order"){ //manual order
		return "uk_order_id,customer_first_name,customer_last_name,customer_email," +
	  		"country_code,customer_mobile,order_title,product_id,service_id,product_delivery_date,service_delivery_date,payment_mode,currency,created_at,modified_at,100,30";
	}
	if(tableName == "customer"){ 
		return "uk_customer_id,customer_first_name,customer_last_name,customer_email," +
		  		"country_code,customer_mobile,currency,created_at,modified_at,50,20";
	}
	if(tableName == "order_products_list"){
		return "uk_order_id,uk_product_id,count,created_at,modified_at,500,10";
	}
	if(tableName == "order_services_list"){
		return "uk_order_id,uk_service_id,count,created_at,modified_at,300,10";
	}
	if(tableName == "web_call"){ //video call
		return "uk_call_id,callee_first_name,callee_last_name,callee_email,callee_mobile_country_code,callee_mobile_number," +
		  		"start_time,end_time,call_title,call_category,call_status,created_at,modified_at,30,30";
	}
	if(tableName == "inventory_update"){ //inventory management
		return "uk_product_id,delta_quantity,uk_store_id,uk_fc_id,uk_created_at,modified_at,30,10";
	}
	if(tableName == "purchase_order"){ 
		return "uk_purchase_order_id,supplier_email,product_id,quantity,measure,created_at,modified_at,20,10";
	}
	if(tableName == "transfer_order"){ 
		return "uk_transfer_order_id,fc_email,product_id,quantity,measure,created_at,modified_at,15,10";
	}
	if(tableName == "filenames"){ 
		return "uk_file_id,filename,file_type,created_at,modified_at,20,10";
	}
	if(tableName == "filedata"){ 
		return "uk_file_id,file_data,created_at,modified_at,500,10";
	}
	if(tableName == "image_filenames"){ 
		return "uk_file_id,filename,file_type,created_at,modified_at,300,10";
	}
	if(tableName == "video_filenames"){ 
		return "uk_file_id,filename,file_type,created_at,modified_at,30,10";
	}
	if(tableName == "i3D_filenames"){ 
		return "uk_file_id,filename,file_type,created_at,modified_at,30,10";
	}
	if(tableName == "media_entity"){ 
		return "uk_file_id,uk_entity_id,created_at,modified_at,300,10";
	}
	if(tableName == "contacts"){ 
		return "uk_contact_id,title,contact_first_name,contact_middle_name," +
				"contact_last_name,contact_type,contact_email,contact_email1,contact_email2," +
				"contact_mobile_country_code,contact_mobile_number,contact_mobile_country_code1,contact_mobile_number1,contact_address_home,contact_address_work," +
				"contact_ssn,contact_company_name,contact_website,contact_birthday," +
				"contact_social_media,contact_status,start_time_to_call,end_time_to_call," +
				"status_change_reason,multimedia_filename,multimedia_filename1,created_at," +
				"modified_at,100,40";
	}
	if(tableName == "groups"){
		return "uk_group_id,group_name,group_desc,group_tag_line,group_category,group_scope,group_status," +
				"status_change_reason,group_admin_id,group_email_id,group_storage_drive_link," +
				"group_website,group_social_media," +
				"group_start,group_end,multimedia_filename,created_at,modified_at,15,40";
		}
	if(tableName == "group_members"){ 
		return "uk_group_id,uk_contact_id,contact_email,created_at,modified_at,300,10";
	}
	
	else {
		return "Schema not found!";
	}
}

/////////////////////// End of core DB maintenance operations /////////////////////////

function getTwoDigitRandom(){
	   var min = 11;
	   var max = 99;
	   let r = Math.random()* (max - min) + min; 
	   return Math.floor(r);
}

function getCurrentSchemaVersion(){
	var current_db_schema;
	try{
		  dbConnection.query("select `config_value` from `cliosuite_config` where `config_name` like 'current_db_schema'")
		    .then(([rows]) => {
		    	for(row in rows){
		    		current_db_schema={name: rows[row].config_value};
		    		break;
		    	}
		    }); 
	  }catch(err){
		  throw err;
	  }
	  
	  return JSON.stringify(JSON.parse(current_db_schema)['name']).trim();
}


/************** End of Database operations and helpers *****************/




