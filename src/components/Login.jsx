import axios from "axios"
import { useState } from "react"
import { API_URL } from "../constants"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async e => {
        e.preventDefault()

        const user = {
            username: username,
            password: password
        }

        const {data} = await                                                                            
        axios.post(API_URL+"api/token/",
            user ,{headers: 
                    {'Content-Type': 'application/json'}},
                {withCredentials: true})
        
        localStorage.clear()
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)

        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`
        window.location.href = '/'
    }
    return (
        <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <fieldset>
              <label>Username</label>
              <input className="form-control mt-1" 
                placeholder="Enter Username" 
                name='username'  
                type='text' value={username}
                required 
                onChange={e => setUsername(e.target.value)}/>
            </fieldset>
            <fieldset>
              <label>Password</label>
              <input name='password' 
                type="password"     
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
            </fieldset>
            <fieldset>
              <button type="submit" 
                 className="btn btn-primary">Envoyer</button>
            </fieldset>
          </div>
       </form>
     </div>
    )
}
export default Login