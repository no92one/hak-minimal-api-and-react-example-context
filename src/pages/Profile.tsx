import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppProvider";

Profile.route = {
  path: '/profile',
  menuLabel: 'Profile',
  index: -1
};

export default function Profile() {
    let navigate = useNavigate();
    const { user, setUser } = useAppContext() 

    console.log("Profile - user - ", user)

    async function logout() {
        const response = await fetch(`/api/login`, {
        method: "delete",
        credentials: 'include'})

        if(response.ok){
            setUser({})
            navigate("/login")
        }
    }

    return !user.email ? <h1>Du måste logga in!</h1> : <>
    <h1>Profil sida</h1>
    <h2>{user.firstName}</h2>
    <button onClick={logout}>Logout</button>
    </>
}