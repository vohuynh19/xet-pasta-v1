import { useMutation } from "@tanstack/react-query";
import { RcFile } from "antd/es/upload";
import { AxiosProgressEvent } from "axios";
import { useEffect, useRef, useState } from "react";
import { API_SERVICES, imageMutationKeys } from "src/infra/https";

export const useCreatePresigned = () => {
  return useMutation({
    ...imageMutationKeys.getPresignedLink(),
  });
};

export const useUploadImage = () => {
  const { mutate } = useMutation<PresignResponse, unknown, string>({
    ...imageMutationKeys.getPresignedLink(),
  });

  const refData = useRef<{
    file: RcFile;
    url: string;
  }>();

  const [progress, setProgress] = useState<AxiosProgressEvent>();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (refData?.current?.url) {
      refData.current.url = url;
    }
  }, [url]);

  const uploadImage = (
    file: RcFile,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) =>
    new Promise((resolve, reject) => {
      if (refData?.current?.file) {
        refData.current.file = file;
      }

      setProgress(undefined);
      setUrl(URL.createObjectURL(file));

      mutate(file.type, {
        onSuccess: async ({ presignedUrl, imageUrl }) => {
          try {
            const data = await API_SERVICES.IMAGE.uploadImage(
              file,
              presignedUrl,
              (progress) => {
                setProgress(progress);
                onUploadProgress?.(progress);
              }
            );

            setUrl(imageUrl);
            resolve({
              imageUrl,
              data,
            });
          } catch (error) {
            reject(error);
          }
        },
        onError: (e) => reject(e),
      });
    });

  const reset = () => {
    refData.current = undefined;
    setProgress(undefined);
    setUrl("");
  };
  return { reset, uploadImage, progress, url, refData };
};
