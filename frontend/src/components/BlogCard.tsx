import { Link } from 'react-router-dom'

interface BlogCardProps {
  authorName: string
  title: string
  content: string
  publishedDate: string
  id: number
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 p-4">
        <div className="flex">
          <Avatar name={authorName} size={'small'} />

          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="font-thin pl-2 text-slate-400 flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">
          {content.substring(0, 100) + `${content.length >= 100 ? '...' : ''}`}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-2">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
      </div>
    </Link>
  )
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}
export function Avatar({
  name,
  size = 'small',
}: {
  name: string
  size?: 'small' | 'big'
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === 'small' ? 'w-6 h-6' : 'w-10 h-10'
      } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span className="font-sm text-gray-600 dark:text-gray-300 justify-center">
        {name[0] + name[1]}
      </span>
    </div>
  )
}
