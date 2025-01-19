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

    // Combine `date` and `showsTime` and treat it as LOCAL time
    const localDate = moment.tz(
      `${this.date} ${new Date().getFullYear()} ${hours}:${parsedMinutes}`,
      "MMM-DD YYYY HH:mm",
      "Asia/Kolkata" // Replace with your local timezone
    );

    // Convert the local time to UTC
    const utcDate = localDate.clone().utc();

    // Subtract 20 minutes from the UTC time
    this.expiresAt = utcDate.subtract(20, "minutes").toDate();

    console.log("Local Time:", localDate.format());
    console.log("UTC Time:", utcDate.format());
    console.log("Expires At (UTC):", this.expiresAt);
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
