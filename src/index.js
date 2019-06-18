import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const app = express();
const port = process.env.APP_PORT || 3005;

(async () => {
  mongoose.connect(
    // Connect to mongodb
    //`mongodb://localhost:27017/label_pic_database`,
    `mongodb://mongo:27017/label_pic_database`,
    { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false }
  );

  app.disable("x-powered-by");

  app.use('/files', (express.static('uploaded'))) // Serving Static Files

  const server = new ApolloServer({
    // Create Apollo Server
    typeDefs,
    resolvers,
    //playground: !IN_PROD,
    context: ({ req, res }) => ({ req, res })
  });

  server.applyMiddleware({ app });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})();
