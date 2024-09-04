import { Link } from 'react-router-dom';

function Nav() {

    return (
        <div className='nav'>
            <Link to='/'>
                <div>Home</div>

            </Link>
            <Link to='/educational/:id'>
                <div>Educational  Resources</div>
            </Link>
            <Link to="/mentor">
                <div>Mentorship</div>
                </Link>
            <Link to='/donation'>
            <div>Donation</div>
            </Link>
        </div>
    )
}

export default Nav

