import { useAuth } from "../../../auth/hook/useAuth";
import { useContext } from "react";
import { AuthContext } from "../../../../store/AuthContext";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const { handleLogout } = useAuth();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <header className="w-full bg-black border-b border-blue-900/50 lg:px-8 py-4 px-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Task<span className="text-blue-600">Flow</span>
          </h1>
        </div>

        <div className="flex items-center gap-5">

         <div onClick={() => navigate('/create-task')} 
         className="px-4 py-1 text-sm rounded-sm bg-gray-700 text-white font-semibold cursor-pointer">
             Add task
         </div>

            <div className="w-8 h-8 rounded-full border-[2px] border-gray-700 flex items-center justify-center text-white font-semibold">
              {user?.username.charAt(0).toUpperCase()}
            </div>


          <button
            onClick={handleLogout}
            className="px-4 py-1 text-sm cursor-pointer
                                   rounded-sm  bg-blue-600 text-white font-semibold
                                   hover:bg-blue-500 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
