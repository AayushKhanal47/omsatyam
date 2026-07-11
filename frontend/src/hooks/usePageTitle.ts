import { useEffect } from "react";

export const usePageTitle = (title: string, description?: string) => {
  useEffect(() => {
    document.title = `${title} | Om Satyam Dental & Surgical`;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
  }, [title, description]);
};
