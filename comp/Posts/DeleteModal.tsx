"use client"

import { deletePost } from "@/actions/posts"
import { successNotify } from "@/helpers/toastifyHlp"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type props = {
  id: string
  closeModal: () => void
}

function DeleteModal({ id, closeModal }: props) {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      successNotify("Post deleted successfully")
      queryClient.invalidateQueries(["posts"])
      queryClient.invalidateQueries(["my-posts"])
      closeModal()
    }
  })

  const onConfirm = () => {
    mutate(id)
  }

  return (
    <div
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl font-medium">
          Are you sure you want to delete this post? 😥
        </h2>

        <h3 className="text-red-600 text-sm">
          It will permenantly delete your post and related comments
        </h3>

        <div className="dc gap-4">
          <button
            onClick={closeModal}
            disabled={isLoading}
            className="w-32 py-2 px-4 text-sm bg-slate-200 hover:bg-slate-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-32 py-2 px-4 text-sm bg-red-500 text-white hover:bg-red-600"
          >
            Delete Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal