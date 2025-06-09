import { useEffect } from "react";

const PageHead = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let descTag = document.querySelector('meta[name="description"]');
      if (!descTag) {
        descTag = document.createElement("meta");
        descTag.name = "description";
        document.head.appendChild(descTag);
      }
      descTag.content = description;
    }
  }, [title, description]);

  return null;
};

export default PageHead;
