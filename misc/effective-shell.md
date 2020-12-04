# Effective Shell

- [Effective Shell](#effective-shell)
  - [Navigating along the command line](#navigating-along-the-command-line)

## Navigating along the command line

可能应该录制一个 gif 来展示功能。

| 功能 | 快捷键 |
| --- | --- |
| 定位到行开头 | `Ctrl` + `A` 或者 `Home` |
| 定位到行末尾 |  `Ctrl` + `D` 或者 `End` |
| 向前（行首）移动<br>一个词 |  `Alt` + `B` 或者 `Ctrl` + ⬅ |
| 向后（行末）移动<br>一个词 |  `Alt` + `F` 或者 `Ctrl` + ➡ |
| 删除整行（`zsh`） |  `Ctrl` + `U` |
| 删除光标处到行首的<br>所有字符（非 `zsh`） |  `Ctrl` + `U` |
| 删除光标处到行末的<br>所有字符 |  `Ctrl` + `K` |
| 删除一个词 | `Ctrl` + `W` 或者 `Alt` + `D` |
| 上一条命令 | `Ctrl` + `P` 或者 ⬆ |
| 下一条命令 | `Ctrl` + `N` 或者 ⬇ |
| 打开编辑器编辑当前<br>指令 | `Ctrl` + `X`, `E` |

`Ctrl` + `X`,`E` 打开的编辑器是通过环境变量 `$EDITOR` 指定的。

这里有一张非常棒的图可作总结：

![Navigating the Command Line](img/2020-11-11-23-27-58.png)
