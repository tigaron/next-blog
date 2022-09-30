import { Author as AuthorEntity } from '@/interfaces';
import Image from 'next/future/image';
import React from 'react';

export default function Author({ author }: { author: AuthorEntity }) {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          className="align-middle rounded-full mx-auto"
          src={author.photo.url}
          alt={author.name}
          width="100"
          height="100"
        />
      </div>
      <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-lg">{author.bio}</p>
    </div>
  );
}
