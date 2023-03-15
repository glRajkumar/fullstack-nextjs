"use client"

import { useState } from "react";

function AddComment() {
  const [isDisabled, setIsDisabled] = useState(false)
  const [title, setTitle] = useState("")

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
  }

  return (
    <form onSubmit={submitPost} className="my-8 p-8">
      <h3 className="text-xl">Add a comment</h3>

      <div className="flex flex-col my-2">
        <input
          onChange={e => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment
        </button>

        <p className={`font-bold  ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>
          {title.length}/300
        </p>
      </div>
    </form>
  )
}

export default AddComment