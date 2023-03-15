"use client"

import PostCard from "./PostCard";

type props = {
  data: {
    id: string
    image: string
    name: string
    title: string
    comments: [],
  }[]
}

function MyPosts({ data }: props) {
  return (
    <div>
      {data?.map((post) => (
        <PostCard
          key={post.id}
          avatar={post.image}
          name={post.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  )
}

export default MyPosts