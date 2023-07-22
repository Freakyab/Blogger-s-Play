import React, { memo, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";
import SimpleImage from "@editorjs/simple-image";

const EditorBlock = ({ data, holder, controls }) => {
  const blog = data.data;
  const { toggle, deleteId, index, setNewData, setNewIndex } = controls;
  const ref = useRef();
  const [editorInstance, setEditorInstance] = useState(null);

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        readOnly: toggle,
        tools: !toggle
          ? EDITOR_TOOLS
          : {
              ...EDITOR_TOOLS,
              image: SimpleImage,
            },
        holder: holder,
        placeholder: "Let's write an awesome blog!",
        data: blog,
        autofocus: true,
        onChange: async (api, event) => {
          const newData = await api.saver.save();
          if (event.type === "block-changed") {
            setNewData(newData);
            setNewIndex(index);
          }
        },
      });
      setEditorInstance(editor);

      ref.current = editor;
    }
  }, [blog, holder, toggle]);

  useEffect(() => {
    if (
      editorInstance &&
      typeof deleteId === "number" &&
      deleteId >= 0 &&
      deleteId < blog.blocks.length
    ) {
      console.log(blogDataupdate);
    }
  }, [deleteId, blog, editorInstance]);

  return <div id={holder} className="bg-white " />; // Adjusted width using responsive classes
};

export default memo(EditorBlock);
