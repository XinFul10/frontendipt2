import { Link } from "react-router-dom";

export default function Login() {
    
    const onSubmit = (ev) => {
        ev.preventDefault()
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login to your Library Account</h1>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button className="btn btn-block">Sign in</button>
                    <p className="message">
                        You don't have an account? <Link to="/signup"> Create Account</Link>
                        </p>
                </form>
            </div>  
        </div>
    )
}