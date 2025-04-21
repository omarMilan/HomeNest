import { useState } from "react";
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

function SortableItem({ id }) {
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
      <DashboardBoxes />
    </div>
  );
}

export default function Dashboard({ username }) {
  const [items, setItems] = useState(["1", "2"]);
  const [nextId, setNextId] = useState(3); // for generating unique box ids

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addNewBox = () => {
    setItems((prev) => [...prev, nextId.toString()]);
    setNextId((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-full text-white">
      <h1 className="text-3xl mb-4 text-[40px] font-semibold">
        Welcome home, {username}!
      </h1>
      <div className="w-full px-32">
        <div className="h-[505px] bg-[rgba(255,255,255,0.4)] rounded-[12px] flex items-center justify-center gap-4 flex-wrap overflow-auto">
          {/* Green non-draggable box */}
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
              items={items}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex gap-4 flex-wrap transition-all duration-300 ease-in-out">
                {items.map((id) => (
                  <SortableItem key={id} id={id} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
