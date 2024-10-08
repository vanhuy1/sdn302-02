import { Outlet } from 'react-router-dom'
import Header from './landing-page/header'
import Footer from './landing-page/footer'

const DashLayout = () => {
    return (
        <>
            <Header />
            <div className="dash-container">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
export default DashLayout