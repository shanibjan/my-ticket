import mongoose from "mongoose";
import moment from "moment-timezone";

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

    // Parse date and set timezone explicitly
    const showDate = moment
      .tz(`${this.date} ${new Date().getFullYear()}`, "MMM-DD YYYY", "UTC")
      .set({ hour: hours, minute: parsedMinutes, second: 0, millisecond: 0 });

    // Set expiresAt to 20 minutes before the show time
    this.expiresAt = showDate.subtract(20, "minutes").toDate();
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
