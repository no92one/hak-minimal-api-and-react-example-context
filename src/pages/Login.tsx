import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppProvider";

Login.route = {
  path: '/login',
  menuLabel: 'Login',
  index: -1
};

export default function Login() {
    let navigate = useNavigate();
    const { setUser } = useAppContext()

    async function tryLogin(formData){
        const email = formData.get("email");
        const password = formData.get("password");

        const response = await fetch(`/api/login`, {
            method: "post",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const result = await response.json()

        if(response.ok){
            setUser(result)
            navigate("/profile")
        }

        console.log("Login result - ", result)
    }


    return <>
        <h1>Login</h1>
        <form action={tryLogin}>
            <label>Email: 
                <input type="text" name="email" required />
            </label>
            <label>Password:
                <input type="password" name="password" required/>
            </label>
            <button type="submit">Login</button>
        </form>
    </>
}