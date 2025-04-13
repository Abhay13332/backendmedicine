# backendmedicine
 here mongodb is database that is used in project
 here two dbs are used redis for caching and mongodb for datastore.
 to run all of this you need to use docker to run redis container and a mongodb container to run binded with mongodb file so that same data can be used .it contain roughly 1.2 lakh medicines.
 and also need to run redis container as it is dependency for it.
 #commands to bind docker to this db
 ```
docker pull mongo
docker run -d --name mongodb -v pathofyourdevice:/data/db -p 27017:27017 mongo

```
 
