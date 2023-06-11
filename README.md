# MiniProjectChallenge
A typeahead suggestion input box for U.S. states, with a map marked dynamically. Frontend Vue2, Backend Node.js with GraphQL.

## Installations
### Frontend
$ npm install -g @vue/cli<br/>
$ npm install vue-apollo graphql apollo-client apollo-link-http apollo-cache-inmemory graphql-tag

### Backend
$ npm install express apollo-server-express graphql

## Run Project

### Backend
$ cd backend <br/>
$ node server.js<br/>
Open browser and go to [http://localhost:4000/graphql], use query <br/>
{ <br/>
states(name: "a") <br/>
} <br/>
to test if server running correctlly.
### Frontend
$ cd frontend<br/>
$ npm run serve<br/>
Open browser and go to [http://localhost:8080/] to test if frontend working.

