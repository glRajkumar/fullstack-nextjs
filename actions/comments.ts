import sendApiReq from '@/utils/sendApiReq';
import endPoints from '@/utils/endPoints';

export type addCommentDataType = { message: string, postId: string }

export function getAllCommentsInPost(id: string) {
  return sendApiReq({
    url: endPoints.comments + "/post/" + id,
  })
}

export function addComment(data: addCommentDataType) {
  return sendApiReq({
    method: "post",
    url: endPoints.comments,
    data,
  })
}
