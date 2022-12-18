import axios from 'axios'
const baseUrl = `${process.env.PUBLIC_URL}/api/registration`

const register = async credentials => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch(e) {
    return e
  }
}

export default { register }