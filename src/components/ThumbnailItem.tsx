import type { Story } from "../App";

interface Props {
  story: Story;
}

const ThumbnailItem = ({ story }: Props) => {
  return (
    <div className="thumbnail-item">
      <img className="thumbnail" src={story.url} />
    </div>
  );
};

export default ThumbnailItem;
