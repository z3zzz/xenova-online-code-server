import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const iframeHTML = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", e => {
            try {
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
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = iframeHTML;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      title="test"
      sandbox="allow-scripts"
      srcDoc={iframeHTML}
      ref={iframe}
    />
  );
};

export default Preview;
