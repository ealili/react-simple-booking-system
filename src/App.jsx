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

            <br/>
            <div>
                <h3>Github</h3>
                <div className={'github-links-container'}>
                    <div>Frontend: <a href="https://github.com/ealili/react-simple-booking-system"
                           target={'_blank'}>https://github.com/ealili/react-simple-booking-system</a>
                    </div>
                    <div>Backend: <a href="https://github.com/ealili/dotnet-simple-booking-system"
                           target={'_blank'}>https://github.com/ealili/dotnet-simple-booking-system</a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
