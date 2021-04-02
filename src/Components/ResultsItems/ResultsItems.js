import React from 'react';
import ResultsItem from '../ResultsItem/ResultsItem'

function ResultsItems({results}) {
    return (
        <tbody>
            {results.map((item)=>(
                <ResultsItem 
                    key = {item.id}
                    item = {item}
                    items = {results}
                />
            ))}
        </tbody>
    )
}

export default ResultsItems
