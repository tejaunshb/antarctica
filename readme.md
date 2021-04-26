# Antarctica Project

## Antarctica Project is Node.js app using Express & mySQL.

Running Locally
Make sure you have Node.js and mySQL or phpMyAdmin.

## Quickstart

```
  git clone git@github.com:tejaunshb/antarctica.git 
  cd project_path
  npm install
  npm run server
  Your app should now be running on localhost:3000.

```

## File Structure
```
AntarcticaProject/
├── README.md             # overview of the project
├── server.js             # Entry Point 
├── package.json          # Metadata relevant to the project 
├── Package-lock.json     # To keep track of the exact version of every package that is installed 
├── .gitignore             
├── config/               # Config Folder
│   ├── config.js         
│   └── config_dev.js     
|   └── keys.js           
|   └── passport.js       # For Authentication
|   └── db.js             # Database Connection
├── Node_modules/         # Package Folder
├── Route/                # Route Folder
│   └── API        
│       └── user.js       # User Router
├── validation/           # Input Validation Folder
    ├── login.js         
    └── register.js     

```
