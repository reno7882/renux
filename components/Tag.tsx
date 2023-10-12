import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 bg-sky-600 rounded-xl font-normal dark:font-normal text-sm uppercase text-white dark:text-white  hover:bg-sky-700 dark:hover:text-white py-1 mb-2 px-3"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
