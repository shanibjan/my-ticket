import mongoose from "mongoose";

const singleShowSchema = new mongoose.Schema({
  showsTime: {
    type: String,
    required: true,
  },
  seats: [{ type: String, required: true }],
  date: {
    type: String,
    required: true,
    trim: true,
  },

  expiresAt: {
    type: Date,
    required: true, // Keep track of expiry for manual deletion
  },
});
// singleShowSchema.index({ expiresAt: 1 });
// Pre-save hook to calculate and set expiresAt
singleShowSchema.pre("validate", function (next) {
  if (!this.expiresAt && this.showsTime && this.date) {
    const [time, minutesWithPeriod] = this.showsTime.split(":");
    const [minutes, period] = minutesWithPeriod.split(" ");
    const hours = (parseInt(time) % 12) + (period === "PM" ? 12 : 0);
    const parsedMinutes = parseInt(minutes);

    // Format the date to include the current year, and then calculate the correct date object
    const showDate = new Date(`${this.date} ${new Date().getFullYear()}`);
    showDate.setHours(hours, parsedMinutes, 0, 0);

    // Set expiresAt to 20 minutes before the show time
    this.expiresAt = new Date(showDate.getTime() - 20 * 60 * 1000);
  }

  next();
});

const showTimeSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movie",
      required: true,
    },
    show: [singleShowSchema],
  },
  {
    timestamps: true,
  }
);

const showTime =
  mongoose.models.showtime || mongoose.model("showtime", showTimeSchema);

export default showTime;
