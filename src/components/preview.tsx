import { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
}

const iframeHTML = `
    <html>
    <head>
    <style>
      html {
        background-color: white;
      }
    </style>
    </head>
      <body>
        <div id="root">abcde</div>
        <script>
          window.addEventListener("message", e => {
            try {
              console.log("from iframe: ", e.data)
              eval(e.data)
            } catch (err) {
              const div = document.querySelector('#root')
              div.innerHTML = 
                '<div style="color: red;">' + 
                  '<h4>Runtime Error</h4>' + 
                  err + 
                '</div>'
              console.error(err)
            }
          }, false)
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    console.log({ code });
    iframeRef.current.srcdoc = iframeHTML;
    setTimeout(iframeRef.current.contentWindow.postMessage(code, "*"), 1000);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="test"
        sandbox="allow-scripts"
        srcDoc={iframeHTML}
        ref={iframeRef}
      />
    </div>
  );
};

export default Preview;
