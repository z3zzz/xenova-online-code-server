import { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  err: string;
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
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            document.body.parentElement.style.backgroundColor = "pink"

            const div = document.querySelector('#root')
            div.innerHTML = 
              '<div style="color: red;">' + 
                '<h4>Runtime Error</h4>' + 
                err + 
              '</div>'

            console.error(err)
          }
          
          window.addEventListener("error", e => {
            e.preventDefault()
            handleError(e.message)
          })

          window.addEventListener("message", e => {
            try {
              if (e.data.includes("Build failed with")){
                const errContent = e.data.split("error:")[2]
                throw new Error(errContent) 
              }

              eval(e.data)
            } catch (err) {
              handleError(err.message)
            }
          }, false)
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = iframeHTML;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code + err, "*");
    }, 50);
  }, [code, err]);

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
