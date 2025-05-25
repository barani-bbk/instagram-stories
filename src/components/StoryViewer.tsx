import { useEffect, useRef, useState } from "react";
import type { Story } from "../App";
import Spinner from "./Spinner";

interface Props {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

const StoryViewer = ({ stories, currentIndex, onClose, onNavigate }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const story = stories[currentIndex];

  const startY = useRef<number | null>(null);
  const threshold = 50;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        onNavigate(currentIndex + 1);
      } else {
        onClose();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.nativeEvent.offsetX;
    const width = e.currentTarget.offsetWidth;

    if (x < width / 2) {
      if (currentIndex > 0) onNavigate(currentIndex - 1);
    } else {
      if (currentIndex < stories.length - 1) onNavigate(currentIndex + 1);
      else onClose();
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startY.current !== null) {
      const endY = e.changedTouches[0].clientY;
      const deltaY = endY - startY.current;
      if (deltaY > threshold) {
        onClose();
      }
      startY.current = null;
    }
  };

  return (
    <div
      className="story-viewer"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {isLoading && <Spinner />} (
      <img
        src={story.url}
        alt={story.label}
        className="story-image"
        onLoad={() => setIsLoading(false)}
      />
      )
      <button type="button" className="close-btn" onClick={handleClose}>
        ✕
      </button>
    </div>
  );
};

export default StoryViewer;
