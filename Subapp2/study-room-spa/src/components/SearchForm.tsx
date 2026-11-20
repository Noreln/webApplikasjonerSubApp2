
import type { FormEvent } from "react";
import type { RoomSearch } from "../services/api";

interface SearchFormProps {
  onSearch: (search: RoomSearch) => void;
  loading: boolean;
}

function SearchForm({ onSearch, loading }: SearchFormProps) {
  const today = new Date().toLocaleDateString("en-CA");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const search: RoomSearch = {
      date: formData.get("date") as string,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
      people: Number(formData.get("people")),
    };

    if (search.endTime <= search.startTime) {
      alert("End time must be later than start time.");
      return;
    }

    onSearch(search);
  }

  return (
    <section className="booking-search">
      <div className="container">
        <div className="text-center">
          <h1>Book a room for your next study session</h1>
          <p className="subtitle">
            Find an available study room that fits your needs.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="search-grid">

            <div className="form-group">
              <label htmlFor="date">📅 Date</label>
              <input
                id="date"
                name="date"
                type="date"
                min={today}
                defaultValue={today}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="startTime">🕐 Start</label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                defaultValue="09:00"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">🕐 End</label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                defaultValue="11:00"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="people">👥 People</label>
              <input
                id="people"
                name="people"
                type="number"
                min="1"
                defaultValue="2"
                required
              />
            </div>

            <div className="form-group search-button">
              <button type="submit" disabled={loading}>
                {loading ? "Searching..." : "🔍 Find rooms"}
              </button>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
