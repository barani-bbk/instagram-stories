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
  const [fadeClass, setFadeClass] = useState("fade-out");
  const [hasError, setHasError] = useState(false);
  const story = stories[currentIndex];

  const startY = useRef<number | null>(null);
  const threshold = 50;

  useEffect(() => {
    setFadeClass("fade-out");
    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    img.src = story.url;

    img.onload = () => {
      setIsLoading(false);
      setFadeClass("fade-in");
    };

    img.onerror = () => {
      console.error("Image failed to load:", story.url);
      setIsLoading(false);
      setHasError(true);
    };
  }, [story.url]);

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
      {isLoading && <Spinner />}

      <div className="progress-bar">
        <div key={story.id} className="progress-fill" />
      </div>

      {!isLoading && !hasError && (
        <img
          key={story.id}
          src={story.url}
          alt={story.label}
          className={`story-image ${fadeClass}`}
          onLoad={() => {
            setFadeClass("fade-in");
            setIsLoading(false);
          }}
          onError={() => {
            console.error("Image failed to load:", story.url);
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}

      {!isLoading && hasError && (
        <div className="error-message">Cannot load story. Try again.</div>
      )}

      <button type="button" className="close-btn" onClick={handleClose}>
        ✕
      </button>
    </div>
  );
};

export default StoryViewer;
