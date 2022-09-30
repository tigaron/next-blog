import Image from 'next/future/image';
import { PostDetail } from '@/interfaces';
import React from 'react';
import moment from 'moment';
import { RichText } from '@graphcms/rich-text-react-renderer';
import Link from 'next/link';

export default function PostContent({ post }: { post: PostDetail }) {
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <Image
          className="object-top h-full w-full rounded-t-lg"
          src={post.featuredImage.url}
          alt={post.title}
          width="600"
          height="600"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <Image
              className="align-middle rounded-full"
              src={post.author.photo.url}
              alt={post.author.name}
              width="30"
              height="30"
            />
            <p className="inline align-middle text-gray-700 ml-2 text-lg">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{moment(post.createdAt).format(`MMM DD, YYYY`)}</span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        <RichText
          content={post.content?.raw}
          renderers={{
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold mb-4">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-md font-semibold mb-4">{children}</h3>
            ),
            bold: ({ children }) => <strong>{children}</strong>,
            italic: ({ children }) => <em>{children}</em>,
            underline: ({ children }) => <u>{children}</u>,
            p: ({ children }) => <p className="mb-4">{children}</p>,
            ol: ({ children }) => (
              <ol
                className="list-decimal list-outside"
                style={{ padding: `revert`, margin: `revert` }}
              >
                {children}
              </ol>
            ),
            ul: ({ children }) => (
              <ul
                className="list-disc list-outside"
                style={{ padding: `revert`, margin: `revert` }}
              >
                {children}
              </ul>
            ),
            li: ({ children }) => <li className="list-item">{children}</li>,
            a: ({ children, href }: any) => (
              <Link href={href}>
                <span className="text-orange-500 underline underline-offset-2 cursor-pointer">
                  {children}
                </span>
              </Link>
            ),
            img: ({ src, altText, height, width }: any) => (
              <Image src={src} alt={altText} height={height} width={width} />
            ),
            code: ({ children }) => (
              <code className="bg-gray-800 text-green-400 p-0.5">
                {children}
              </code>
            ),
            code_block: ({ children }) => (
              <pre className="py-3 px-5 rounded-md text-base whitespace-pre overflow-auto bg-gray-800 text-green-400 mb-4">
                {children}
              </pre>
            ),
            table: ({ children }) => (
              <table className="block overflow-auto mb-4">{children}</table>
            ),
            table_head: ({ children }) => (
              <thead className="font-mono text-base py-1 px-2">
                {children}
              </thead>
            ),
            table_body: ({ children }) => (
              <tbody className="font-mono text-base py-1 px-2">
                {children}
              </tbody>
            ),
            table_header_cell: ({ children }) => (
              <th className="py-1 px-2 border border-white text-green-400 bg-gray-800 text-lg">
                {children}
              </th>
            ),
            table_cell: ({ children }) => (
              <td className="py-1 px-2 border border-white text-green-400 bg-gray-800">
                {children}
              </td>
            ),
          }}
        />
      </div>
    </div>
  );
}
