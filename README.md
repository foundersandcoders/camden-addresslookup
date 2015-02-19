## API

The only endpoint is /search/{searchTerm}

It will return addresses that match the search term in the format:
```
[{
"UPRN": "number",
"Unit": "string",
"BuildingName": "string",
"BuildingNumber": number, 
"Street":"string",
"Town":"string",
"Postcode":"string"
}]
```
## Building
Requires address catalogue to be located in /lib as /lib/address.csv

THEN

```
make
```

OR

to install dependencies
```
make dep
```

to convert lib/address.csv to lib/address.json
```
make json
```

for tests:
```
make t
```

to run server
```
make s
```
