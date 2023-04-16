"use client"

type props = {
  name?: string
  avatar?: string
  title: string
  description: string
  isMine: boolean
  comments?: {
    id: string
    postId: string
    userId: string
  }[]
  onDeleteBtnClk: () => void
}

function PostCard({
  avatar, name, isMine,
  title, description, comments,
  onDeleteBtnClk
}: props) {
  return (
    <>
      <div className="my-6 max-w-2xl mx-auto px-6 py-4 rounded-lg border cursor-pointer hover:shadow-lg">
        <div className="flex items-center gap-2">
          <img
            width={24}
            height={24}
            src={avatar || "./img/user.png"}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>

          {
            isMine &&
            <button
              onClick={onDeleteBtnClk}
              className="ml-auto text-sm font-bold text-red-500"
            >
              Delete
            </button>
          }
        </div>

        <div className="my-2">
          <p className="font-semibold">
            {title}
          </p>
          <p>{description}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
        </div>
      </div>
    </>
  )
}

export default PostCard