import mongoose from 'mongoose'

export const labelSchema = mongoose.Schema({
  startPointX: Number,
  stopPointX: Number,
  startPointY: Number,
  stopPointY: Number,
  labelTag: String,
})

const Label = mongoose.model('Label', labelSchema)

export default Label
