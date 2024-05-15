import Form from './components/Form'
import { legendState } from './context/LegendProvider'
import DataPage from './pages/DataPage'
import LeafletPage from './pages/LeafletPage'

function App() {
  const { select } = legendState()
  
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {select === "leaflet" && <LeafletPage />}
      {select === "d3" && <DataPage />}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
      >
        <Form />
      </div>
    </div>
  )
}

export default App