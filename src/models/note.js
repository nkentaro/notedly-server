// require the mongoose library
const mongoose = require('mongoose');

// define the note's database schema
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// define the 'Note' model with the schma
const Note = mongoose.model('Note', noteSchema);
// export the module
module.exports = Note;
