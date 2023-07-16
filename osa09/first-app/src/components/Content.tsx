import { CoursePart } from "../types";
import Part from "./Part";
interface coursesProps {
  courses: CoursePart[];
}
const Content = (props: coursesProps) => {
  return (
    <div>
      {props.courses.map((part) => {
        return (
          <div key={part.name}>
            <Part part={part} />
            <br />
          </div>
        );
      })}
    </div>
  );
};
export default Content;
