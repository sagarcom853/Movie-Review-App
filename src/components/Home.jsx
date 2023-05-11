import React from "react";
import { useAuth, useNotification } from "../Hooks/index";
import { useNavigate } from "react-router-dom";
import { resendEmailVerificationToken } from "../API/Auth";

const Home = () => {
  const { authInfo } = useAuth();
  const isVerified = authInfo.profile?.isVerified;
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  const Navigated = async (e) => {
    e.preventDefault();
    console.log(authInfo.profile);
    const { error, message } = await resendEmailVerificationToken(
      authInfo.profile.id
    );
    if (error) {
      return updateNotification("error", error);
    }
    updateNotification("success", message);
    navigate("/auth/verification", { state: { user: authInfo.profile } });
  };
  return (
    <div>
      <div>
        {isLoggedIn && !isVerified ? (
          <div className='text-sm text-center text-primary bg-cyan-100'>
            It seems you have not verified your profile &nbsp;
            <button to='/auth/verification' onClick={Navigated}>
              <span className='underline hover:text-blue-900'>
                {" "}
                Click here to verify
              </span>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>Home</div>
    </div>
  );
};

export default Home;
