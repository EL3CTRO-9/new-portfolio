import { useEffect, useRef } from "react";

interface PostContentProps {
  htmlContent: string;
}

export default function PostContent({ htmlContent }: PostContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [htmlContent]);

  return (
    // SAFETY: htmlContent is rendered from this site's own MDX posts at build time
    // (single-author, trusted source). It is NOT user-generated input. If untrusted
    // authors are ever allowed to publish posts, sanitize this before rendering.
    <div
      ref={ref}
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
