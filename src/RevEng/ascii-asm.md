# Alphanumeric shellcode

Alphanumeric shellcode 限定所使用的汇编 opcode 只能在 `0x20` ~ `0x7f` 范围内——这正是“人类可读”的 ascii 字符的范围。所以如果你用如下代码编译出一份字节文件，你将得到一份看起来像乱码文本，但实际上又可执行的怪东西！

```bash
gcc -m64 -c -o shellcode.o shellcode.S
objcopy -S -O binary -j .text shellcode.o shellcode.ascii
```

下面我们研究一下，如何书写一份 `x86-64` 风格的 alphanumeric shellcode。

## 限制与问题

WIP

## 演示 shellcode 执行

直接把传入的 shellcode 读到 `buf` 中并且将 `buf` 解释为函数指针执行 `buf`。

```c
{{#include code/target.c}}
``
## Reference

1. [NetSec: Alphanumeric Shellcode](https://nets.ec/Alphanumeric_shellcode)
