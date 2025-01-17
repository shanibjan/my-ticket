import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      require: true,

      trim: true,
    },
    language: {
      type: String,
      require: true,
    },
    certificate: {
      type: String,
      require: true,
    },
    duration: {
      type: String,
      require: true,
    },
    trailerId: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    genre: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    release: {
      type: String,
      require: true,
    },
    overView: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists to avoid OverwriteModelError
const Movie = mongoose.models.movie || mongoose.model("movie", movieSchema);

export default Movie;
