import { gql } from "apollo-server-express";

export default gql`
  scalar Date

  extend type Query {
    files: [File] # Query list of all of video file
    fileUrlsByDate(startDate: Date!, finishDate: Date!): [String]!
  }

  extend type Mutation {
    uploadFile(file: Upload!,label:[LabelInput]): File! # Upload Video
    addFileInfo(path: String!, filename: String, mimetype: String): File
  }

  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    createdAt: Date!
    label: [Label]
  }

  type Label {
    viewWidth: Float!
    viewHeight: Float!
    startPointX: Float!
    stopPointX: Float!
    startPointY: Float!
    stopPointY: Float!
    labelTag: String!
  }

  input LabelInput {
    viewWidth: Float!
    viewHeight: Float!
    startPointX: Float!
    stopPointX: Float!
    startPointY: Float!
    stopPointY: Float!
    labelTag: String!
  }
`;
