# gcal-agent
The gcal-agent is agent registers google calendar event.

# Development
This project is google apps script source and uses clasp for deploying, pushing, etc.

## Attention

**Please `export` only function** if you edit source code.
The '`clasp` with typescript' does not support `export` object and class.
If you do so, You should see runtime error when execute google app script.

## Way to start development
After clone this project, execute below commands.
```bash
npm install
```
And you can push your source to google apps script. 
```
npm run push
```
## Run in GAS
If you want to check your edited code on the google apps script project, you need to do several process.
Please see https://github.com/google/clasp#run about more details.

1. `npx clasp open --creds` to open credentials page of GCP
1. Download the json file (⬇) of `gcal-oauth-agent`
1. do `clasp login --creds creds.json` for authentication and authorization

Then, do this. 
```bash
npm run do-process-in-gas
```
You can try variable input text with changing `test/resources/example_event_parameter.json`'s `parameter.text` 

