# PowerShell Usage Tips

## Intro to PowerShell

1. 不区分大小写

## Unix shell command line tools alternatives

| Unix shell command | Powershell counterpart | 功能 |
| --- | --- | --- |
| `man` | `Get-Help` | Get help :/ |
| `--help` | `/?` | Another way to get help :/（有的 PowerShell program 也有 help）|
| `which` | `Get-Command` | Return  the  pathnames of the files (or links) which would be executed in the current environment |
| `grep` | `findstr` | 匹配字符串（用法有区别）|
| `xdg-open` | `start` or `Invoke-Item` | 使用默认程序打开文件（打开 pdf 利器！）<br>WSL： `wslview` |
| `touch` | `New-Item` | Create file (glob) |
