const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Foo',
                room: 'Node',
            },
            {
                id: '2',
                name: 'Bar',
                room: 'React',
            },
            {
                id: '3',
                name: 'Baz',
                room: 'Node',
            },
        ];
    });

    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'Foo',
            room: 'Bar',
        };
        users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('Should remove a user', () => {
        users.removeUser('3');
        expect(users.users.length).toEqual(2);
    });

    it('Should not remove a user', () => {
        users.removeUser('123');
        expect(users.users.length).toEqual(3);
    });

    it('Should find user', () => {
        const result = users.getUser('1');
        expect(result.id).toEqual('1');
    });

    it('Should not find user', () => {
        const result = users.getUser('123');
        expect(result).toNotExist();
    });

    it('should return names for room Node', () => {
        const usersList = users.getUserList('Node');
        expect(usersList).toEqual(['Foo', 'Baz']);
    });

    it('should return names for room React', () => {
        const usersList = users.getUserList('React');
        expect(usersList).toEqual(['Bar']);
    });
});
