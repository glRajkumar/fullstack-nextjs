"use client"

import Link from "next/link";

type props = {
  id: string
  name?: string
  avatar?: string
  title: string
  description: string
  isMine: boolean
  wrapperCls?: string
  onDeleteBtnClk: () => void
  onCardClk: () => void
}

function PostCard({
  id, avatar, name, isMine,
  title, description,
  onDeleteBtnClk = () => { },
  onCardClk = () => { },
  wrapperCls = "my-6 max-w-2xl mx-auto px-6 py-4 rounded-lg border cursor-pointer hover:shadow-lg"
}: props) {
  return (
    <div
      className={wrapperCls}
      onClick={onCardClk}
    >
      <div className="flex items-center gap-2">
        <img
          width={24}
          height={24}
          src={avatar || "/img/user.png"}
          alt="avatar"
        />
        <h3 className="mr-auto font-bold text-gray-700">{name}</h3>

        {
          isMine &&
          <>
            <Link
              href={`/edit-post/${id}`}
              className="text-sm hover:text-blue-500"
            >
              Edit
            </Link>

            <button
              onClick={onDeleteBtnClk}
              className="text-sm font-bold text-red-500"
            >
              Delete
            </button>
          </>
        }
      </div>

      <div className="my-2">
        <p className="font-semibold">
          {title}
        </p>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default PostCard