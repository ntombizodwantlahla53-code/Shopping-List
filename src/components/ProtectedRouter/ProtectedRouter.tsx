import {Navigate,Outlet} from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";

export const ProtectedRoute = () => {
  const {user,authChecked,} = useSelector((state: RootState) =>state.login);

  if (!authChecked) {
    return (<p>Loading...</p>);
  }
  if (!user) {return (
  <Navigate to="/login" replace/>);
  }
  return <Outlet />;
};