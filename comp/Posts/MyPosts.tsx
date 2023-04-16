"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMyPosts } from "@/actions/posts";

import DeleteModal from "./DeleteModal";
import PostCard from "./PostCard";
import Loader from "../Common/Loader";

type props = {
  id: string
  image: string
  name: string
  title: string
  description: string
  comments?: [],
}

function MyPosts() {
  const [modal, setModal] = useState("")

  const { data: posts, isLoading } = useQuery({
    queryKey: ["my-posts"],
    queryFn: getMyPosts
  })

  const onDeleteBtnClk = (id: string) => setModal(id)
  const closeModal = () => setModal("")

  if (isLoading) return <Loader wrapperCls="h-[calc(100vh-112px)]" />

  return (
    <>
      {posts?.map((post: props) => (
        <PostCard
          isMine
          key={post.id}
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

export default MyPosts