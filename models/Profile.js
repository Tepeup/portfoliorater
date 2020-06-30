const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  favorites: [
    {
      name: {
        type: String,
        required: false,
      },
      page: {
        type: String,
        required: false,
      },
    },
  ],
});

const Profile = mongoose.model("profile", profileSchema);
module.exports = Profile;
