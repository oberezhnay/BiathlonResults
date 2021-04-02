import React, { useState, useEffect, useMemo } from 'react';
import api from './services/api';
import ResultsItems from './Components/ResultsItems/ResultsItems'
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [initialResults, setInitialResults] = useState([]);
  const [search, setSearch] = useState('');
  const [sortedHead, setSortedHead] = useState(null);
  const [sortState, setSortState] = useState({
    asc: false
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  useEffect(() => {
    api.get('').then(resp => {
      resp.data.sort((a,b)=>a.rateOfFire-b.rateOfFire);
      resp.data.sort((a,b)=>a.shooting.reduce(reducer)-b.shooting.reduce(reducer));
      setInitialResults(resp.data);
      setResults(resp.data);
    })
  }, []);

  const setFilter = (headName) => {
    setSortedHead(headName);
    setSortState({
      asc: !sortState.asc
    })
  }

  useMemo(() => {
    if(sortedHead !== null) {
      if(sortedHead === 'shooting') {
        results.sort((a, b) => {
          if(a.shooting.reduce(reducer) < b.shooting.reduce(reducer)) {
            return sortState.asc ? -1 : 1;
          }
          if(a.shooting.reduce(reducer) > b.shooting.reduce(reducer)) {
            return sortState.asc ? 1 : -1;
          }
          return 0;
        });
      } else{
        results.sort((a, b) => {
          if(a[sortedHead] < b[sortedHead]){
            return sortState.asc ? -1 : 1;
          }
          if(a[sortedHead] > b[sortedHead]){
            return sortState.asc ? 1 : -1;
          }
          return 0;
        });
      }
      setResults(results)
    } 
}, [results, sortState, sortedHead])

  const onSearch = (searchPayload) => {
    setSearch(searchPayload);
    const searchRegExp = new RegExp(searchPayload, 'gi')
    return searchPayload
    ? setResults(initialResults.filter(item => item.name.match(searchRegExp))) 
    : setResults(initialResults);
  }

  return (
  <>
    <header className="app-header">Biathlon</header>
    <input 
      type="text" 
      value={search} 
      placeholder="Search by name..."
      onChange={({target}) => onSearch(target.value)}
    />
    <table>
      <thead>
          <tr>
              <th>rank</th>
              <th onClick = {() => setFilter('name')}>name  ⇅</th>
              <th>hit rate</th>
              <th onClick = {() => setFilter('shooting')}>shooting  ⇅</th>
              <th>total</th>
              <th onClick = {() => setFilter('rateOfFire')}>rate of fire  ⇅</th>
          </tr>
      </thead>
      <ResultsItems results={results} />
    </table>
  </>  
  )
}

export default App;
