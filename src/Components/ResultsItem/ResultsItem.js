import React from 'react'

function ResultsItem({item, items}) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    function getTotal(arr){
        return arr.reduce(reducer)
    }

    function getHitRate(arr){
        return (20-getTotal(arr))*5
    }

    function getRank(item){
        return items.indexOf(item)+1
    }
    
    return (
        <tr>
            <td>{getRank(item)}</td>
            <td>{item.name}</td>
            <td>{getHitRate(item.shooting)}%</td>
            <td>[{item.shooting[0]}+{item.shooting[1]}+{item.shooting[2]}+{item.shooting[3]}]</td>
            <td>{getTotal(item.shooting)}</td>
            <td>{item.rateOfFire}</td>
        </tr>
    )
}

export default ResultsItem
