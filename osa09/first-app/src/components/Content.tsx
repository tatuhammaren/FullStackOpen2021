interface coursesProps {
    courses: Course[]

}
interface Course {
    name: string,
    exerciseCount: number
    }
const Content = (props: coursesProps) => {
    return (
        <div>
        {props.courses.map(
            courses => {
                return (
                    <p key={courses.name}>
                        {courses.name} {courses.exerciseCount}
                    </p>
                )
            }
        )}
        </div>

    )
        }
export default Content;