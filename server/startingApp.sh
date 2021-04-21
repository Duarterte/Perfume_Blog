#!/bin/sh
hostNameOs=""
hostNameOs=$(cat /etc/*-release | grep NAME | head -n1 | cut -d "=" -f2 | cut -d " " -f1 | egrep -oh [a-zA-Z]+ );

if [[ $hostNameOs == "Alpine" ]]; then
	myLocalIp=$(hostname -i);
	echo "HOSTNAME="$myLocalIp > .env;
	apk update &&
	apk add nodejs &&
	apk add npm &&
	npm install & wait $! && sleep 30 &&
	npm start;
else
	echo -ne 'DB_USER=futzi\nDB_PASS=bisu' > .env;
fi;

