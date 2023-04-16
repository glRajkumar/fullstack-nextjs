"use client"

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getAllPosts } from "@/actions/posts";

import Loader from "../Common/Loader";
import PostCard from "./PostCard";

type props = {
  id: string
  user: {
    image: string
    name: string
    id: string
  }
  title: string
  description: string
  comments?: [],
}

function HomePosts() {
  const { data: user } = useSession()
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts
  })

  if (isLoading) return <Loader wrapperCls="h-[calc(100vh-112px)]" />

  return (
    <>
      {posts?.map((post: props) => (
        <PostCard
          key={post.id}
          isMine={user?.user.id === post.user.id}
          avatar={post.user.image}
          name={post.user.name}
          title={post.title}
          description={post.description}
          comments={post.comments}
        />
      ))}
    </>
  )
}

export default HomePosts