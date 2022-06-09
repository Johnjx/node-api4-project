let num = 0;
const getId = () => {
    num ++;
    return num; 
}

const initializeUsers = () => ([
    { id: getId(), name: 'Jon Snow', sigil: 'wolf' },
    { id: getId(), name: 'Tyrion Lannister', sigil: 'lion' }
])

let users = initializeUsers()

const findAll = () => {
    return Promise.resolve(users)
}

const findByInfo = ({ name, sigil }) => {
    const user = users.find(user => user.name === name && user.sigil === sigil)
    if (!user) return Promise.resolve(null)
    return Promise.resolve(user)
}

const insert = ({ name, sigil}) => {
    const newUser = { id: getId(), name, sigil };
    users.push(newUser)
    return Promise.resolve(newUser)
}

module.exports = {
    findAll,
    findByInfo,
    insert
}