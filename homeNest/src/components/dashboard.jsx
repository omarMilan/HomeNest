import { useEffect, useState } from "react";
import DashboardBoxes from "./dashboardBoxes";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({
  id,
  booking_name,
  location,
  number_of_bookings,
  zipcode,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 250ms ease",
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <DashboardBoxes
        booking_name={booking_name}
        location={location}
        number_of_bookings={number_of_bookings}
        zipcode={zipcode}
      />
    </div>
  );
}

export default function Dashboard({ username: initialUsername }) {
  const [items, setItems] = useState([]);

  const username = localStorage.getItem("username"); // ✅ Always get username fresh

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/listings/${username}`
        );
        const data = await response.json();
        const mapped = data.map((listing, index) => ({
          id: index.toString(),
          ...listing,
        }));
        setItems(mapped);
      } catch (error) {
        console.error("Failed to load listings:", error);
      }
    };

    if (username) {
      fetchListings();
    }
  }, [username]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addNewBox = async () => {
    const booking_name = prompt("Enter Booking Name:");
    if (!booking_name) return;

    const location = prompt("Enter Location:");
    if (!location) return;

    const zipcode = prompt("Enter Zip Code:");
    if (!zipcode) return;

    try {
      await fetch("http://localhost:3001/add-listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          booking_name,
          location,
          zipcode,
        }),
      });

      const response = await fetch(
        `http://localhost:3001/listings/${username}`
      );
      const data = await response.json();
      const mapped = data.map((listing, index) => ({
        id: index.toString(),
        ...listing,
      }));
      setItems(mapped);
    } catch (error) {
      console.error("Failed to add listing:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-full text-white">
      <h1 className="text-3xl mb-4 text-[40px] max-xl:text-[40px] max-lg:text-[30px] max-md:text-[20px] font-semibold">
        Welcome home, {username}!
      </h1>
      <div className="w-full px-32">
        <div className="h-[505px] bg-[rgba(255,255,255,0.4)] rounded-[12px] flex items-center justify-center gap-4 flex-wrap overflow-auto">
          <div
            className="w-[320px] h-[191px] bg-customGreen rounded-[6px] flex items-center justify-center cursor-pointer"
            onClick={addNewBox}
          >
            <p className="text-black text-[20px]">Add Box</p>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex gap-4 flex-wrap transition-all duration-300 ease-in-out">
                {items.map(
                  ({
                    id,
                    booking_name,
                    location,
                    number_of_bookings,
                    zipcode,
                  }) => (
                    <SortableItem
                      key={id}
                      id={id}
                      booking_name={booking_name}
                      location={location}
                      number_of_bookings={number_of_bookings}
                      zipcode={zipcode}
                    />
                  )
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
