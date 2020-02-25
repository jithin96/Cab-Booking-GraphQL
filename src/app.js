const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const port = process.env.PORT||4000

const app = express();


// connect to database

require('./db/connection')

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(port, () => {
    console.log(`now listening for requests on port ${port}`);
});
