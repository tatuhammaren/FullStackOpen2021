import axios from "axios";


const URL = '/api/persons'

const getAll = () => {
    const req = axios.get(URL)

    return req.then(response => response.data)
}

const create = newObject => {
    const req = axios.post(URL, newObject)

    return req.then(response => response.data)
}

const update = (id, newObject) => {
    const req = axios.put(`${URL}/${id}`, newObject)

    return req.then(response => response.data)
}

const removeData = id => {
    const req = axios.delete(`${URL}/${id}`)

    return req.then(response => response.data)
}

const exportees = { getAll, create, update, removeData }

export default exportees