const express = require('express');
const app = express();
const execSync = require('child_process').execSync;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = express.Router();
const path = require('path');
const fs = require('fs');
app.use('/public', express.static('public'));
const dbConnection = require('./database');


router.get('/', (req, res) => {
	var userContext = req.userContext;
	var files = [];
	var media_files = [];
	var assigned_entities = [];
	var all_entities = [];
	var i = 0;
	var j = 0;
	var k = 0;
	var l = 0;
    dbConnection.query("select `file_id` FROM `filenames` where `file_type` like \"csv\"")
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
    dbConnection.query("select `file_id` FROM `filenames` union select `file_id` FROM `image_filenames` union select `file_id` from `video_filenames` union select `file_id` from `i3D_filenames`")
        .then(([rows]) => {
        	for(row in rows){
        		media_files[j]={name: rows[j].file_id};
        		j++;
        	}
        	res.render('files', {userContext, files, media_files, assigned_entities, all_entities})
        });
    	
    }); 



module.exports = router;



