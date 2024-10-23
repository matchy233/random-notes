# Tricks on Windows

Windows 上的一些奇技淫巧

## 强制删除任何文件以及文件夹

First thing first: Run cmdlet as Administrator.

### 删除文件

```cmd
del /f <path-to-file>
```

### 删除文件夹

```cmd
takeown/f <path-to-file> /r /d y
icacls <path-to-file> /grant administrators:F /t
rd /s /q <path-to-file>
```

## 删除 Service

In short, use `sc delete <service-name>`.

```cmd
sc stop <service-name>
sc delete <service-name>
```

But the service name must be short service name.

Use `sc query` to get the short service name.

```cmd
$ sc query state= all | find "<service-name>"
  SERVICE_NAME: <service-name>
```

Sometimes you might need to print the context of your search because you might match to DISPLAY_NAME instead of SERVICE_NAME. `cmd` does not have `grep` like powerful string search tool (neither `find` nor `findstr` can do this). Use `Select-String` in PowerShell instead.

Note that `sc` is the alias of `Set-Content` in PowerShell. One should use `sc.exe` to call the `sc` command.

```powershell
# print 5 lines before and after the match
sc.exe query state= all | Select-String -Pattern "<service-name>" -Context 5, 5
```
