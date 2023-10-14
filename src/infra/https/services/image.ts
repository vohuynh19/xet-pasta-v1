import { AxiosProgressEvent } from "axios";
import { API_ENDPONTS } from "..";
import axiosInstance from "../axios";
import { RcFile } from "antd/es/upload";

const ImageService = {
  getPresignedLink: (fileType: string) =>
    axiosInstance.get(API_ENDPONTS.image.GET_PRESIGN, {
      params: {
        fileType,
      },
    }),

  uploadImage: (
    file: RcFile,
    presignedLink: string,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
  ) => {
    return axiosInstance.put(presignedLink, file, {
      headers: {
        "Content-Type": file.type,
      },
      withCredentials: false,
      onUploadProgress: onUploadProgress,
    });
  },
};

export default ImageService;
