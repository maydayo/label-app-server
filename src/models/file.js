import mongoose from 'mongoose'

const FileSchema = new mongoose.Schema({
  id: String,
  path: String,
  filename: String,
  mimetype: String,
}, {
  timestamps: true
})

const File = mongoose.model('File', FileSchema)

export default File
