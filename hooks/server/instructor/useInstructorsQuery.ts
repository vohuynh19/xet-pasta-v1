import { useQuery } from "@tanstack/react-query";
import { API_SERVICES, REACT_QUERY_KEYS } from "src/infra/https";

const useInstructorsQuery = () => {
  const queryData = useQuery<Instructor[], ApiError>(
    REACT_QUERY_KEYS.GET_INSTRUCTORS,
    API_SERVICES.INSTRUCTOR.getInstructors
  );

  return queryData;
};

export default useInstructorsQuery;
