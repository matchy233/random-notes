# Java IO

## Java IO Class 整理

| |Byte Based Input| Byte Based Output | Character Based Input | Character Based Output |
| --- | --- | --- | --- | --- |
|Basic|InputStream|OutputStream| Reader<br>InputStreamReader|Writer<br>OutputStreamWriter |
|Arrays|ByteArrayInputStream|ByteArrayOutputStream|CharArrayReader|CharArrayWriter
|Files|FileInputStream
|RandomAccessFile|FileOutputStream
|RandomAccessFile|FileReader|FileWriter
|Pipes|PipedInputStream|PipedOutputStream|PipedReader|PipedWriter
|Buffering|BufferedInputStream|BufferedOutputStream|BufferedReader|BufferedWriter
|Filtering|FilterInputStream|FilterOutputStream|FilterReader|FilterWriter
|Parsing|PushbackInputStream
|StreamTokenizer| |PushbackReader
|LineNumberReader|
|Strings| | |StringReader|StringWriter
|Data|DataInputStream|DataOutputStream| |
|Data - Formatted| |PrintStream| |PrintWriter
|Objects|ObjectInputStream|ObjectOutputStream| |
|Utilities|SequenceInputStream|
