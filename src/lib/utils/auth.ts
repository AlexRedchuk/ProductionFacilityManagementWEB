import facilityManagement from "../../APIs/facilityManagement"


export const logIn = async (bearer: string | null) => {
    if(bearer) {
        
        facilityManagement.defaults.headers.common['Authorization'] = `Bearer ${bearer}`;
        const roles = await facilityManagement.get('/api/RoleAuth');
        const user = {
            token: bearer,
            role: roles.data[0]
        }
        localStorage.setItem("user", JSON.stringify(user));
    }
}

export const addBearer = () => {
    const userInfo = localStorage.getItem("user");
    if(typeof userInfo === "string") {
        facilityManagement.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(userInfo).token}`;
    }
}

export const logOut = () => {
    localStorage.removeItem("user");
    delete facilityManagement.defaults.headers.common['Authorization'];
}

export const isAuth = () => {
    return !!localStorage.getItem("user")
}

export const getRole = () => {
  const userInfo = localStorage.getItem("user");
  return typeof userInfo === "string" ? JSON.parse(userInfo).role : null;
}   