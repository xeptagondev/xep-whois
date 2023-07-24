import { ProxyType, WhoIsOptions, whois } from '../src/whois';

async function hostDefinedWhoIs(): Promise<boolean> {
    const domain = 'google.tv'
    const options: WhoIsOptions = {
        server: "whois.nic.tv"   
    }

    const res = await whois(domain, true, options);

    console.log(res);

    return true;
}

async function defineDataToParse(): Promise<boolean> {
    const domain = 'google.tv';
    const options: WhoIsOptions = {
        parseData: {
            'Domain Status': [],
            'Registrar': ''
        }       
    } 

    const res = await whois(domain, true, options);

    console.log(res);

    return true;
}

async function defineProxy(): Promise<boolean> {
    const domain = 'google.tv';
    const options: WhoIsOptions = {
        proxy: {
            ip: '144.217.197.151',
            port: 39399,
            type: ProxyType.SOCKS5
        }   
    } 

    const res = await whois(domain, true, options);

    console.log(res);

    return true;
}

async function defineProxyWithAuth(): Promise<boolean> {
    const domain = 'google.tv';
    const options: WhoIsOptions = {
        proxy: {
            ip: '127.0.0.1',
            port: 6397,
            username: 'username',
            password: 'password',
            type: ProxyType.SOCKS5
        } 
    } 

    const res = await whois(domain, true, options);

    console.log(res.parsedData);

    return true;
}

hostDefinedWhoIs();