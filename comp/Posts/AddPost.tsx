"use client"

import { useState } from "react";

function AddPost() {
  const [isDisabled, setIsDisabled] = useState(false)
  const [title, setTitle] = useState("")

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
  }

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          rows={6}
          className="p-4 text-lg rounded-md my-2  bg-gray-200"
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>
          {title.length}/300
        </p>

        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Create post
        </button>
      </div>
    </form>
  )
}

export default AddPost