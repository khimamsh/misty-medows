import { isEmpty } from 'lodash';
import { useRoutes } from 'react-router-dom';
import Footer from '../Components/Home/Components/Footer';
import TopBar from '../Components/Home/Components/TopBar';
import Login from '../Components/Login/Login';
import { getSessionToken } from '../utils/utils';
import { ProtectedRoutes } from './ProtectedRoutes';


const Routes=()=>{
    
const protectedRoutes=useRoutes([...ProtectedRoutes]);
    return(
        <>
        { !isEmpty(getSessionToken())?(
            <>
            <TopBar/>
            {protectedRoutes}
            <Footer/>
            </>

        ):(<Login/>)
        }</>
    );
};

export default Routes;
