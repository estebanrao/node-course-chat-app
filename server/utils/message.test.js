const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Foo';
        const text = 'Bar';
        const result = generateMessage(from, text);
        expect(result).toInclude({ from, text });
        expect(result.createdAt).toBeA('number');
    });
});
