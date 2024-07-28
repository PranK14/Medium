import { Link, useNavigate } from 'react-router-dom'

export const Appbar = () => {
  const navigate = useNavigate()
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={'/blogs'}>
        <div className="flex flex-col justify-center cursor-pointer text-xl font-bold">
          MEDIUM
        </div>
      </Link>

      <div>
        <Link to={'/publish'}>
          <button
            type="button"
            className="focus:outline-none text-white mr-4 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          >
            New Blog
          </button>
        </Link>
        <button
          className="bg-white-500 font-bold hover:font-semibold focus:outline-none focus:ring focus:ring-violet-300 ... px-2"
          onClick={() => {
            localStorage.clear()

            navigate('/signin')
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  )
}
