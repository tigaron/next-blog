import Link from 'next/link';
import React from 'react';

const navigation = [
  { name: `Library`, slug: `/library` },
  { name: `Project`, slug: `/project` },
  { name: `Blog`, slug: `/blog` },
  { name: `Home`, slug: `/` },
];

export default function Header() {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              Four Leaves Studio
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {navigation.map((item) => (
            <Link key={item.slug} href={`${item.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
