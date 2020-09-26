#!/bin/bash
cd /home/ec2-user/server
npm install --unsafe-perm
npm install --save react react-dom react-scripts
npm run build
npm install pm2 -g
