const input = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
const copyIcon = document.querySelector('#copy-icon');
const downloadIcon = document.querySelector('#download-icon');

// Update preview on input change
input.addEventListener('input', updatePreview);

// Add event listeners to icons
copyIcon.addEventListener('click', copyMarkdown);
downloadIcon.addEventListener('click', downloadMarkdown);

function updatePreview() {
  const markdown = input.value;
  const html = marked.parse(markdown);
  preview.innerHTML = html;
}

function copyMarkdown() {
  input.select();
  document.execCommand('copy');
}

function downloadMarkdown() {
  const markdown = input.value;
  const blob = new Blob([markdown], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'markdown_file.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// code editor 

function run(){
   let htmlCode = document.getElementById('html-code').value;
   let cssCode = document.getElementById('CSS-code').value;
   let jsCode = document.getElementById('JS-code').value;
   let output= document.getElementById('output');

 output.contentDocument.body.innerHTML = htmlCode +'<style>'+cssCode+'</style>';
 output.contentWindow.eval(jsCode);

}

function saveCode() {
  let htmlCode = document.getElementById('html-code').value;
  let cssCode = document.getElementById('CSS-code').value;
  let jsCode = document.getElementById('JS-code').value;

  if (htmlCode.trim() !== '') {
      downloadFile(htmlCode, 'myCode.html', 'text/html');
  }

  if (cssCode.trim() !== '') {
      downloadFile(cssCode, 'myStyle.css', 'text/css');
  }

  if (jsCode.trim() !== '') {
      downloadFile(jsCode, 'myScript.js', 'text/javascript');
  }
}

function downloadFile(content, filename, contentType) {
  let blob = new Blob([content], { type: contentType });

  // Create a temporary anchor element
  let a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();

  // Clean up
  URL.revokeObjectURL(a.href);
}
