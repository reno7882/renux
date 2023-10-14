
import { formatDate } from 'pliny/utils/formatDate'
import type { Blog } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'



export default function MiFecha({ date}) {  
    const nueva = new Date(date);
    const utcDate = new Date(nueva.getTime() + (nueva.getTimezoneOffset() * 60 * 1000));

    const dateString = utcDate.toString();
    
  return (
    <>
      <div className="text-gray-500 dark:text-gray-400">           
        <time dateTime={dateString}>{formatDate(dateString, siteMetadata.locale)}</time>
      </div>
    </>
  )
  }
