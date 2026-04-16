import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [waterHeight, setWaterHeight] = useState(1)
  const [flooded, setFlooded] = useState(false)
  const [empty, setEmpty] = useState(false)
  const intervalRef = useRef(null)
  const [mainClicked, setMainClicked] = useState(false)
  const [mainVisible, setMainVisible] = useState(true)
  const [mainHeld, setMainHeld] = useState(false)


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
    startRising(0.2) // start rising slowly on load
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleMainButtonClick = () => {
    setMainClicked(true)
    startFalling(2)
  }

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
              
            </div>
            <div className="NoTime">
              
            </div>
          </div>
          {mainVisible && (
              <div 
                className={`MainButton ${mainClicked ? 'MainButton--clicked' : ''} ${mainHeld ? 'MainButton--held' : ''}`}
                onClick={handleMainButtonClick}
                onMouseDown={() => setMainHeld(true)}
                onMouseUp={() => setMainHeld(false)}
                onMouseLeave={() => setMainHeld(false)}
                onAnimationEnd={() => setMainVisible(false)}
              >
                <h1 className="MainButtonText">Delete</h1>
                                <h1 className="MainButtonText">Plug</h1>

              </div>
            )}
          <div className={`SecondaryButton ${mainClicked ? 'SecondaryButton--Mainlicked' : ''}`} onClick={() => startRising(2)}>
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
