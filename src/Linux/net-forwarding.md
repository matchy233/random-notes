# Ubuntu 18.04 Internet Connection Sharing

Our school has some weird regulations that each lab can only get 1 internet LAN cable assigned. But our lab has multiple servers and all of them need internet connection. So I (as the server manager) decided to set up internet connection sharing.

## Requirements

A **gateway server** with **2** **N**etwork **I**nterface **C**ard (**NIC**)s, `eth0`), connects to the internet,  `eth1` connects and manages the internal network.

The netplan configuration looks as follows:

```yaml
eth0:
    addresses: [<some ip>/24]
    gateway4: <some gateway>
    nameservers:
        addresses: [8.8.8.8,8.8.4.4] # important!
    dhcp4: no
    dhcp6: no
eth1:
    address: [10.0.0.101/24]
    dhcp4: no
    dhcp6: no
```

`eth1` can have whatever address falls in private IP subnet.

## Gateway setup

### Enable IP forwarding

Execute the following command

```bash
sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
```

Also edit `/etc/sysctl.conf` by uncommenting this line

```text
#net.ipv4.ip_forward=1
```

### Set up NAT rules

```bash
sudo iptables -A FORWARD -o eth0 -i eth1 -s 10.0.0.0/24 -m conntrack --ctstate NEW -j ACCEPT
sudo iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
sudo iptables -t nat -F POSTROUTING
sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

The first rule allows forwarded packets (initial ones). The second rule allows forwarding of established connection packets (and those related to ones that started). The third rule does the NAT.

### Automatic setup

Save the iptables:

```bash
sudo iptables-save | sudo tee /etc/iptables.sav
```

Edit `/etc/rc.local` and add the following lines before the `exit 0` line

```bash
iptables-restore < /etc/iptables.sav
```

## Client setup

Open `/etc/netplan/whatevername.yaml` and edit it

```yaml
eth0:
    address: [10.0.0.102/24]
    gateway: 10.0.0.101 # important!
    nameservers:
        addresses: [8.8.8.8,8.8.4.4] # important!
```

It is very important that:

1. `gateway` address is the intranet IP of the gateway computer
2. `nameservers` should use the same ones as the gateway computer

Once editted, run the fllowing command

```bash
sudo netplan apply
```

And then you can check the internet connetion by `ping`ing some famous websites

```bash
$ ping www.google.com
PING www.google.com (172.217.27.68) 56(84) bytes of data.
64 bytes from nrt12s15-in-f68.1e100.net (172.217.27.68): icmp_seq=1 ttl=112 time=36.3 ms
64 bytes from nrt12s15-in-f68.1e100.net (172.217.27.68): icmp_seq=2 ttl=112 time=89.8 ms
64 bytes from nrt12s15-in-f68.1e100.net (172.217.27.68): icmp_seq=3 ttl=112 time=58.2 ms
...
```
