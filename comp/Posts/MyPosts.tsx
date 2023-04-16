"use client"

import { useQuery } from "@tanstack/react-query";

import { getMyPosts } from "@/actions/posts";

import Loader from "../Common/Loader";
import PostCard from "./PostCard";

type props = {
  id: string
  image: string
  name: string
  title: string
  description: string
  comments?: [],
}

function MyPosts() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["my-posts"],
    queryFn: getMyPosts
  })

  if (isLoading) return <Loader wrapperCls="h-[calc(100vh-112px)]" />

  return (
    <>
      {posts?.map((post: props) => (
        <PostCard
          key={post.id}
          isMine
          title={post.title}
          description={post.description}
          comments={post.comments}
        />
      ))}
    </>
  )
}

export default MyPosts