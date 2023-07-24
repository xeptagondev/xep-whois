# Xeptagon WHOIS Library
Xep-whois is a highly customizable WHOIS library which collects and parses given WHOIS queries from text-based WHOIS servers. [whois-servers.json](https://github.com/xeptagondev/xep-whois/blob/main/whois-servers.json) contains the WHOIS servers for the specific TLDs (Top Level Domains) which is used to collect data from for the submitted domains. In scenarios where [whois-servers.json](https://github.com/xeptagondev/xep-whois/blob/main/whois-servers.json) does not contain the WHOIS server for the TLD, then the [IANA WHOIS server](https://www.iana.org/whois) is used to query the TLD and get the WHOIS server for the submitted domain.

Xep-whois then creates a TCP connection to the WHOIS-SERVER:PORT (default port 43) and sends the WHOIS query for the submitted domain and collects the response. The connection can also be established through a provided proxy server (Socks4 or Socks5) as well (with or without authentication), where the proxy IP will be used to collect the WHOIS data for the domain.

The user can decide which data they want to extract from the WHOIS response of the domain by submitting a key-value paired Object alongside other options. As for an example the following is a WHOIS response for [xeptagon.com](https://www.xeptagon.com)

```text
Domain Name: XEPTAGON.COM
Registry Domain ID: 2426915952_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.godaddy.com
Registrar URL: http://www.godaddy.com
Updated Date: 2023-07-17T11:11:45Z
Creation Date: 2019-08-26T05:45:43Z
Registry Expiry Date: 2025-08-26T05:45:43Z
Registrar: GoDaddy.com, LLC
Registrar IANA ID: 146
Registrar Abuse Contact Email: abuse@godaddy.com
Registrar Abuse Contact Phone: 480-624-2505
Domain Status: clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited 
Domain Status: clientRenewProhibited https://icann.org/epp#clientRenewProhibited 
Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited 
Domain Status: clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited 
Name Server: NS25.DOMAINCONTROL.COM
Name Server: NS26.DOMAINCONTROL.COM
DNSSEC: unsigned
URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/

>>> Last update of whois database: 2023-07-24T06:08:42Z <<<
```

And the following data needs to be extracted from the above response;

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

The parsed data of the response will be the following;

```json
{
      'Domain Name': 'XEPTAGON.COM',
      'Domain Status': [
            'clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited',
            'clientRenewProhibited https://icann.org/epp#clientRenewProhibited',
            'clientTransferProhibited https://icann.org/epp#clientTransferProhibited',
            'clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited'
      ],
      'Registrar': 'GoDaddy.com, LLC'
}
```

Apart from these, Xep-whois contains much more features overall, which are not limited to;

      1) Collecting raw WHOIS data from text-based WHOIS servers
      2) Hundreds of TLDs are supported (Almost all the text-based WHOIS servers are supported)
      3) Parse WHOIS response to a key-value paired Object
      4) Proxy support (Socks4 and Socks5) to collect WHOIS data
      5) Ability to define which data needs to be extracted from the response
      6) Parallelized batch processing is supported
      7) Define TLD, WHOIS server/port, character encoding to collect and format the WHOIS responses

## Supported TLDs

Xep-whois supports the following TLDs (known) which are mentioned in [whois-servers.json](https://github.com/xeptagondev/xep-whois/blob/main/whois-servers.json). For the TLDs which are not included here, as mentioned above, the [IANA WHOIS server](https://www.iana.org/whois) will be used as the source to determine the WHOIS server.

### TLD List:
```text
br.com,cn.com,de.com,eu.com,gb.com,gb.net,gr.com,hu.com,in.net,no.com,qc.com,ru.com,sa.com,se.com,se.net,uk.com,uk.net,us.com,uy.com,za.com,jpn.com,web.com,com,za.net,net,eu.org,za.org,org,llyw.cymru,gov.scot,gov.wales,edu,gov,int,e164.arpa,arpa,aero,asia,biz,cat,coop,info,jobs,mobi,museum,name,post,pro,tel,travel,xxx,ac,ae,af,ag,ai,am,ar,as,priv.at,at,au,aw,ax,be,bf,bg,bh,bi,bj,bm,bn,bo,br,by,bw,bz,co.ca,ca,cc,cd,ch,ci,cl,cm,edu.cn,cn,uk.co,co,cr,cx,cz,de,dk,dm,do,dz,ec,ee,eu,fi,fj,fm,fo,fr,gd,ge,gf,gg,gh,gi,gl,gp,gq,gs,gy,hk,hm,hn,hr,ht,hu,id,ie,il,im,in,io,iq,ir,is,it,je,jp,ke,kg,ki,kn,kr,kw,ky,kz,la,lb,lc,li,lk,ls,lt,lu,lv,ly,ma,md,me,mg,mk,ml,mm,mn,mq,mr,ms,mt,mu,mw,mx,my,mz,na,nc,nf,ng,nl,no,nu,nz,om,pe,pf,pk,co.pl,pl,pm,pr,ps,pt,pw,qa,re,ro,rs,ac.ru,edu.ru,com.ru,msk.ru,net.ru,nov.ru,org.ru,pp.ru,spb.ru,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sk,sl,sm,sn,so,ss,st,msk.su,nov.su,spb.su,su,sx,sy,tc,td,tf,tg,th,tk,tl,tm,tn,to,tr,tv,tw,tz,biz.ua,co.ua,pp.ua,ua,ug,ac.uk,gov.uk,uk,fed.us,us,uy,uz,vc,ve,vg,vu,wf,ws,yt,ac.za,co.za,gov.za,net.za,org.za,web.za,zm,xn--2scrj9c,xn--3e0b707e,xn--3hcrj9c,xn--45br5cyl,xn--45brj9c,xn--4dbrk0ce,xn--80ao21a,xn--90a3ac,xn--90ae,xn--90ais,xn--clchc0ea0b2g2a9gcd,xn--d1alf,xn--e1a4c,xn--fiqs8s,xn--fiqz9s,xn--fpcrj9c3d,xn--fzc2c9e2c,xn--gecrj9c,xn--h2breg3eve,xn--h2brj9c8c,xn--h2brj9c,xn--j1amh,xn--j6w193g,xn--kprw13d,xn--kpry57d,xn--lgbbat1ad8j,xn--mgb9awbf,xn--mgba3a4f16a,xn--mgbaam7a8h,xn--mgbah1a3hjkrd,xn--mgbbh1a71e,xn--mgbbh1a,xn--mgberp4a5d4ar,xn--mgbgu82a,xn--mgbtx2b,xn--mgbx4cd0ab,xn--node,xn--o3cw4h,xn--ogbpf8fl,xn--p1ai,xn--pgbs0dh,xn--q7ce6a,xn--qxa6a,xn--rvc1e0am3e,xn--s9brj9c,xn--wgbh1c,xn--wgbl6a,xn--xkc2al3hye2a,xn--xkc2dl3a5ee0h,xn--y9a3aq,xn--yfro4i67o,xn--ygbi2ammx
```

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

Xep-whois is available under the [BSD (3-Clause) License](https://opensource.org/license/bsd-3-clause/)