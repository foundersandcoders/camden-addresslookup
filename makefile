all:
	make dep 
	make json 
	make t 
	make s

s:
	node server.js

t:
	./node_modules/tape/bin/tape ./test/*.js | ./node_modules/.bin/tap-spec

tc:
	./node_modules/.bin/istanbul cover ./node_modules/tape/bin/tape ./test/*.js | ./node_modules/.bin/tap-spec

json:
	./node_modules/csvtojson/bin/csvtojson ./lib/address.csv > ./lib/address.json

dep:
	npm install


.PHONY: e t json dep all tc
