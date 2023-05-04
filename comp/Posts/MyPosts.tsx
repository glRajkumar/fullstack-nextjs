"use client"

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { getMyPosts } from "@/actions/posts";

import DeleteModal from "./DeleteModal";
import LoadMore from "../Common/LoadMore";
import PostCard from "./PostCard";
import Loader from "../Common/Loader";

type props = {
  id: string
  image: string
  name: string
  title: string
  description: string
}

function MyPosts() {
  const [posts, setPosts] = useState<props[]>([])
  const [modal, setModal] = useState("")
  const router = useRouter()

  const { data: user } = useSession()

  const {
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["my-posts"],
    queryFn: getMyPosts,
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
          isMine
          id={post.id}
          key={post.id}
          name={user?.user.name}
          avatar={user?.user.image}
          title={post.title}
          description={post.description}
          onDeleteBtnClk={() => onDeleteBtnClk(post.id)}
          onCardClk={() => router.push(`/post/${post.id}`)}
        />
      ))}

      {
        !isLoading && hasNextPage && !isFetching &&
        <LoadMore
          fn={() => fetchNextPage({ pageParam: posts.length })}
        />
      }

      {
        isFetching &&
        <Loader loaderCls=" w" />
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

export default MyPosts