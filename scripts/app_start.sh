
#!/bin/bash
cd /home/ec2-user/server
npm run build
npm run start:prod
pm2 serve /build 4000 --name "expenseTrackerApp" -- spa
pm2 startup
pm2 save
pm2 restart all