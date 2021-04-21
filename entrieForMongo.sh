#!/bin/bash
#check if mongod process is running
declare -i mongoState;
bash -c "mongod  --bind_ip_all &" 1>/dev/null &
checkMongo() {
        mongoState=$(pgrep mongod);
        echo $mongoState;
}

#wait for the process being created
while [[ -z $mongoState ]] || [[ $mongoState < 1 ]]; do
        checkMongo;
        echo "waiting...";
        sleep 1;
done;
#below code only be executed if mongod dameon is enable (mongodb is full operative)
#do migrate the database from docker's volumes
cd /;
mongorestore --db perfumes ./db &&
tail -f /dev/null;