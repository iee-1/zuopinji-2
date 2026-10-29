@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist "_backup" goto nobak
if exist "_backup\index-last.html" copy /y "_backup\index-last.html" "index.html" >nul
if exist "_backup\works-last.js" copy /y "_backup\works-last.js" "assets\js\works.js" >nul
echo.
echo  已恢复成上一次备份的版本，刷新网页看看。
echo.
pause
exit /b
:nobak
echo.
echo  没有 _backup 文件夹，无法恢复。
echo.
pause
