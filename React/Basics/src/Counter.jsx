import React , {useState} from 'react'

const Counter = () => {
    const [num, setNum] = useState(0)

    function increaseByThree () {
        // setNum(num + 3)
        // setNum(num + 3)
        // setNum(num + 3)


        setNum(prev => prev + 3)
        setNum(prev => prev + 3)
        setNum(prev => prev + 3)
        
    }


  return (
    <div>

        <h5>{num}</h5>
        <button onClick={increaseByThree}>click </button>
    </div>
  )
}

export default Counter
