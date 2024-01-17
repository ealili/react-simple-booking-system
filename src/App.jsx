import './index.css';
import {Link, Outlet} from "react-router-dom";


function App() {
    return (
        <div className="container">
            <h2>Simple Booking System</h2>
            <div className={'links-container'}>
                <Link to={'resources'}>Book Resources</Link>
                <span className="links-separator">|</span>
                <Link to={'bookings'}>Bookings</Link>
            </div>
            <br/>
            <Outlet/>
        </div>
    );
}

export default App;
