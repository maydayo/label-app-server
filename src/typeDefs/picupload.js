import { gql } from "apollo-server-express";

export default gql`
  scalar Date

  extend type Query {
    files: [File] # Query list of all of video file
  }

  extend type Mutation {
    uploadFile(file: Upload!): File! # Upload Video
  }

  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    createdAt: Date
  }
`;
