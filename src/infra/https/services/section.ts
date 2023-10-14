import { API_ENDPONTS } from "..";
import axiosInstance from "../axios";

const SectionService = {
  get: (filter: PaginationType) =>
    axiosInstance
      .get<PaginationResponse<SSection>>(API_ENDPONTS.video.VIDEO_SECTION, {
        params: {
          ...filter,
        },
      })
      .then((d) => d.data),
  create: (payload: VideoPayload) =>
    axiosInstance.post(API_ENDPONTS.video.VIDEO_SECTION, { ...payload }),
  delete: (sectionId: string) =>
    axiosInstance.delete(API_ENDPONTS.video.VIDEO_SECTION_DETAIL(sectionId)),
};

export default SectionService;
