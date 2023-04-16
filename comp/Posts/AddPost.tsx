"use client"

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { addPost, addPostDataType } from "@/actions/posts";
import { successNotify } from "@/helpers/toastifyHlp";

function AddPost() {
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
    }
  })
  const router = useRouter()

  const { mutate, isLoading } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      successNotify("Post created successfully")
      router.push("/my-posts")
    }
  })

  const submitPost = (data: addPostDataType) => mutate(data)

  return (
    <form
      onSubmit={handleSubmit(submitPost)}
      className="bg-white my-8 p-8 max-w-lg mx-auto rounded-md"
    >
      <div className="mb-4">
        <label
          htmlFor="create-Title"
          className="text-sm font-medium"
        >
          Title
        </label>
        <input
          id="create-Title"
          type="text"
          {...register("title", {
            required: "Title is required"
          })}
        />
        {
          errors.title &&
          <p className="mt-0.5 text-[13px] font-medium text-red-400">{errors.title.message}</p>
        }
      </div>

      <div className="mb-4">
        <label
          htmlFor="create-Description"
          className="text-sm font-medium"
        >
          Description
        </label>
        <textarea
          id="create-Description"
          rows={6}
          placeholder="What's on your mind?"
          {...register("description", {
            required: "Description is required",
          })}
        />
        {
          errors.description &&
          <p className="mt-0.5 text-[13px] font-medium text-red-400">{errors.description.message}</p>
        }
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-60"
      >
        Create post
      </button>
    </form>
  )
}

export default AddPost