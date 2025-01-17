import { removeExpiredShows } from "@/app/utils/removeExpiredShows";


export async function GET() {
  try {
    await removeExpiredShows();
    return new Response("Expired shows cleaned successfully!", { status: 200 });
  } catch (error) {
    return new Response("Error cleaning expired shows", { status: 500 });
  }
}
