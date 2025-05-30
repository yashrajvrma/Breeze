"use client";

import { useMargin } from "@/lib/store/margin";
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
  const leftMargin = useMargin((state) => state.leftMargin) ?? 56;
  const rightMargin = useMargin((state) => state.rightMargin) ?? 56;

  const setLeftMargin = useMargin((state) => state.setLeftMargin);

  const setRightMargin = useMargin((state) => state.setRightMargin);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };
  const handleRigthMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const PAGE_WIDTH = 816;
    const MINIMUM_SPACE = 100;

    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMargin - MINIMUM_SPACE;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);

          //   setLeftMargin(newLeftPosition); // make collaborative
          setLeftMargin(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - (leftMargin + MINIMUM_SPACE);
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
          const constrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition
          );

          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(leftMargin);
  };

  const handleRightDoubleClick = () => {
    setRightMargin(rightMargin);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="print:hidden relative flex items-end mx-auto border-neutral-700 border-b w-[816px] h-6 font-sans select-none"
    >
      <div id="ruler-container" className="relative w-full h-full">
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRigthMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />

        <div className="bottom-0 absolute inset-x-0 h-full">
          <div className="relative w-[816px] h-full">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;

              return (
                <div
                  key={marker}
                  className="bottom-0 absolute"
                  style={{
                    left: `${position}px`,
                  }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="bottom-0 absolute bg-neutral-500 w-[1px] h-2" />
                      <span className="bottom-2 absolute text-[10px] text-muted-foreground -translate-x-1/2 transform">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="bottom-0 absolute bg-muted-foreground w-[1px] h-1.5" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="bottom-0 absolute bg-muted-foreground w-[1px] h-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className="group top-0 z-[5] absolute -ml-2 w-4 h-full cursor-ew-resize"
      style={{
        [isLeft ? "left" : "right"]: `${position}px`,
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="top-0 left-1/2 absolute fill-blue-500 h-full -translate-x-1/2 transform" />
      <div
        className="top-4 left-1/2 absolute -translate-x-1/2 transform"
        style={{
          height: "100vh",
          width: "1px",
          transform: "scaleX(0.5)",
          backgroundColor: "#3b72f6",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
};
