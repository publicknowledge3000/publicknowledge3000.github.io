@echo off

set NodePackagesPath=E:\Projects\OpenShift\Materials\Node.jsPackageManager

set Path=%NodePackagesPath%\node_modules\.bin;%PATH%
set Path=%NodePackagesPath%;%PATH%

set NODE_PATH=%NodePackagesPath%\node_modules;%NODE_PATH%
set NODE_ENV=production

node server.js

pause