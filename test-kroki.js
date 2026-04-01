const pako = require('pako');

// Exact same tikzString as in mockProblems.ts
const tikzCode = `\\begin{tikzpicture}[scale=0.8]
  % Try changing the variables a, b, and c below to see how the parabola changes!
  \\def\\a{1}
  \\def\\b{0}
  \\def\\c{-2}
  
  % Grid and Axes
  \\draw[very thin,color=gray!30] (-4,-4) grid (4,4);
  \\draw[->,thick] (-4.5,0) -- (4.5,0) node[right] {$x$};
  \\draw[->,thick] (0,-4.5) -- (0,4.5) node[above] {$y$};
  
  % Plotting the function
  \\draw[domain=-2.5:2.5,smooth,variable=\\x,blue,thick] plot ({\\x},{\\a*\\x*\\x + \\b*\\x + \\c});
\\end{tikzpicture}`;

let code = tikzCode;
if (!code.includes("\\documentclass")) {
  code = `\\documentclass[tikz, border=2mm, convert=pdf2svg]{standalone}\n\\begin{document}\n${code}\n\\end{document}`;
}

const data = new TextEncoder().encode(code);
const compressed = pako.deflate(data, { level: 9 });
let binary = '';
for (let i = 0; i < compressed.length; i++) {
  binary += String.fromCharCode(compressed[i]);
}
const base64 = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const url = `https://kroki.io/tikz/svg/${base64}`;

console.log("URL:", url);

fetch(url).then(r => r.text().then(t => {
  console.log("Status:", r.status);
  if (r.status === 200) {
    console.log("SVG starts with:", t.substring(0, 100));
  } else {
    console.log("Error:", t);
  }
}));
