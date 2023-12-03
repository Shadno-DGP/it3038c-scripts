Documentation:

The goal of this project is to 
1) Take a screenshot of the display
2) Provide an to opportunity to input a filename
3) Upload the file, with its new filename, to my google drive account

Why is this useful:
I believe this is useful because it pertains specifically to the goals I find myself exploring in class, aka submitting assignments where screenshots are required, especially when taking the screenshots locally and then transferring them over to my non sandbox account for uploading (or 2fa-ing into my sandbox machine) is a pain. 

Its much less of a hassle to simply run the script, and have google drive open to download the output to throw into a waiting word document.
additionally, I usually make my word docs in google drive then save them, so I can add the images directly from drive into the doc and skip any form of normal file manager.

How does the project work:
It runs by doing sh screenShot.sh 
this announces the start of the process. After 5 seconds (so you can go to what you want to screenshot) it will take an ss of the entire screen using gnome-screenshot and ask for a console input of the filename. (It also attempts to audibly announce when the screenshot is taken but this appears to break on sandbox, I was able to get it working on a personal vm)

It will then upload the file to google drive and announce the completion or failure of the process, as well as deleting the local file.

