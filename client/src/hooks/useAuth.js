import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isManager = false;
    let status = "Customer";
    let userID = '';

    if (token) {
        const decoded = jwtDecode(token);
        const { username, roles, _id } = decoded.UserInfo;
        isManager = roles.includes('Manager');
        if (isManager) status = "Manager";

        userID = _id?.$oid || _id;

        return { username, roles, status, isManager, userID };
    }

    return { username: '', roles: [], isManager, status, userID };
};

export default useAuth
