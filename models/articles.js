const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { 
  	type: String, 
  	required: true 
  },
  
  url: { 
  	type: String, 
  	required: true 
  },
  
  synopsis: {
  	type: String,
  	required: false
  },

  saved: {
  	type: Boolean,
  	default: false
  },  

  date: { 
  	type: Date, 
  	required: true 
  }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
