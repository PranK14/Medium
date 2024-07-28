import { Circle } from './BlogCard'

export const BlogSkeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="border-b border-slate-200 p-4">
        <div className="flex">
          <div className="h-4 w-4 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="text-md font-thin">
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
        <div className="text-slate-400 text-sm font-thin pt-2">
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
      </div>
    </div>
  )
}
