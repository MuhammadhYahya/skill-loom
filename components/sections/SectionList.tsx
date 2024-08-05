import { Section } from "@prisma/client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { Grip, Pencil } from "lucide-react";

interface SectionListProps {
  items: Section[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

const SectionList = ({ items, onReorder, onEdit }: SectionListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sections, setSections] = useState<Section[]>(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSections(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(sections);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setSections(reorderedItems);

    const bulkUpdateData = reorderedItems.map((section, index) => ({
      id: section.id,
      position: index,
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${
              sections.length > 0 ? "my-10" : "mt-7"
            } flex flex-col gap-5`}
          >
            {sections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="flex items-center bg-[#FFF8EB] rounded-lg text-sm font-medium p-3"
                  >
                    <div {...provided.dragHandleProps}>
                      <Grip className="h-4 w-4 cursor-pointer mr-4 hover:text-[#FDAB04]" />
                    </div>
                    {section.title}
                    <div className="ml-auto">
                      <Pencil
                        className="h-4 w-4 cursor-pointer hover:text-[#FDAB04]"
                        onClick={() => onEdit(section.id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;
