
import type { Room } from "../types/Room";

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
}

function RoomCard({ room, onBook }: RoomCardProps) {
  return (
    <div className="room-card">
      <div className="room-card-body">
        <h3>{room.name}</h3>

        <p className="room-location">
          📍 {room.location}
        </p>

        {room.description && (
          <p>{room.description}</p>
        )}

        <div className="room-details">
          <span>👥 {room.capacity} people</span>
        </div>
      </div>

      <div className="room-card-footer">
        <button onClick={() => onBook(room)}>
          Book room
        </button>
      </div>
    </div>
  );
}

export default RoomCard;
