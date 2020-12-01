# Effective Shell

## Navigating along the command line

| 功能 | 快捷键 |
| --- | --- | --- |
| 定位到行开头 | `Ctrl` + `A` 或者 `Home` |
| 定位到行末尾 |  `Ctrl` + `D` 或者 `End` |
| 向前（行首）<br>移动一个词 |  `Alt` + `B` 或者 `Ctrl` + `<-` |
| 向后（行末）<br>移动一个词 |  `Alt` + `F` 或者 `Ctrl` + `->` |
| 删除整行（`zsh`） |  `Ctrl` + `U` |
| 删除光标处到行首的所有字符（非 `zsh`） |  `Ctrl` + `U` |
| 删除光标处到行末的所有字符 |  `Ctrl` + `K` |
| 删除一个词 | `Ctrl` + `W` 或者 `Alt` + `D` |
| 上一条命令 | `Ctrl` + `P` 或者 ⬆ |
| 下一条命令 | `Ctrl` + `N` 或者 ⬇ |
| 打开编辑器编辑当前指令 | `Ctrl` + `X`, `E` |

`Ctrl` + `X`,`E` 打开的编辑器是通过环境变量 `$EDITOR` 指定的。

这里有一张非常棒的图可作总结：

![Navigating the Command Line](img/2020-11-11-23-27-58.png)

## Using `screen` to leave work running

1. `screen`
2. Run command
3. `Ctrl` + `A`, `Ctrl` + `D`
4. Leave server / shell
5. `screen -r` to resume
