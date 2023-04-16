"use client"

import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";

import { getMyPosts } from "@/actions/posts";

type props = {
  id: string
  image: string
  name: string
  title: string
  description: string
  comments?: [],
}

function MyPosts() {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getMyPosts
  })

  return (
    <div>
      {posts?.map((post: props) => (
        <PostCard
          key={post.id}
          isMine
          title={post.title}
          description={post.description}
          comments={post.comments}
        />
      ))}
    </div>
  )
}

export default MyPosts