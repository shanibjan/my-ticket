import showTime from "@/models/showTimeModel";

export const removeExpiredShows = async () => {
  try {
    // Find and remove expired show entries from the "show" array of the showTime document
    const currentTime = new Date();

    const result = await showTime.updateMany(
      { "show.expiresAt": { $lte: currentTime } }, // Target expired shows
      {
        $pull: {
          show: { expiresAt: { $lte: currentTime } }, // Remove specific expired show object
        },
      }
    );

    
  } catch (error) {
    console.error("Error removing expired shows:", error);
  }
};
