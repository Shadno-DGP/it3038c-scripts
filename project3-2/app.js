
/*
 * Code largely taken from https://www.youtube.com/watch?v=1y0-IfRW114
 * I added comments & modified the try and catch statements with different messages
 * I also modified the filename to be dynamic and based off the input name 
*/


const { google } = require('googleapis');
const CLIENT_ID = '625618672674-in9faqrgvhfose0mi9nuve41dt82qav8.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04WuS8VrF2SzACgYIARAAGAQSNwF-L9IrjJc6YVOzYdfsdmn8rHyiLB7XUbkyw7kLlQ89bf8IEcZzQ7g5eWoUfdHzHcO8DPWhDs8';
//information from google console cloud api dashboard & Oath2 playground


const oauth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URL
);
//uses pregathered information to authenticate with google services

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const path = require('path')
const fs = require('fs')
//include path & filesystem module

const drive = google.drive({
	version: 'v3',
	auth: oauth2Client
})
//define drive

const filepath = '/home/Teleb/it3038c-scripts/project3-2/upload.jpg'
//define filepath, in this case a static filepath is used because this upload is intended to only happen once, with subsequent uploads overriding previous ones.

async function uploadFile() {
	try {
	const response = await drive.files.create({
	requestBody:  {
	name: 'upload.jpg'
	},
	media: {
	mimeType: 'image/jpeg',
	body: fs.createReadStream(filepath)
},
//define file and its media type, grab file from filepath using fs
})
console.log("Upload successful to Google Drive")
} catch (error) {
	console.log("Upload failed: " + error.message)
}}
//try and catch will attempt to first upload file, then if it fails pop the error message in. 

uploadFile();
//run function
