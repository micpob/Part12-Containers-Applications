import axios from 'axios'
const baseUrl = `${process.env.PUBLIC_URL}/api/users`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }