
 # backendmedicine
 here mongodb is database that is used in project
 here two dbs are used redis for caching and mongodb for datastore.
 to run all of this you need to use docker to run redis container and a mongodb container to run binded with mongodb file so that same data can be used .it contain roughly 1.2 lakh medicines.
 and also need to run redis container as it is dependency for it.
 ```
video link-https://drive.google.com/file/d/1d6FCzzPP1Tbv-IlhzSVvd_uaHanzWa3O/view?usp=drive_link
```
 #commands to bind docker to this db
 ```
docker pull mongo
docker run -d --name mongodb -v {pathinyourdevicetomongodbfile}:/data/db -p 27017:27017 mongo

```
#redis setup
```
docker pull redis/redis-stack:latest
docker run -d --name redis-stack  -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```
if you use online redos then put it to .env
it is compulsory
#node backend run
```
npm run dev as it is fully configured
```
```
frontend need to this backeend
```
