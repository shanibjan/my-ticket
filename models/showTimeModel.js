import mongoose from "mongoose";

const singleShowSchema = new mongoose.Schema({
  showsTime: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,

    trim: true,
  },
 
});

const showTimeSchema = new mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true },
   
    show: [singleShowSchema],
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists to avoid OverwriteModelError
const showTime =
  mongoose.models.showtime || mongoose.model("showtime", showTimeSchema);

export default showTime;
