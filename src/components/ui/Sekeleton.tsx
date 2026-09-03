import type { TSkeleton } from "../../types/ui";
import "../../styles/ui/skeleton.scss";

const Skeleton = ({ width = "6.35rem", height = "1.25rem" }: TSkeleton) => {
  return (
    <div
      className="skeleton"
      style={{
        width: `${width}`,
        height: `${height}`,
      }}
    />
  );
};

export default Skeleton;
