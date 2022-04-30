# Random bash tips

## `mv`

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
