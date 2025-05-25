import type { Story } from "../App";

interface Props {
  story: Story;
}

const ThumbnailItem = ({ story }: Props) => {
  return (
    <div className="thumbnail-item">
      <img className="thumbnail" alt={story.label} src={story.thumbnail} />
    </div>
  );
};

export default ThumbnailItem;
