import { gql } from "apollo-server-express";

export default gql`
  scalar Date

  extend type Query {
    files: [File] # Query list of all of video file
    fileUrlsByDate(startDate: Date!, finishDate: Date!): [String]!
  }

  extend type Mutation {
    uploadFile(file: Upload!): File! # Upload Video
    addFileInfo(path: String!, filename:String, mimetype:String): File
  }

  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    createdAt: Date
  }
`;
