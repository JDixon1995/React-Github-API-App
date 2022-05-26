import './App.css';
import { useState } from "react"
import axios from "axios"
import RepoDetails from './components/RepoDetails'

const App = () => {

  const [username, setUserName] = useState("")
	const [loading, setLoading] = useState(false)
	const [repos, setRepos] = useState([])
	const [details, setDetails] = useState({})
  const [detailsLoading, setDetailsLoading] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		searchRepos()
	}

	const searchRepos = () => {
		setLoading(true)
		axios({
			method: "GET",
			url: `https://api.github.com/users/${username}/repos`,
		}).then(res => {
			setLoading(false)
			setRepos(res.data)
		})
	}

	const renderRepo = (repo) => {
		return (
			<div className="row" onClick={() => getDetails(repo.name)} key={repo.id}>
				<h2 className="repo-name">
					{repo.name}
				</h2>
			</div>
		)
	}

  const getDetails = (repoName) => {
    setDetailsLoading(true)
    axios({
      method: "GET",
      url: `https://api.github.com/repos/${username}/${repoName}`,
    }).then(res => {
      setDetailsLoading(false)
      setDetails(res.data)
    })
  }

  return (
    <div className="App">
      <div className='page'>
        <div className='landing-page-container'>
          <div className="left-side">
		        <form className="form">
			      <input
			      className="input"
			      value={username}
			      placeholder='Github Username'
			      onChange={e => setUserName(e.target.value)}
			      >
			      </input>
			      <button className="button" onClick={handleSubmit}>
			      {loading ? "Searching..." : "Search"}
			      </button>
		        </form>
		          <div className="results-container">
			        {repos.map(renderRepo)}
		          </div>
	          </div>
            <RepoDetails details={details} loading={detailsLoading} />
          </div>
      </div>
    </div>
  );
}

export default App;
