# Random bash tips

## `mv`/`cp` with wildcard (blob)

The following command will not work

```bash
mv "${dir}/*.txt" "${dir}/another_place"
```

`*` will not be expanded inside quotation marks. To make it work, `*` should be
put outside the quote.

```bash
mv "${dir}/"*".txt" "${dir}/another_place"
```

> Should have more explanation on wildcards and globs

## custom `cd`

```bash
function cd {
    builtin cd "$@"
    if [[ $(ls | wc -l ) -le 50 ]]; then
        ls -F --color=auto
    else
        echo "There are a total of $(ls -F | wc -l) entries in $(pwd)"
    fi
}
```
