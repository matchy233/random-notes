# GPG

List keys

```bash
$ gpg --list-secret-keys --key-id-format LONG
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
