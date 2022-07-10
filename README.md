# How to run this thing

```npm install --legacy-peer-deps```
...just React 18 things... and then
```npm run start```

or you can build a docker image, assuming you are in the root directory run:
```
docker build -t todo:latest .
docker run -dp 3001:3000 -t todo:latest
```
where 3000 is default React port and 3001 exposed docker port