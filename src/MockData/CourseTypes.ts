export interface CourseProps {
    id: number;
    "duration": string;
    "name": string;
    "Description": string;
    "Enrollmentstatus": string;
    "Instructor": string;
    "Location": string;
    "Prerequisites": string,
    "Schedule": string,
    "Syllabus": {
        "Week 1"?:string,
        "Week 10"?:string,
        "Week 11"?:string,
        "Week 12"?:string,
        "Week 2"?:string,
        "Week 3"?:string,
        "Week 4"?:string,
        "Week 5"?:string,
        "Week 6"?:string,
        "Week 7"?:string,
        "Week 8"?:string,
        "Week 9"?:string
      }
}
