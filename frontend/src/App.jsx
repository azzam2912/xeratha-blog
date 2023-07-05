import './App.css';
import React, {useEffect, useState, useRef} from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Editor } from '@tinymce/tinymce-react';

function App() {
  const [tex, setTex] = useState("");
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  
  useEffect(() => {
    if(typeof window?.MathJax !== "undefined" ){
      window.MathJax.typesetClear()
      window.MathJax.typeset();
    }
  }, [tex])

  return (
    <div>
      <h2>Math Jax Experimental</h2>
      <input onChange={(e) => {setTex(e.target.value)}}></input>
      <br></br>
      <h4>Result:</h4>
      <p>{tex}</p>
      <br></br>
      <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue="<p>This is the initial content of the editor.</p>"
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
       <button onClick={log}>Log editor content</button>
    </div>
  );
}

export default App;
