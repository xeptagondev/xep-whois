import {ProxyType, WhoIsOptions, batchWhois, whois, LoggerInterface} from './whois';

describe('whois test by domain name', () => {
    test('whois (host defined)', async () => {
        const domain = 'google.tv'
        const options: WhoIsOptions = {
            server: "whois.nic.tv",
            serverPort: 43
        }

        const res = await whois(domain, true, options);
        expect(res._raw).toContain('Domain Name: google.tv')
    });

    test('whois (parse data defined)', async () => {
        const domain = 'google.tv';
        const options: WhoIsOptions = {
            parseData: {
                'Domain Name': '',
                'Registrar': ''
            }
        }

        const res = await whois(domain, true, options);

        expect(res._raw).toContain('Domain Name: google.tv')
    });

    test('whois (proxy data provided - No auth)', async () => {
        const domain = 'google.tv';
        const options: WhoIsOptions = {
            proxy: {
                ip: '127.0.0.1',
                port: 4145,
                type: ProxyType.SOCKS5
            }
        }
        const logger: LoggerInterface  = {
            info : jest.fn(),
            debug : jest.fn(),
            error : jest.fn(),
        }

        const res = await whois(domain, true, options, logger);

        expect(logger.info).toBeCalledWith(new Error('connect ECONNREFUSED 127.0.0.1:4145'));
    });

    test('whois (proxy data provided - With auth)', async () => {
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
        const logger: LoggerInterface  = {
            info : jest.fn(),
            debug : jest.fn(),
            error : jest.fn(),
        }

        const res = await whois(domain, true, options, logger);

        expect(logger.info).toBeCalledWith(new Error('connect ECONNREFUSED 127.0.0.1:6397'));
    });

    test('batch whois (parse data defined)', async () => {
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
            expect(Object.values(res[i].parsedData).length).toEqual(3);
            expect(res[i].parsedData['Domain Name']).not.toBe('');
        }
    });
});

describe('whois test by IP', () => {
    test('is fetching by IP working', async () => {
        const domain = '1.1.1.1'

        const res = await whois(domain, true);

        expect(res._raw.length>400).toBe(true);
    });

    test('is fetching by IP working (with specified logger)', async () => {
        const domain = '1.1.1.1'

        const logger: LoggerInterface  = {
            info : jest.fn(),
            debug : jest.fn(),
            error : jest.fn(),
        }

        const res = await whois(domain, true, null, logger);

        expect(logger.debug).toBeCalledTimes(2);
        expect(res._raw.length>400).toBe(true);
    });
});