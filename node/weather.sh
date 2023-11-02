#!/bin/bash

# This script downloads weather data and displays it

exec > logfile.txt

DATA=$(curl 'https://api.open-meteo.com/v1/forecast?latitude=37&longitude=126&current=temperature_2m,is_day')

Temp=$(echo $DATA | jq -r ".")


echo "The conditions in Seoul are $Temp"
