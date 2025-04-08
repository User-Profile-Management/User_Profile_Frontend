import { atom } from "recoil";
 
export const studentsCountState = atom({
  key: "studentsCountState",
  default: 0,
});
 
export const mentorsCountState = atom({
  key: "mentorsCountState",
  default: 0,
});
 
export const projectsCountState = atom({
  key: 'projectsCountState',
  default: 0,
});
 
export const studentsListState = atom({
  key: "studentsListState",
  default: [],
});
 
export const selectedStudentState = atom({
  key: "selectedStudentState",
  default: null,
});
 
export const mentorsListState = atom({
  key: "mentorsListState",
  default: [],
});
 
export const userState = atom({
  key: "userState",
  default: {
    userId: "",
    fullName: "",
    email: "",
    roleName: "",
    
  },
});
 
 