import BirthyearForm from "./BirthyearForm"
import { useQuery } from "@apollo/client"
import { GET_ALL_AUTHORS
 } from "../queries"
import { useEffect } from "react"
const Authors = ({show}) => {
  const authors = useQuery(GET_ALL_AUTHORS) 
  if (!show) {
    return null
  }
  if(!authors.loading) {
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthyearForm  authors={authors.data.allAuthors}/>
    </div>
  )
} else {
  return (
    <div>loading</div>
  )
}
}

export default Authors
