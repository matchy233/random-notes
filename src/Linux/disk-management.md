# Disk Management

## Normal Disk Management

List the disk currently have in hand.

```bash
$ lsblk -o NAME,SIZE,FSTYPE,TYPE,MOUNTPOINT
NAME         SIZE FSTYPE            TYPE  MOUNTPOINT
sda          256G                   disk
sdb          256G                   disk /
```

Format new disks.

```bash
$ mkfs -t ext4 /dev/sba
$ mkfs.ext4
```

## RAID Operations

The best option to make a software RAID array is `mdadm`. You can get it from `apt` or other package manager.

```bash
$ sudo apt install mdadm
```

### Normal operations

Check RAID configuration

```bash
$ sudo mdadm --detail --scan
```

Check RAID operation progress / whether there is already a RAID array available

```bash
$ cat /proc/mdstat
Personalities : [linear] [multipath] [raid0] [raid1] [raid6] [raid5] [raid4] [raid10]
md0 : active raid5 nvme5n1[0] nvme7n1[2] nvme6n1[1] nvme8n1[4] nvme9n1[5]
      60011155456 blocks super 1.2 level 5, 512k chunk, algorithm 2 [5/5] [UUUUU]
      bitmap: 0/112 pages [0KB], 65536KB chunk

unused devices: <none>
```

### Create and resize a RAID array

**Create** a RAID5 disk array called `/dev/md0` with `/dev/sda` `/dev/sdb` and `/dev/sdc` (might take quite some time)

Note that actually a RAID5 disk array can only be named in the form of `/dev/md[0-9]+`

```bash
$ sudo mdadm --create --verbose /dev/md0 \
  --level=5 --raid-devices=3 /dev/sda /dev/sdb /dev/sdc
```

**Grow** a RAID5 disk array `/dev/md0` with 1 new disk called `/dev/sdd` (might take quite some time)

```bash
$ sudo mdadm --add /dev/md0 /dev/sdd
$ mdadm --grow --raid-devices=5 /dev/md0
```
