import axios from 'axios'
const baseUrl = `${process.env.PUBLIC_URL}/api/login`

const login = async credentials => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch(e) {
    return e
  }
}

export default { login }