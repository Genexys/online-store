import {BrowserRouter as Router} from 'react-router-dom';
import AppRouter from "./pages/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            check().then((data) => {
                user.setUser(true);
                user.setIsAuth(true);
            }).finally(() => setLoading(false));
        }, 1000)
    }, []);

    if (loading) {
        return(
            <div className="d-flex align-items-center justify-content-center w-100" style={{ height: "100vh" }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }

    return (
        <Router className="App">
            <NavBar />
            <AppRouter/>
        </Router>
    );
})

export default App;
