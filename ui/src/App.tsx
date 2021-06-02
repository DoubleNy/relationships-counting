import React from "react";
import "./App.css";
import { Relationships } from "./components/Relationships";
import { Box, Typography } from "@material-ui/core";
import { Bindings } from "./components/Bindings";
import { MyDropzone } from "./components/MyDropzone";
import { useRelationships } from "./hooks/useRelationships";
import { useBindings } from "./hooks/useBindings";

function App() {
  const { data: relationships } = useRelationships();
  const { data: bindings } = useBindings();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className="App"
    >
      <Box width="80vw" height="40vh">
        <Box pb={5}>
          <Typography variant="h4"> Relationships frequency</Typography>
        </Box>
        <Relationships relationships={relationships?.data.freq} />
      </Box>
      <Box pt={10} width="80vw" height="40vh">
        <Box pb={5}>
          <Typography variant="h4"> Bindings frequency</Typography>
        </Box>
        <Bindings bindings={bindings?.data.freq} />
      </Box>
      <Box pt={10} width="80vw" height="20vh">
        <MyDropzone />
      </Box>
    </Box>
  );
}

export default App;
