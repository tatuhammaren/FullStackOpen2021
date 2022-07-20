import { useState } from 'react'
import Select from 'react-select';
import { useMutation } from '@apollo/client'
import { GET_ALL_AUTHORS, UPDATE_BIRTHYEAR } from '../queries'

const BirthyearForm = ({authors}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [author, setAuthor] = useState('')
    const [newBorn, setNewBorn] = useState('')
    const [editAuthor] = useMutation(UPDATE_BIRTHYEAR, {
      refetchQueries: [{query: GET_ALL_AUTHORS}],
    })

    const submit = async (event) => {
      event.preventDefault()
      console.log(author);
      editAuthor({variables: {name: author.value, setBornTo: parseInt(newBorn)}})
      setNewBorn('')
      setAuthor('')
  
    }
    return (
        <div>
        <h2>Set birthyear</h2>
        <div>
      <form onSubmit={submit}>
        <div>
          author
          <Select
            defaultValue = {authors[0]}
            onChange = {setAuthor}
            options = {authors.map((a) => {
                return {
                    value: a.name.toLowerCase(),
                    label: a.name
                }
            })} />
        </div>
        <div>
          birthyear
          <input
            type="number"
            value={newBorn}
            onChange={({ target }) => setNewBorn(target.value)}
          />
        </div>
        <button type="submit">change</button>
      </form>
    </div>
      </div>
    )
}

export default BirthyearForm