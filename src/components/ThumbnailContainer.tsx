import type { Story } from "../App";
import ThumbnailItem from "./ThumbnailItem";

interface Props {
  stories: Story[];
}

const ThumbnailContainer = ({ stories }: Props) => {
  return (
    <ul className="thumbnail-container">
      {stories.map((story) => (
        <li key={story.id}>
          <ThumbnailItem story={story} />
        </li>
      ))}
    </ul>
  );
};

export default ThumbnailContainer;
