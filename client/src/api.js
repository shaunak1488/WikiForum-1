function getUsers() {
    return fetch('/api/users').then(res => res.json());
}

function getUserByUsername(username) {
    return fetch(`/api/users/${username}`).then(res => res.json());
}

function createUser(user) {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

function showMsg(){
    return fetch('/api/msg').then(res => res.json());
}

export default {
    // getUsers,
    // getUserByUsername,
    // createUser
    showMsg
};