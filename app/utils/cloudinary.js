const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'elnic', 
  api_key: '678984399782641', 
  api_secret: 'LUKd9zCF_WGacbiHjPGnQX0a1eA' 
});

module.exports = cloudinary;