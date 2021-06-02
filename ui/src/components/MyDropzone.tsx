import React from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button } from "@material-ui/core";
import { postFile } from "../api/services/file";

export const MyDropzone = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: "text/xml",
  });

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleOnClick = async () => {
    const ans = await postFile(acceptedFiles[0]);
    console.log(ans);
  };

  return (
    <Box>
      <Box
        py={1}
        display="flex"
        flexDirection={"row-reverse"}
        justifyContent="end"
      >
        <Button variant="outlined" onClick={handleOnClick}>
          Load
        </Button>
        <Button style={{ marginRight: "5px" }} variant="outlined">
          Clear
        </Button>
      </Box>
      <Box
        style={{
          border: "1px dashed",
          borderRadius: "25px",
          background: "lightgray",
          opacity: "0.7",
        }}
        className="container"
      >
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p
            style={{
              fontWeight: "bold",
            }}
          >
            Drag 'n' drop the XML file here, or click to select the file
          </p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </Box>
    </Box>
  );
};
