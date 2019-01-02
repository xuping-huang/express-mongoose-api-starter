#! /bin/bash
mongoimport --host mongo --db apiKitDb --collection users --type json --file /mongo-seed/user.json --jsonArray
