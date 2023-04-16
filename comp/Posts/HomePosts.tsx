"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

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
  comments?: [],
}

function HomePosts() {
  const [modal, setModal] = useState("")

  const { data: user } = useSession()
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts
  })

  const onDeleteBtnClk = (id: string) => setModal(id)
  const closeModal = () => setModal("")

  if (isLoading) return <Loader wrapperCls="h-[calc(100vh-112px)]" />

  return (
    <>
      {posts?.map((post: props) => (
        <PostCard
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          isMine={user?.user.id === post.user.id}
          title={post.title}
          description={post.description}
          comments={post.comments}
          onDeleteBtnClk={() => onDeleteBtnClk(post.id)}
        />
      ))}

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