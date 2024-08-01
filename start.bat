@echo off
set prog=ragemp-server.exe
:waiting
tasklist |>nul FindStr /B /L /I /C:%prog%&&(ping -n 1 -w 1000 192.168.254.254>NUL & goto :waiting)
start "" "%prog%"
goto :waiting