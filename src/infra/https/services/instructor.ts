import {
  instructorsMock,
  instructorMock,
} from "../entities/instructor/instructor.mock";

const InstructorService = {
  getInstructors: (): Promise<Instructor[]> =>
    new Promise((resolve) => {
      resolve(instructorsMock);
    }),
  getInstructor: (): Promise<Instructor> =>
    new Promise((resolve) => {
      resolve(instructorMock);
    }),
};

export default InstructorService;
