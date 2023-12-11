import { Button } from "@material-ui/core";
import { useState } from "react";
import VideoCall from "./VideoCall.jsx";


function App() {
  const [isInCall, setIsInCall] = useState(false)
  
  
  return (
    <div style={{ height: "100%", display:'flex', justifyContent:"center", alignItems:"center" }}>
      {isInCall ? (
        <VideoCall setIsInCall={setIsInCall} isInCall={isInCall} />
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            setIsInCall(true);
          }}
        >
          Join Call
        </Button>
      )}
    </div>
  );
}

export default App;
