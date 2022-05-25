import './App.css';
import SearchForm from './components/SearchForm';

const App = () => {
  return (
    <div className="App">
      <div className='page'>
        <h1>Github API</h1>
        <div className='landing=page-container'>
          <SearchForm />
        </div>
      </div>
    </div>
  );
}

export default App;
