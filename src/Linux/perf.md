# Use perf to profile

## Installation

`perf` is available in the `linux-tools` package.

To enable `perf` to profile user-space applications, you need to install the `linux-tools-generic` package.

To enable `perf` to profile kernel-space applications, you need to install the `linux-tools-`uname -r` package.

```bash
sudo apt install linux-tools-common linux-tools-generic linux-tools-`uname -r
```

```bash
 sudo sysctl kernel.perf_event_paranoid=-1
 sudo sysctl kernel.kptr_restrict=0
 sudo mount -o remount,mode=755 /sys/kernel/tracing/
```

## Usage

```bash
perf record -- <command>
```
