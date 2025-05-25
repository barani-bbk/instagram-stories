import { useEffect, useState } from "react";
import "./App.css";
import ThumbnailContainer from "./components/ThumbnailContainer";
import storiesData from "./data/stories.json";
import StoryViewer from "./components/StoryViewer";

export interface Story {
  id: number;
  label: string;
  thumbnail: string;
  url: string;
}

function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    setStories(storiesData);
  }, []);

  return (
    <main className="container">
      <ThumbnailContainer
        onStoryClick={(index) => setCurrentIndex(index)}
        stories={stories}
      />
      <div className="content">
        <p>Instagram Stories</p>
      </div>
      {currentIndex !== null && (
        <StoryViewer
          stories={stories}
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
          onClose={() => setCurrentIndex(null)}
        />
      )}
    </main>
  );
}

export default App;
