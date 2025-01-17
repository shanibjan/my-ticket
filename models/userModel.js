import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
     
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type:String,
      require:true,
    },
    interestedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true }],
   

  },
  {
    timestamps: true,
  }
);

// Check if the model already exists to avoid OverwriteModelError
const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
