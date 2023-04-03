import { toast } from "react-toastify";

export const successNotify = (
  msg: string = "",
  position = toast.POSITION.TOP_CENTER
) => {
  toast.success(msg, {
    position,
    autoClose: 2000,
    hideProgressBar: true,
  })
}

export const errorNotify = (
  msg: string = "Something went wrong, try again later",
  position = toast.POSITION.TOP_CENTER
) => {
  toast.error(msg, {
    position,
    autoClose: 2000,
    hideProgressBar: true,
  })
}
