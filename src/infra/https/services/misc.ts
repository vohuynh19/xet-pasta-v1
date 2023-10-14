import { API_ENDPONTS } from "..";
import axiosInstance from "../axios";

const MiscService = {
   
    sendFeedback: (payload: UserFeedbackPayload) =>
    axiosInstance.post(
      `${API_ENDPONTS.misc.CREATE_FEEDBACK}`,
      {
        email: payload.email,
        feedback:payload.feedback,
        preName: payload.preName,
        phoneNumber:payload.phoneNumber,
      }
    ),
};

export default MiscService;
