
import type { Room } from "../types/Room";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:7000";

export interface RoomSearch {
  date: string;
  startTime: string;
  endTime: string;
  people: number;
}

export async function searchRooms(
  search: RoomSearch
): Promise<Room[]> {
  const params = new URLSearchParams({
    date: search.date,
    startTime: search.startTime,
    endTime: search.endTime,
    people: search.people.toString(),
  });

  const response = await fetch(
    `${API_URL}/api/rooms/available?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Could not find available rooms.");
  }

  return response.json();
}
