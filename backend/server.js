const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

//U.S. states and territories List
const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "American Samoa",
  "District of Columbia",
  "Guam",
  "Northern Mariana Islands",
  "Puerto Rico",
  "U.S. Virgin Islands"
];

// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    states(name: String!): [String!]!
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    states: (parent, args, context, info) => {
      const { name } = args;
      return states.filter(state => state.toLowerCase().startsWith(name.toLowerCase()));
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server
server.start().then(() => {
  // Apply Apollo middleware to Express server
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`Server is running on http://localhost:4000${server.graphqlPath}`);
  });
});