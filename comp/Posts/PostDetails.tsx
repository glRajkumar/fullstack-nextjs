"use client"

import { useState } from "react";
import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { addComment, getAllCommentsInPost } from "@/actions/comments";
import { successNotify } from "@/helpers/toastifyHlp";
import { getPostById } from "@/actions/posts";

import DeleteModal from "./DeleteModal";
import PostCard from "./PostCard";
import Loader from "../Common/Loader";

interface commentType {
  id: string
  message: string
  postId: string
  userId: string
  user: {
    name: string
    image: string
  }
}

function PostDetails() {
  const [comments, setComments] = useState<commentType[]>([])
  const [message, setMessage] = useState("")
  const [modal, setModal] = useState(false)

  const { data: user } = useSession()

  const queryClient = useQueryClient()
  const pathName = usePathname()

  const id = pathName?.split("/")[2] || ""

  const { isLoading: isLoading1, data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  })

  const {
    isLoading: isLoading2,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    enabled: !!id,
    queryKey: ["comments", id],
    queryFn: ({ pageParam }) => getAllCommentsInPost({ id, pageParam }),
    getNextPageParam: (lastPage) => lastPage.length === 10,
    onSuccess: (data) => setComments(data.pages.flat()),
  })

  const { mutate, isLoading: isComenting } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      setMessage("")
      queryClient.invalidateQueries(["comments", id])
      successNotify("Comment added successfully")
    }
  })

  const updateModal = () => setModal(p => !p)

  const onComment = () => {
    if (message) {
      mutate({
        message,
        postId: post.id
      })
    }
  }

  if (isLoading1 || isLoading2) return <Loader wrapperCls="h-[calc(100vh-112px)]" />

  return (
    <div className="h-[calc(100vh-50px)] grid grid-rows-[auto_1fr_auto] max-w-2xl mx-auto">
      <PostCard
        id={post.id}
        isMine={post.user.id === user?.user.id}
        name={user?.user.name}
        avatar={user?.user.image}
        title={post.title}
        description={post.description}
        onDeleteBtnClk={updateModal}
        onCardClk={() => { }}
        wrapperCls="py-4 px-4 border-b"
      />

      <div className="my-4 px-8 overflow-y-auto">
        {
          comments.map(c => (
            <div key={c.id} className="mb-2 text-sm">
              <div className="df mb-0.5">
                <img
                  width={24}
                  height={24}
                  src={c.user.image || "/img/user.png"}
                  alt="avater"
                />
                <p>{c.user.name}</p>
              </div>

              <div className="pl-8">
                {c.message}
              </div>
            </div>
          ))
        }

        {
          hasNextPage &&
          <button
            onClick={() => fetchNextPage({ pageParam: comments.length })}
            className="block px-4 py-2 mx-auto border shadow"
          >
            More
          </button>
        }
      </div>

      <div className="df p-2 border">
        <input
          type="text"
          className="border-none"
          placeholder="Add your comment...."
          value={message}
          disabled={isComenting}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
            if (e.code === "Enter") {
              onComment()
            }
          }}
        />

        <button
          disabled={isComenting}
          className="text-sm font-medium text-white bg-black hover:opacity-90"
          onClick={onComment}
        >
          Add
        </button>
      </div>

      {
        modal &&
        <DeleteModal
          id={post.id}
          closeModal={updateModal}
        />
      }
    </div>
  )
}

export default PostDetails