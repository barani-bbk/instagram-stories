import { useEffect, useState } from "react";
import "./App.css";
import ThumbnailContainer from "./components/ThumbnailContainer";
import storiesData from "./data/stories.json";

export interface Story {
  id: number;
  label: string;
  url: string;
}

function App() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    setStories(storiesData);
  }, []);

  return (
    <main className="container">
      <ThumbnailContainer stories={stories} />
      <div className="content">
        <p>Instagram Stories</p>
      </div>
    </main>
  );
}

export default App;
