# Xeptagon WHOIS
Xep-whois is a highly customizable WHOIS library which collects and parses given WHOIS queries from text-based WHOIS servers. [whois-servers.json]() contains the WHOIS servers for the specific TLDs (Top Level Domains) which is used to collect data from for the submitted domains. In scenarios where [whois-servers.json]() does not contain the WHOIS server for the TLD, then the [IANA WHOIS server]() is used to query the TLD and get the WHOIS server for the submitted domain.

Xep-whois then creates a TCP connection to the WHOIS-SERVER:PORT (default port 43) and sends the WHOIS query for the submitted domain and collects the response. The connection can also be established through a provided proxy server (Socks4 or Socks5) as well (with or without authentication), where the proxy IP will be used to collect the WHOIS data for the domain.

The user can decide which data they want to extract from the WHOIS response of the domain by submitting a key-value paired Object alongside other options. As for an example, if the WHOIS response conatins the following fields which the user needs to extract from the response;

      | Field           | Has multiple entries  |
      | --------------- | --------------------- |
      | Domain Name     | No                    |
      | Domain Status   | Yes                   |
      | Registrar       | No                    |

The user can define a object consisting of the above mentioned keys and their initial values as following, which can be passed as an option to Xep-whois;

```typescript
var extractValues = {
      'Domain Name': '',
      'Domain Status': [],
      'Registrar': '',
}
```

Since 'Domain Status' is a field which can have multiple entries within the response, by providing an empty Array as its value, all the 'Domain Status' values can be extracted.

Apart from these, Xep-whois contains much more features overall, which are not limited to;

      1) Collecting raw WHOIS data from text-based WHOIS servers
      2) Hundreds of TLDs are supported (Almost all the text-based WHOIS servers are supported)
      3) Parse WHOIS response to a key-value paired Object
      4) Proxy support (Socks4 and Socks5) to collect WHOIS data
      5) Ability to define which data needs to be extracted from the response
      6) Parallelized batch processing is supported
      7) Define TLD, WHOIS server/port, character encoding to collect and format the WHOIS responses

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

The API documentation can be found here: [Xep-whois API](https://xeptagondev.github.io/xep-whois/)

# Acknowledgements

- [Node fetch](https://github.com/node-fetch/node-fetch)
- [Socks](https://github.com/JoshGlazebrook/socks/)
- [TypeDoc](https://typedoc.org/)
- [Jest](https://jestjs.io/)

# License

xep-whois is available under the [BSD (3-Clause) License](https://opensource.org/license/bsd-3-clause/)