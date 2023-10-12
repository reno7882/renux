'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Anteriores
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Anteriores
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Siguientes
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Siguientes
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl leading-9 tracking-tight text-indigo-950 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">Buscar artículos</span>
              <input
                aria-label="Buscar artículos"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Buscar artículos"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-800 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
            </label>
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul className="grid sm:grid-cols-1  gap-4">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags, image } = post
            return (
              <li
                
                className="p-4 border border-gray-200 dark:border dark:border-gray-700 bg-slate-400/10 dark:bg-slate-900 rounded shadow-md dark:hover:border-sky-500 dark:hover:bg-gray-900	"  key={path}
              >
                <article className="">
                  <div className="space-y-3 xl:col-span-3 md:flex ">

                    <Image
                      src={image}
                      width={300}
                      height={300}
                      alt={title}
                      className="@screen sm w-full lg:max-w-sm py-4 "
                    />

                    <div className='pl-4'>
                      <h2 className="text-2xl  leading-8 tracking-tight 	">
                        <Link href={`/${path}`} className="text-blue-950 dark:text-gray-100">
                          {title}
                        </Link>
                      </h2>
                      <dl className='pb-1'>
                        <dt className="sr-only">Publicado el</dt>
                        <dd className="text-base font-medium leading-6 text-gray-600 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="flex flex-wrap py-3">
                        {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">

                        {summary}...
                        
                      </div>

                        <Link
                          href={`/${path}`}
                          className="text-primary-800 dark:text-purple-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Leer más "${title}"`}
                        >
                          Leer más &rarr;
                        </Link> 
                    </div>
                  </div>
       
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
