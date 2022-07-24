import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(true)

  const initialState = {
    users: [],
    loading: false,
  }
  // reducer hook
  //state = githubReducerdaki verileri taşıyacak prop
  //dispatch = githubReducerdaki verileri setleyecek prop
  //useReducer(githubReducer, initialState) githubReducer = main reducer
  //useReducer(githubReducer, initialState) initialState = state değişkenleri
  const [state, dispatch] = useReducer(githubReducer, initialState)

  //get initial users
  const fetchUsers = async () => {
    setLoading()
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const data = await response.json()

    // dispatch === setUsers(data) gibi
    // type ile reducerdaki hangi metodun çalıstırılacagı
    // patload ile handi verinin işlenecegi belirleniyor.
    dispatch({
      type: 'GET_USERS', // GithubReducer.js case 1
      payload: data,
    })
  }

  //set loading
  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    })

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
