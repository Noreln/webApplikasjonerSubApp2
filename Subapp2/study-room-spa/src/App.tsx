
import { useState } from "react";

import SearchForm from "./components/SearchForm";
import RoomCard from "./components/RoomCard";

import { searchRooms } from "./services/api";

import type { RoomSearch } from "./services/api";
import type { Room } from "./types/Room";

import "./App.css";

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(search: RoomSearch) {
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const availableRooms = await searchRooms(search);
      setRooms(availableRooms);
    } catch (err) {
      setRooms([]);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleBook(room: Room) {
    const params = new URLSearchParams({
      roomId: room.id.toString(),
    });

    // Replace this with your actual booking page route.
    window.location.href = `/booking?${params.toString()}`;
  }

  return (
    <>
      <header className="navbar">
        <div className="container navbar-content">
          <a href="/" className="brand">
            StudyRoom Booking
          </a>

          <nav>
            <a href="/">Home</a>
            <a href="/my-bookings">My Bookings</a>
          </nav>
        </div>
      </header>

      <main>
        <SearchForm
          onSearch={handleSearch}
          loading={loading}
        />

        <section className="available-rooms">
          <div className="container">
            <h2>Available rooms</h2>

            <p className="subtitle">
              {hasSearched
                ? "Rooms available for your selected time."
                : "Search to find rooms available for your study session."}
            </p>

            {loading && (
              <p>Searching for available rooms...</p>
            )}

            {error && (
              <p className="error-message">{error}</p>
            )}

            {!loading && !error && hasSearched && rooms.length === 0 && (
              <p className="empty-message">
                No rooms found for your selected time.
              </p>
            )}

            {!loading && rooms.length > 0 && (
              <div className="room-grid">
                {rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onBook={handleBook}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>StudyRoom Booking</p>
      </footer>
    </>
  );
}

export default App;
