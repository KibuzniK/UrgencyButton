import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [waterHeight, setWaterHeight] = useState(1)
  const [flooded, setFlooded] = useState(false)
  const [empty, setEmpty] = useState(false)
  const intervalRef = useRef(null)

  const startRising = (speed) => {
    clearInterval(intervalRef.current)
    setFlooded(false)
    intervalRef.current = setInterval(() => {
      setWaterHeight(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current)
          setFlooded(true)
          return 100
        }
        return prev + speed
      })
    }, 50)
  }
  const startFalling = (speed) => {
    clearInterval(intervalRef.current)
    setFlooded(false)
    setEmpty(false)
    intervalRef.current = setInterval(() => {
      setWaterHeight(prev => {
        if (prev <= 0) {
          clearInterval(intervalRef.current)
          setEmpty(true)
          return 0
        }
        return prev - speed
      })
    }, 50)
  }

  useEffect(() => {
    startRising(0.1) // start rising slowly on load
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <>
      <div className="App">
        <div className="water"
            style={{ height: `${waterHeight}%` }}>
          <div className="wave"></div>
      </div>
        <div className="Body">
          <div className="Title">
            <div className="Please">
              Please!
            </div>
            <div className="NoTime">
              There is no Time!
            </div>
          </div>
          <div className="MainButton" onClick={() => startFalling(2)}>
            <h1 className="MainButtonText">
              Delete Plug
            </h1>
          </div>
          <div className="SecondaryButton" onClick={() => startRising(2)}>
            <h2 className="SecondaryButtonText">
              Cancel
            </h2>
          </div>
        </div>
      {flooded && (
        <div className="FloodMessage">
          <h2 className="FloodMessageText">Your'e dead!</h2>
        </div>
      )}
      {empty && (
        <div className="EmptyMessage">
          <h2 className="EmptyMessageText">Phew, that was close!</h2>
        </div>
      )}
      </div>
    </>
  )
}

export default App
