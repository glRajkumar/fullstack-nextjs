"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { addPostDataType, editPost, getPostById } from "@/actions/posts";
import { successNotify } from "@/helpers/toastifyHlp";
import Loader from "../Common/Loader";

function EdiPost() {
  const pathName = usePathname()
  const router = useRouter()
  const id = pathName?.split("/")[2] || ""

  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
    }
  })

  const { isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!pathName,
    onSuccess: (res) => {
      reset({
        title: res.title,
        description: res.description
      })
    }
  })

  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      successNotify("Post updated successfully")
      router.push("/my-posts")
    }
  })

  const submitPost = (data: addPostDataType) => mutate({ ...data, id })

  if (isLoading) return <Loader wrapperCls="h-[calc(100vh-112px)]" />

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
        disabled={isMutating}
        className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-60"
      >
        Edit post
      </button>
    </form>
  )
}

export default EdiPost