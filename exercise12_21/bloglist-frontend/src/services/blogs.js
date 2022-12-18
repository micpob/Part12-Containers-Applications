import axios from 'axios'
const baseUrl = `${process.env.PUBLIC_URL}/api/blogs`

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addComment = async (comment, id) => {
  const response = await axios.put(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

const addLike = async (newBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.delete((`${baseUrl}/${id}`), config)
  return response.status
}

export default { setToken, getAll, create, addComment, addLike, remove  }