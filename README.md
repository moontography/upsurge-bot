# upsurge-bot

Bot to check and call upsurge for the SURGE token.

## Run

```sh
$ docker build -t ub .
$ docker run --rm -e ACCOUNT_PK=[THE_KEY] ub
```

## Crontab

```sh
*  *    * * *   root    /usr/bin/docker run --rm -e ACCOUNT_PK=[THE_KEY] ub
```
