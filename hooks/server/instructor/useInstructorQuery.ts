import { useQuery } from "@tanstack/react-query";
import { API_SERVICES, REACT_QUERY_KEYS } from "src/infra/https";

const useInstructorQuery = (params: { id: string }) => {
  const queryData = useQuery<Instructor, ApiError>(
    REACT_QUERY_KEYS.GET_INSTRUCTOR(params.id),
    API_SERVICES.INSTRUCTOR.getInstructor
  );

  return queryData;
};

export default useInstructorQuery;
