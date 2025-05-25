import { useState } from "react";
import "./App.css";
import storiesData from "./data/stories.json";

interface Story {
  id: number;
  label: string;
  url: string;
}

function App() {
  const [stories, setStories] = useState<Story[]>(storiesData);

  return (
    <>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <p>{story.id}</p>
            <img src={story.url} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
