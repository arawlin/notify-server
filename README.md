# token-quant-server

## feature

- [x] html content
- [x] silent time according msg hash
- [x] no disturb. 00:00 ~ 6:59
- [x] time notify task. every 4 hours prior 30 mins. 3:30, 7:30

- [ ] translate content

## config

### translator

1. Create a service account key in the Google Cloud console

   Google Cloud Shell

   ```cmd
   gcloud init
   gcloud auth application-default login
   ```

1. Set the environment variable

   ```cmd
   export GOOGLE_APPLICATION_CREDENTIALS="KEY_JSON_PATH"
   ```

## template

`http://192.168.1.102:8080/?data=aaa`
`http://192.168.1.102:8080/?data={"subject":"aaa","text":"bbb"}`

`http://192.168.1.102:8080/?data=aaa&emails=xxx,yyy,zzz`
