const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Foo';
        const text = 'Bar';
        const result = generateMessage(from, text);
        expect(result).toInclude({ from, text });
        expect(result.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Foo';
        const cord = 1;
        const url = 'https://www.google.com.ar/maps?q=1,1';
        const result = generateLocationMessage(from, cord, cord);
        expect(result).toInclude({ from, url });
        expect(result.createdAt).toBeA('number');
    });
});
