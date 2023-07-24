# Xep-Whois
xep-whois is a highly customizable whois library which collects/parses given whois queries from text-based whois servers. Supports almost all the text-based WHOIS servers for any TLD

# Installation

## Global

> $ npm install -g xep-whois

## Local

> $ npm install xep-whois

# Examples

## Basic usage

```typescript
import { whois } from 'xep-whois';

var domain = 'google.com';
var res = await whois(domain);

console.log(res);
```

## Define WhoIs server and parse data

```typescript
import { whois, WhoIsOptions } from 'xep-whois';

var domain = 'google.com';
var host = 'whois.verisign-grs.com';
var hostPort = 43;

var options: WhoIsOptions = {
      server: host,
      serverPort: hostPort     
};

var res = await whois(domain, true, options);

console.log(res.parsedData);
```

## Define which data to be parsed

```typescript
import { whois, WhoIsOptions } from 'xep-whois';

var domain = 'google.com';

// Parse 'Domain Name' (string), 'Registrar' (string) and 'Domain Status' (Array - if multiple status fields are present) fields from the WhoIs response
var options: WhoIsOptions = {
      parseData: {
            'Domain Name': '',
            'Registrar': '',
            'Domain Status': []
      }      
};

var res = await whois(domain, true, options);

console.log(res.parsedData);
```

## Collect WhoIs data through a proxy (SOCKS4 or SOCKS5)

```typescript
import { whois, WhoIsOptions } from 'xep-whois';

var domain = 'google.com';
var proxyIp = 'your.proxy.ip';
var proxyPort = 67401;

var options: WhoIsOptions = {
      proxy: {
            ip: proxyIp,
            port: proxyPort,
            type: ProxyType.SOCKS5
      }   
};

var res = await whois(domain, true, options);

console.log(res.parsedData);
```

## Collect WhoIs data through a proxy (With authentication)

```typescript
import { whois, WhoIsOptions } from 'xep-whois';

var domain = 'google.com';
var proxyIp = 'your.proxy.ip';
var proxyPort = 67401;
var proxyUsername = 'username';
var proxyPassword = 'password';

var options: WhoIsOptions = {
      proxy: {
            ip: proxyIp,
            port: proxyPort,
            username: proxyUsername,
            password: proxyPassword,
            type: ProxyType.SOCKS5
      }   
};

var res = await whois(domain, true, options);

console.log(res.parsedData);
```

## Collect WhoIs data for multiple domains (parallelly with options)
```typescript
import { batchWhois, WhoIsOptions } from 'xep-whois';

var domains = ['google.com', 'abc.com', 'example.com'];
var isParallel = true;
var threads = 3;

// Parse 'Domain Name' (string), 'Registrar' (string) and 'Domain Status' (Array - if multiple status fields are present) fields from the WhoIs response
var options: WhoIsOptions = {
      parseData: {
            'Domain Name': '',
            'Registrar': '',
            'Domain Status': []
      }      
};

var res = await batchWhois(domains, isParallel, threads, true, options);

for (let i = 0; i < res.length; i++) {
      console.log(res[i].parsedData);
}
```

## Collect WhoIs data for multiple domains through a proxy (parallelly with options)
```typescript
import { batchWhois, WhoIsOptions } from 'xep-whois';

var domains = ['google.com', 'abc.com', 'example.com'];
var isParallel = true;
var threads = 3;
var proxyIp = 'your.proxy.ip';
var proxyPort = 67401;
var proxyUsername = 'username';
var proxyPassword = 'password';

// Parse 'Domain Name' (string), 'Registrar' (string) and 'Domain Status' (Array - if multiple status fields are present) fields from the WhoIs response
var options: WhoIsOptions = {
      parseData: {
            'Domain Name': '',
            'Registrar': '',
            'Domain Status': []
      },
      proxy: {
            ip: proxyIp,
            port: proxyPort,
            username: proxyUsername,
            password: proxyPassword,
            type: ProxyType.SOCKS5
      }      
};

var res = await batchWhois(domains, isParallel, threads, true, options);

for (let i = 0; i < res.length; i++) {
      console.log(res[i].parsedData);
}
```

# Documentation

The API documentation can be found here: [xep-whois API](https://xeptagondev.github.io/xep-whois/)

# License

xep-whois is available under the [MIT License](https://opensource.org/license/mit/)