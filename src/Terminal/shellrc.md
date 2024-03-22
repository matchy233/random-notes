# Shell-rc

For `.bashrc`, `.zshrc`, `.profile`, or even `Microsoft.PowerShell_profile.ps1`).

## General

### Know if I'm in WSL or native Linux

Simply check the content of `/proc/version`. WSLs will contain "**Microsoft / microsoft**" somewhere in the kernel build version (which is very interesting to me lol).

On WSL (running **Ubuntu 18.04**):

```shell
$ cat /proc/version
Linux version 4.19.128-microsoft-standard (oe-user@oe-host) (gcc version 8.2.0 (GCC)) #1 SMP Tue Jun 23 12:58:10 UTC 2020
```

Also, on WSL with Kali Linux:

```shell
$ cat /proc/version
Linux version 4.4.0-22000-Microsoft (Microsoft@Microsoft.com) (gcc version 5.4.0 (GCC) ) #653-Microsoft Wed Apr 27 16:06:00 PST 2022
```

On native Linux (here **Debian 11 bullseye**)

```shell
$ cat /proc/version
Linux version 5.10.0-13-amd64 (debian-kernel@lists.debian.org) (gcc-10 (Debian 10.2.1-6) 10.2.1 20210110, GNU ld (GNU Binutils for Debian) 2.35.2) #1 SMP Debian 5.10.106-1 (2022-03-17)
```

### List files in a directory after `cd`

Unix shells:

```bash
function cd {
    builtin cd "$@"
    if [ $(ls | wc -l) -le 50 ]; then
        ls -F --color=auto
    else
        echo "There are a total of $(ls -F | wc -l) entries in $(pwd)"
    fi
}
```

PowerShell:

```powershell
Function cd_custom {
    set-location @Args
    $numObj = 0
    $regex_opts = ([System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Compiled)
    $hidden = New-Object System.Text.RegularExpressions.Regex('^\.', $regex_opts)

    get-childitem -n | foreach-object { if (!($hidden.IsMatch($_))) { $numObj++ } }
    if ( $numObj -le 30 ) {
        ls
    }
    else {
        Write-Output "There are a total of $numObj entries in $((Get-Location).path)"
    }
}

set-alias -Name cd -Value cd_custom -Option AllScope
```

## `.zshrc` specific contents

### Save history between sessions

Add those lines to `~/.zshrc`:

```bash
export HISTFILE=~/.zsh_history # follow the convention of bash
export HISTSIZE=10000
export SAVEHIST=10000
setopt appendhistory
```

Also see [this discussion](https://github.com/microsoft/WSL/issues/2066#issuecomment-299569323)
in WSL gh issues, histories might not be saved if the session is not closed
*gracefully*.

General tip is: always use `exit` or `Ctrl+D`.

### `Home` and `End` wrongly captured by `zsh`

<https://stackoverflow.com/questions/8638012/fix-key-settings-home-end-insert-delete-in-zshrc-when-running-zsh-in-terminat>

> Run `cat` then press keys to see the codes your shortcut send and...

Add the key bindings to `~/.zshrc` using `bindkey`. For example:

```bash
bindkey  "^[[1~"  beginning-of-line
```

## `PowerShell` specific contents

### bash-like `ls`

See [my gist](https://gist.github.com/matchy233/0c8baaad8af9aa12838ded428d6f8e31).
