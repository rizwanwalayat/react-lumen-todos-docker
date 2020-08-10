export const setToken = (token) => {
    return {
        type: 'SET_TOKEN',
        token
    }
}
export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user
    }
}

export const destroyToken = () => {
    return {
        type: 'DESTROY_TOKEN',
    }
}

export const deletePost = (id) => {
    return {
        type: 'DELETE_POST',
        id
    }
}
