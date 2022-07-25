import { useQuery } from "@apollo/client";
import { GET_BOOKS, MEITSI } from "../queries";
const RecommendedBooks = ({show}) => {

    const user = useQuery(MEITSI)  
    const books = useQuery(GET_BOOKS,
        {
            variables: {genre: user?.data?.me?.favoriteGenre}
        })
        const showBooks = () => {
            if(books?.data?.allBooks.length >= 1) {
                return (
                    <table>
                    <tbody>
                    <tr>
                      <th></th>
                      <th>author</th>
                      <th>published</th>
                    </tr>
                    {books.data.allBooks
                    .map((a) => (
                      <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                )
            } else {
                return (
                    <p>no books yet.</p>
                )
            }

        }

    if (!show) {
        return null
      }
      if(user.loading && books.loading ) {
        return (
            <div>
                loading :3
            </div>
        )
      }
    
      return (

            <div>
            <h2>books in your favorite genre {`'${user?.data?.me?.favoriteGenre}'`}: </h2>
            {showBooks()}
            </div>
            )


}
export default RecommendedBooks