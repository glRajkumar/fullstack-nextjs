"use client"

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { getAllPosts } from "@/actions/posts";

import DeleteModal from "./DeleteModal";
import PostCard from "./PostCard";
import Loader from "../Common/Loader";

type props = {
  id: string
  user: {
    image: string
    name: string
    id: string
  }
  title: string
  description: string
}

function HomePosts() {
  const [posts, setPosts] = useState<props[]>([])
  const [modal, setModal] = useState("")
  const router = useRouter()

  const { data: user } = useSession()

  const {
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    getNextPageParam: (lastPage) => lastPage.length === 10,
    onSuccess: (data) => setPosts(data.pages.flat() as props[])
  })

  const onDeleteBtnClk = (id: string) => setModal(id)
  const closeModal = () => setModal("")

  if (isLoading) return <Loader wrapperCls="h-[calc(100vh-112px)]" />

  return (
    <>
      {posts?.map(post => (
        <PostCard
          id={post.id}
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          isMine={user?.user.id === post.user.id}
          title={post.title}
          description={post.description}
          onDeleteBtnClk={() => onDeleteBtnClk(post.id)}
          onCardClk={() => router.push(`/post/${post.id}`)}
        />
      ))}

      {
        hasNextPage &&
        <button
          onClick={() => fetchNextPage({ pageParam: posts.length })}
          className="block px-4 py-2 mx-auto border shadow"
        >
          More
        </button>
      }

      {
        modal &&
        <DeleteModal
          id={modal}
          closeModal={closeModal}
        />
      }
    </>
  )
}

export default HomePosts