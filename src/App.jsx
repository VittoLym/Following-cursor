import styled from 'styled-components'
import { useState, useEffect } from 'react';

function App() {
  const [enabled, setEnabled] = useState(false)

  const [position, setPosition] = useState({ x: -100, y: -100 })
  useEffect(() => {

    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) { window.addEventListener('pointermove', handleMove) }

    return () => { window.removeEventListener('pointermove', handleMove) }
  }, [enabled])

  return (
    <Main>
      {!enabled
        ? <span></span>
        : <Div translateX={position.x} translateY={position.y}></Div>
      }
      <H1>cursor following</H1>
      <button onClick={() => { setEnabled(!enabled) }}>
        {enabled ? 'Dejar de seguir' : 'Seguír puntero'}
      </button>
    </Main>
  )
}

export default App

const Main = styled.main`
`;
const H1 = styled.h1`
  margin: 0;
  text-align: center;
`;
const Div = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, .5);
  border-radius: 50%;
  border: 1px solid #fff;
  opacity: .8;
  pointer-events: none;
  left: -20px;
  top: -20px;
  width: 40px;
  height: 40px;
  transform: translate(${props => `${props.translateX || 0}px, ${props.translateY || 0}px`});
`;