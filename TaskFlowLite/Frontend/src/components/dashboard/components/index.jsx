import Header from "./header";
import { useContext } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import Loading from "../../../common/loading";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  if (!loading && !user) {
    navigate("/login");
  }



  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex-1 overflow-y-scroll hide-scrollbar ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
