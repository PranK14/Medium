import { Blog } from '../hooks'
import { Appbar } from './Appbar'
import { Avatar } from './BlogCard'

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-2xl">
          <div className="col-span-8">
            <div className="text-3xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500"> Post on 24th June 2024</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4 text">
            <div className="text-slate-500"> Author</div>

            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size={'big'} name={blog.author.name || 'Anonymous'} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || 'Anonymous'}
                </div>
                <div className="pt-2 text-slate-500">
                  The author has a unique way to grab the attention of the
                  reader. Once started, the reader is not going anywhere untill
                  they finsh the entire blog.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
