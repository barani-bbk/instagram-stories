import type { Story } from "../App";
import ThumbnailItem from "./ThumbnailItem";

interface Props {
  stories: Story[];
  onStoryClick: (index: number) => void;
}

const ThumbnailContainer = ({ stories, onStoryClick }: Props) => {
  return (
    <ul className="thumbnail-container">
      {stories.map((story, index) => (
        <li key={story.id} onClick={() => onStoryClick(index)}>
          <ThumbnailItem story={story} />
        </li>
      ))}
    </ul>
  );
};

export default ThumbnailContainer;
