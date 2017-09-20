![Formcarry CLI](https://s3-us-west-2.amazonaws.com/formcarry/repo-banner.jpg "Formcarry CLI")

## Usage
Formcarry CLI enables form creation, listing and removing forms in your terminal.

Installation:
```
$ npm install -g formcarry-cli
```

Login to Your Account:
```
$ formcarry login
```

## Available Commands:
Command | Description
--- | ---
login | login to your formcarry account
add [options] <name> | create a new form
delete <id> | delete form with id
forms | List your forms

## Create A New Form:
```
$ formcarry add "My Sweet Form"
```
Output:
```
✔ Your form was successfully created
✔ Your endpoint url copied to clipboard:
https://formcarry.com/s/BywEPAJNb
```

### Available Options:
Option | Description
--- | ---
-n, --notify <notify> | notify those email adresses, split with comma
-r, --return <return> | specify return url

### With options:
```
$ formcarry add "My Sweet Form" -r "https://myreturnurl.io" -n "myfist@mail.com, mysecond@mail.com"
```
Output:
```
✔ Your form was successfully created
✔ Your endpoint url copied to clipboard:
https://formcarry.com/s/BywEPAJNb
```

## Deleting Form:
```
$ formcarry delete BJedGRDQZ
```
Output:
```
✔ Your form was successfully deleted.
```

## Listing Forms:
```
$ formcarry forms
```
Output:
```
┌───────────┬──────────────────┬─────────────────────────────┐
│ ID        │ Name             │ Created At                  │
├───────────┼──────────────────┼─────────────────────────────┤
│ rJwOBh6XZ │ First.           │ June 26th 2017, 1:12:39 am  │
├───────────┼──────────────────┼─────────────────────────────┤
│ BJedGRDQZ │ Second.          │ June 21st 2017, 2:01:27 pm  │
└───────────┴──────────────────┴─────────────────────────────┘
```