import { useState } from "react"
import axios from "axios"


const SearchForm = () => {

	const [username, setUserName] = useState("")
	const [loading, setLoading] = useState(false)
	const [repos, setRepos] = useState([])

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
			<div className="row" key={repo.id}>
				<h2 className="repo-name">
					{repo.name}
				</h2>
			</div>
		)
	}

  return (
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
  )
}
export default SearchForm