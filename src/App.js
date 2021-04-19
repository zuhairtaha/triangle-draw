import React, { useRef, useEffect } from 'react';
import { TriangleDrawer } from './triangle';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const triangleDrawer = new TriangleDrawer(canvas);
    triangleDrawer.draw(100, 100, 100);
  }, []);

  return (
    <div className='App'>
      <canvas ref={canvasRef} width='500' height='400'></canvas>
    </div>
  );
}

export default App;
