
const initState = {
    token: localStorage.getItem('access_token') || null,
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    loggedUser: localStorage.getItem('loggedUser') || null,
}
const rootReducer = (state = initState, action) => {
    if(action.type === 'SET_TOKEN') {

        localStorage.setItem('access_token', action.token);
        localStorage.setItem('isLoggedIn', true);
        return  {
            ...state,
            token: action.token,
            isLoggedIn: true
        }
    }
    else if(action.type === 'SET_USER') {

        localStorage.setItem('access_token', action.user);
        return  {
            ...state,
            user: action.user,
        }
    }
    else if(action.type === 'DESTROY_TOKEN') {

        localStorage.removeItem('access_token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedUser');

        return  {
            ...state,
            token: null,
            isLoggedIn: false,
            loggedUser: null
        }
    }
    else if(action.type === 'DELETE_POST') {
        let newPosts = state.posts.filter(post => post.id !== action.id);

        return {
            ...state,
            posts: newPosts
        }
    }    

    return state;
}

export default rootReducer