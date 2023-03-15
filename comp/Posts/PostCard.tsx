"use client"

import { useState } from "react";
import DeleteModal from "./DeleteModal";

type props = {
  avatar: string
  name: string
  title: string
  comments?: {
    id: string
    postId: string
    userId: string
  }[]
}

function PostCard({ avatar, name, title, comments }: props) {
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <div className="my-6 px-6 py-4 rounded-lg bg-slate-100">
        <div className="flex items-center gap-2">
          <img width={24} height={24} src={avatar} alt="avatar" />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>

        <div className="my-2">
          <p className="break-all">{title}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setToggle(true)
            }}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
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