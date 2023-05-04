import sendApiReq from '@/utils/sendApiReq';
import endPoints from '@/utils/endPoints';

export type addCommentDataType = { message: string, postId: string }
type postParamType = { id: string, pageParam: number }

export function getAllCommentsInPost({ id, pageParam = 0 }: postParamType) {
  if (typeof pageParam === "boolean") return []
  return sendApiReq({
    url: endPoints.comments + "/post/" + id,
    params: { skip: pageParam }
  })
}

export function addComment(data: addCommentDataType) {
  return sendApiReq({
    method: "post",
    url: endPoints.comments,
    data,
  })
}
