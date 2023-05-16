interface coursesProps {
    courses: Course[]

}
interface Course {
    name: string,
    exerciseCount: number
    }

const Total = (props: coursesProps) => {
    return (<p>
        Number of exercises{" "}
        {props.courses.reduce((a, b) => a + b.exerciseCount, 0)}
    </p> );
}
 
export default Total;