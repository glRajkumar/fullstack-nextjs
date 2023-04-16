"use client"

import { useState } from "react";
import DeleteModal from "./DeleteModal";

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
}

function PostCard({
  avatar, name, isMine,
  title, description, comments
}: props) {
  const [toggle, setToggle] = useState(false)

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
        </div>

        <div className="my-2">
          <p className="df justify-between font-semibold">
            {title}
            {
              isMine &&
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setToggle(true)
                }}
                className="text-sm font-bold text-red-500"
              >
                Delete
              </button>
            }
          </p>
          <p>{description}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
        </div>
      </div>

      {
        toggle &&
        <DeleteModal
          deletePost={() => { }}
          setToggle={setToggle}
        />
      }
    </>
  )
}

export default PostCard