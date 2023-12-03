
echo "Screenshot will be taken in 5 seconds, navigate to where you want to screenshot!"
sleep 5
#announces and then waits for 5 to take screenshot for user to navigate to correct location


gnome-screenshot -f upload.jpg
#takes ss using gnome
spd-say "Screenshot Taken, attempting Upload"
#announces screenshot verbally- broke on sandbox? ):

echo "upload.jpg has been saved successfully, moving to Upload step"
#sends confirmation message in console

node app.js
#runs next command

rm upload.jpg 
#removes upload file from local, since it is now uploaded.
