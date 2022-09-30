import { DiscussionEmbed } from 'disqus-react';
import React from 'react';

export default function CommentsForm({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const shortname = `suputra`;
  const config = {
    identifier: slug,
    title: title,
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <DiscussionEmbed shortname={shortname} config={config} />
    </div>
  );
}
