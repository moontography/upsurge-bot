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
*  *    * * *   root    sleep 10 && /usr/bin/docker run --rm -e ACCOUNT_PK=[THE_KEY] ub
*  *    * * *   root    sleep 20 && /usr/bin/docker run --rm -e ACCOUNT_PK=[THE_KEY] ub
*  *    * * *   root    sleep 30 && /usr/bin/docker run --rm -e ACCOUNT_PK=[THE_KEY] ub
*  *    * * *   root    sleep 40 && /usr/bin/docker run --rm -e ACCOUNT_PK=[THE_KEY] ub
*  *    * * *   root    sleep 50 && /usr/bin/docker run --rm -e ACCOUNT_PK=[THE_KEY] ub
```
