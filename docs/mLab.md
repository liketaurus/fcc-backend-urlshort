
# Using mLab

My DB is running at url:

    mongodb://<dbuser>:<dbpassword>@ds139735.mlab.com:39735/liketaurusurls

To connect using the mongo shell:
    
    mongo ds139735.mlab.com:39735/liketaurusurls -u <dbuser> -p <dbpassword>
    
After Deploying to Heroku, we need to set the environment variable. To do this, we need to run the following command:

    heroku config:set MONGOLAB_URI=mongodb://<dbuser>:<dbpassword>@ds139735.mlab.com:39735/liketaurusurls

Thats all, folks!