import { ProxyType, WhoIsOptions, batchWhois, whois } from './whois';


async function hostDefinedWhoIs(): Promise<boolean> {
    const domain = 'google.tv'
    const options: WhoIsOptions = {
        server: "whois.nic.tv",
        serverPort: 43     
    }

    const res = await whois(domain, true, options);

    console.log(res.parsedData);

    return true;
}

async function defineDataToParse(): Promise<boolean> {
    const domain = 'google.tv';
    const options: WhoIsOptions = {
        parseData: {
            'Domain Name': '',
            'Registrar': ''
        }  
    } 
    
    const res = await whois(domain, true, options);

    console.log(res.parsedData);

    return true;
}

async function defineProxy(): Promise<boolean> {
    const domain = 'google.tv';
    const options: WhoIsOptions = {
        proxy: {
            ip: '127.0.0.1',
            port: 4145,
            type: ProxyType.SOCKS5
        } 
    } 

    const res = await whois(domain, true, options);

    console.log(res.parsedData);

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

async function defineDataToParseBatch(): Promise<boolean> {
    const domains = ['google.tv', 'abc.com', 'facebook.tv'];
    const options: WhoIsOptions = {
        parseData: {
            'Domain Name': '',
            'Registrar': '',
            'Domain Status': []
        }  
    } 
    
    const res = await batchWhois(domains, true, 3, true, options);

    for (let i = 0; i < res.length; i++) {
        console.log(res[i]);
    }
    // console.log(res);
    return true;
}

async function getByIp(): Promise<boolean> {
    const domain = '1.1.1.1'

    const res = await whois(domain, true);

    return res._raw.length>400;
}



test('whois (host defined)', async () => {
    const d = await hostDefinedWhoIs();
    expect(d).toBeDefined();
});

test('whois (parse data defined)', async () => {
    const d = await defineDataToParse();
    expect(d).toBeDefined();
});

test('whois (proxy data provided - No auth)', async () => {
    const d = await defineProxy();
    expect(d).toBeDefined();
});

test('whois (proxy data provided - With auth)', async () => {
    const d = await defineProxyWithAuth();
    expect(d).toBeDefined();
});

test('batch whois (parse data defined)', async () => {
    const d = await defineDataToParseBatch();
    expect(d).toBeDefined();
});

test.only('is fetching by IP working', async () => {
    const d = await getByIp();
    expect(d).toBe(true);
});