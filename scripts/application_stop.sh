#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
cd /var/www/html/
pm2 stop app.js