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

## `pdfpages`: insert pdf pages in a \\(\LaTeX\\) file

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

## `datetime2`: foramt datetime :)

Set up new date style

The 4 input parameters for `\DTMdisplaydate` are 1. year, 2. month, 3. date, 4. `dow`.
The package asks the users to refer to the input parameters using a **double-hash + param number**. Thus, while designing the format string, we should refer to **year** by `##1`, **month** by `##2` and **date** by `##3`.

```latex
\DTMnewdatestyle{kordate}% label, just a token
{% definitions
    \renewcommand*{\DTMdisplaydate}[4]{
        % format string
        \number##1년 \number##2월 \number##3일
    }%
    \renewcommand*{\DTMDisplaydate}{\DTMdisplaydate} %Capitalize
}
```

Also note that, any fragile command used by the format string (inside `\renewcommand`) should be wrapped with `\protect`. An example in the (not so easy to read documentation of `datetime2`) below:

```latex
% omitted preamble
\DTMnewdatestyle{usvardate}{%
    \renewcommand{\DTMdisplaydate}[4]{%
        \DTMmonthname{##2} \ordinalnum{##2}, \number##1 }%
    \renewcommand{\DTMDisplaydate}{\DTMdisplaydate}%
}%
\DTMsetdatestyle{usvardate}

\begin{document}
    \section{\today: an example}
    \today.
\end{document}
```

This document can’t compile properly and causes the error:

```text
! Argument of \@sect has an extra }.
<inserted text>
                \par
```

This is because the style definition has made `\today` **fragile** because it uses an unprotected
**fragile** command. This can be fixed by protecting `\ordinalnum` in the style definition.
