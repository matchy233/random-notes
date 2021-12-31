# General LaTeX tricks

一些我还没有熟练掌握的 \\(\LaTeX\\) 技巧

## 在 math environment 里 format 字体

### Bold

```latex
% preamble
% ...

\usepackage{bm}

% ...
% end of preamble

\begin{document}
% ...

\[
    \bm{A}
\]

%...
\end{document}
```

```latex
\begin{document}
% ...

\[
    \bm{A}
\]

%...
\end{document}
```

## Insert pdf pages in a \\(\LaTeX\\) file

对于做 take-home exam 有奇效。

```latex
% preamble
% ...

\usepackage{pdfpages}

% ...
% end of preamble

\begin{document}
% ...

% include all pages
\includepdf[pages=-]{pdfname1.pdf}

% include certain pages (here 1, 3, 5)
\includepdf[page={1,3,5}]{pdfname2.pdf}

%...
\end{document}
```
