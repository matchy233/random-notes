# i18n related settings (LANG, LANGUAGE, LC_ALL etc)

On Ubuntu, because I am using Ubuntu.

## Explanation of `LC_*` variables

- `LANG`: default locale
- `LANGUAGE`: list of languages in order of preference
- `LC_ALL`: overrides all other `LC_*` variables, for debugging

Technically the order of precedence is `LANGUAGE` > `LC_ALL` > `LC_*` > `LANG`. (According to `locale(7)`)

## Behavior on Ubuntu

This is an observation on Ubuntu 20.04, when I try to switch from Chinese (accidentally and automatically for no reason set for a newly created user) to English.

| Is it in English? | `LANG=en_US` | `LANGUAGE=en_US` | `LC_ALL=en_US` |
| --- | --- | --- | --- |
| Display language | ✅ | ✅ | ✅ |
| `vim` messages | ❌ | ✅ | ✅ |
| `apt` messages | ❌ | ✅ | ✅ |
| welcome message<sup>*</sup> | ❌ | ❌ | ✅ |
| `sudo` prompt | ❌ | ❌ | ✅ |

<sup>*</sup>: It's the content in `/var/run/motd.dynamic` that is displayed when you log in.

## Bibliography

- [Arch Wiki: Locale](https://wiki.archlinux.org/title/Locale)
