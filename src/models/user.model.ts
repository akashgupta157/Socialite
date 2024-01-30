const mongoose = require("mongoose");
const user = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dm5uvtj7t/image/upload/v1706622367/atwymgd8/exaerdufqcmkmwl9gll2.png",
    },
    bio: { type: String, default: "" },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.User || mongoose.model("User", user);
