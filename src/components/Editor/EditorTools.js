import Code from "@editorjs/code";
import Header from "@editorjs/header";
import CustomImage from "./simpleImage";
export const EDITOR_TOOLS = {
  /* 
  ! if you want to support read-only mode, changle the flag to true
  */
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a header...",
      levels: [2, 3, 4], // Example levels for headers
      
      sanitize: {
        tags: {
          h2: true,
          h3: true,
          h4: true,
          h5: true,
          h6: true,
        },
      },
    },
    
    supportsReadOnly: true, // Set the flag for supporting read-only mode
  },
  code: {
    class: Code,
    supportsReadOnly: true, // Set the flag for supporting read-only mode
  },
  image: {
    class: CustomImage,
    supportsReadOnly: false, // Set the flag for NOT supporting read-only mode
    config: {
      // Add any other configuration options for the image tool here
      placeholder: "Paste an image URL...",
      
      // ...
    },
    
  },
  // image: SimpleImage,
};
