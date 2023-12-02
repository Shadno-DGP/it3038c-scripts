

echo "Screenshot will be taken in 5 seconds, navigate to where you want to screenshot!"
sleep 5

gnome-screenshot -f upload.jpg
#takes ss using gnome
spd-say "Screenshot Taken, attempting Upload"

echo "upload.jpg has been saved successfully, moving to Upload step"
#sends confirmation message

node app.js
#runs next command

rm upload.jpg

