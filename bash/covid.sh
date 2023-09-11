#!/bin/bash
# This script downloads covid data and displays it

DATA=$(curl https://api.covidtracking.com/v1/us/current.json)

POSITIVE=$(echo $DATA | jq '.[0].positive')
HOSPITALIZEDCURRENTLY=$(echo $DATA | jq '.[0].hospitalizedCurrently')
HOSPITALIZEDCUMULATIVELY=$(echo $DATA | jq '.[0].hospitalizedCumulative')
DEATH=$(echo $DATA | jq '.[0].death')

TODAY=$(date)
echo "On $TODAY, there were $POSITIVE positive COVID cases with $HOSPITALIZEDCURRENTLY hospitalized currently, $HOSPITALIZEDCUMULATIVELY hospitalized cumulatively and $DEATH deaths total"
:
