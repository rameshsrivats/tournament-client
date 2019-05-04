import jwtDecode from 'jwt-decode'

// Decodes token and returns user
export const getUser = () => {
    const token = localStorage.getItem('tournament-fantasy-token')
    const decoded = jwtDecode(token)
    return decoded
}

// Saves token
export const setToken = (token) => {
    localStorage.setItem('tournament-fantasy-token', token)
    return true
}

// Gets token
export const getToken = () => {
    const token = localStorage.getItem('tournament-fantasy-token')
    return token
}

// Deletes token
export const deleteToken = () => {
    localStorage.removeItem('tournament-fantasy-token')
    return true
}

