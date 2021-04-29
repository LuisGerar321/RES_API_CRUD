#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers...Holi...."
cd /var/www/html/
pm2 stop app.js