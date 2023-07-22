import React, { memo, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";

const EditorBlock = ({ data, onChange, holder, controls }) => {
  const { deleteData, setDeleteData } = controls;
  const ref = useRef();
  const [editorInstance, setEditorInstance] = useState(null);
  useEffect(() => {
    if (!ref.current) {
      /* 
      ! This filter is for the read-only mode
      const supportedTools = Object.entries(EDITOR_TOOLS).reduce((acc, [toolName, toolConfig]) => {
          if (toolConfig.supportsReadOnly) {
              acc[toolName] = toolConfig;
            }
            return acc;
          }, {});
          */

      const editor = new EditorJS({
        /*
        ! if you want to use the read-only mode, uncomment the following line
        tools: supportedTools,
        readOnly: true,
        
        * And delete the following line */
        tools: {
          ...EDITOR_TOOLS,
        },
        holder: holder,
        placeholder: "Let's write an awesome blog!",
        data: {},
        autofocus: true,
        onChange: async (api, event) => {
          const data = await api.saver.save();
          deleteData ? onChange({ blocks: [] }) : onChange(data);
        },
      });

      // Save the editor instance in the state variable
      setEditorInstance(editor);

      // Save the editor instance in the ref for cleanup
      ref.current = editor;
    }
  }, [data, holder, onChange]);

  /*
  ! This function is for the read-only mode
  const renderBlock = (block) => {
    if (!block || !block.type) {
      return null;
    }

    switch (block.type) {
      case "header":
        const headerElement = document.createElement("h3");
        headerElement.textContent = block.data.text;
        return headerElement;
        case "delimiter":
          return document.createElement("hr");
          case "image":
            if (block.data.url) {
              const imageContainer = document.createElement("div");
              const imageElement = document.createElement("img");
              imageElement.src = block.data.url;
              imageElement.alt = block.data.caption || "";
              imageElement.style.maxWidth = "100%";
              imageElement.style.borderRadius = "5px";
              imageContainer.appendChild(imageElement);
              
              if (block.data.caption) {
                const captionElement = document.createElement("div");
                captionElement.textContent = block.data.caption;
                imageContainer.appendChild(captionElement);
              }
              
              return imageContainer;
            }
            return null;
            default:
        return null;
      }
    };
    
    useEffect(() => {
      // Check if the editor instance is available and the data contains blocks
      if (editorInstance && data && data.blocks) {
        // Remove the "holder" element's content
        const holderElement = document.getElementById(holder);
        if (holderElement) {
          holderElement.innerHTML = "";
          
          // Render each block
          data.blocks.forEach((block) => {
            const blockElement = renderBlock(block);
            if (blockElement) {
              holderElement.appendChild(blockElement);
            }
          });
        }
      }
    }, [editorInstance, data, holder]);
    */

    useEffect(() => {
      // Check if the editor instance is available and the deleteData flag is true
      if (editorInstance && deleteData) {
        // Remove all blocks from the editor
        editorInstance.clear();
        setDeleteData(false);
      }
    }, [editorInstance, deleteData]);

  return (
    <>
      <div id={holder} className="bg-white" />
    </>
  );
};

export default memo(EditorBlock);
