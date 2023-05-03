import sendApiReq from '@/utils/sendApiReq';
import endPoints from '@/utils/endPoints';

export type addPostDataType = { title: string, description: string }
export type editPostDataType = { title: string, description: string, id: string }

export function getAllPosts({ pageParam: skip = 0 }) {
  // to prevent react query call on refocus. skip will be true if all records fetched
  if (typeof skip === "boolean") return []
  return sendApiReq({
    url: endPoints.posts,
    params: { skip },
  })
}

export function getMyPosts({ pageParam: skip = 0 }) {
  if (typeof skip === "boolean") return []
  return sendApiReq({
    url: endPoints.posts + "/user",
    params: { skip },
  })
}

export function getPostById(id: string) {
  return sendApiReq({
    url: endPoints.posts + `/${id}`,
  })
}

export function addPost(data: addPostDataType) {
  return sendApiReq({
    method: "post",
    url: endPoints.posts,
    data,
  })
}

export function editPost(data: editPostDataType) {
  return sendApiReq({
    method: "put",
    url: endPoints.posts,
    data,
  })
}

export function deletePost(id: string) {
  return sendApiReq({
    method: "delete",
    url: endPoints.posts + `/${id}`,
  })
}