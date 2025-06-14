import "./NavBar.css"
import { Link } from "react-router-dom"

export function NavBar() {

    return (
        <>
            <div className='navigation'>
                <Link to='/'>
                    <button className='redir-button'>Home</button>
                </Link>
                
                <Link to='/About'>
                    <button className='redir-button'>About</button>
                </Link>
            </div>
        </>
    )
}