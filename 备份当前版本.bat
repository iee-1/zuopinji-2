@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist "_backup" mkdir "_backup"
copy /y "index.html" "_backup\index-last.html" >nul
copy /y "assets\js\works.js" "_backup\works-last.js" >nul
echo.
echo  备份完成：_backup\index-last.html  +  _backup\works-last.js
echo  改坏了就双击「恢复成备份.bat」
echo.
pause
