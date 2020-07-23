export const isLogin = () => {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
        return true
    }
    return false;
}