import sendApiReq from '@/utils/sendApiReq';
import endPoints from '@/utils/endPoints';

export type addPostDataType = { title: string, description: string }

export function addPost(data: addPostDataType) {
  return sendApiReq({
    method: "post",
    url: endPoints.posts,
    data,
  })
}