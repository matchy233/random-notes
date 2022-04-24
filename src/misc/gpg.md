# GPG

## Basics

List keys

```bash
$ gpg --list-secret-keys --keyid-format LONG
path/to/gnupg/pubring.kbx
------------------------------------------------
sec   rsa4096/20732A67E8F95BD9 2020-12-02 [SC]
      4BAE029D16C806BB4FCB925F20732A67E8F95BD9
uid                 Mischa "Matchy" Volynskaya
ssb   rsa4096/DABE372E78DCA377 2020-12-02 [E]
```

Export keys

```bash
$ gpg --export-secret-keys -a --output secretkey
```

Import keys (from the secretkey generated)

```bash
gpg --import secretkey
```

## `git` gpg sign

### Basics

Config signing key

```bash
git config --global user.signingkey <key id>
```

> On (hopefully most) Linux distro the `<key id>` can be tab-completed. Unfortunately not possible for Windows PowerShell :(

### Trouble shooting

If you receive errors like `secrete key not available` or `no secret key` (one example shown below), it is possible that the `gpg` program used by your `git` is different from your system's default `gpg`. Thus, the secret key was only imported to the system `gpg`, but is still unknown to `git`'s `gpg`.

```shell
$ git commit -m "Test"
gpg: skipped "<key id>": No secret key
gpg: signing failed: No secret key
error: gpg failed to sign the data
fatal: failed to write commit object
```

To solve this issue, we need to configure `git`'s `gpg` program to that with your secret key imported.

Run `which gpg` (*nix shells) or `Get-Command gpg` (`PowerShell`) to find that path to your system default gpg program.

```bash
$ which gpg
/usr/bin/gpg2
```

```powershell
$ Get-Command gpg

CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Application     gpg.exe                                            2.3.4.6... C:\Program Files (x86)\gnupg\bin\gpg.exe
```

Configure `git` to use the output (*nix shell) or the path listed in column `Source` (`Powershell`)

```bash
git config --global gpg.program "C:\Program Files (x86)\gnupg\bin\gpg.exe"
```

Alternatively, you can run this one-liner

```bash
git config --global gpg.program "$(which gpg)"
```

```powershell
git config --global gpg.program (Get-Command gpg).Source
```
