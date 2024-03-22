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

## Monitor everything...

`pv`: pipe viewer

### Monitor tar extraction progress

```bash
pv file.tar.gz | tar -xz
```

Example:

```shell
$ pv big-files-1.tar.gz | tar -I pigz -x -C source/fasta/metaclust_db_1
9.30GiB 0:01:43 [93.1MiB/s] [=>             ] 17% ETA 0:08:12
```

### Monitor tar compression progress

```shell
tar cf - . -P -T file_list.1 | pv -s $( du -sb <file_list.1 | awk '{print $1}') | pigz -k > big-files.tar.g
```
