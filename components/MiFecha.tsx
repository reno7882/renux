
import { formatDate } from 'pliny/utils/formatDate'
import type { Blog } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'



export default function MiFecha({ date}) {  
  return (
    <>
      <div className="text-gray-500 dark:text-gray-400">
        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
      </div>
    </>
  )
  }
