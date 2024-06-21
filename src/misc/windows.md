# Tricks on Windows

Windows 上的一些奇技淫巧

## 强制删除任何文件以及文件夹

Run cmdlet as Administrator.

```cmd
takeown/f <path-to-file> /r /d y
icacls <path-to-file> /grant administrators:F /t
rd /s /q <path-to-file>
```
