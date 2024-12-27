
const mongoose = require('mongoose');

const beachSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  glocation: { type: String, required: true },
  wlocation: { type: String, required: true }
}, {
  collection: 'beaches' 
});

module.exports = mongoose.model('Beach', beachSchema);
