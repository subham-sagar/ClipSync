import React, { useRef } from "react";
import Button from "../Components/Button/Button";
import { InputForm } from "../Components/CreateContentModal/CreateContentModal";
import { BACKEND_URL } from "../BACKEND_URL";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Auth(props) {
  return (
    <div>
      {props.signin && <SignIn />}
      {props.signup && <SignUp />}
    </div>
  );
}

function SignUp() {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  async function signUp() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, {
        username,
        password,
      });
      console.log(response);
      alert("signUp successful! Please sign in.");
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center p-6">
      <div className="border p-10 border-slate-400 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <InputForm placeholder="Username" reference={usernameRef} />
        <InputForm placeholder="Password" reference={passwordRef} />

        <div className="flex justify-end w-full mt-4">
          <Button size="md" variant="primary" text="SignUp" onClick={signUp} />
        </div>

        <div className="pt-4 m-2 text-sm">
          <p>
            Already an user?{" "}
            <Link className="pl-2.5 text-purple-500 font-semibold" to="/signin">
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function SignIn() {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

async function signIn() {
  const username = usernameRef.current?.value;
  const password = passwordRef.current?.value;

  try {
    const response = await axios.post(`${BACKEND_URL}/user/signin`, {
      username,
      password,
    });

    const AccessToken = response.data.data.accessToken;
    const userId = response.data.data.user._id;

    // save token + userId
    localStorage.setItem("accessToken", AccessToken);
    localStorage.setItem("userId", userId);

    navigate("/dashboard");
  } catch (error) {
    console.log(error);
  }
}


  return (
    <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center p-6">
      <div className="border p-10 border-slate-400 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        <InputForm placeholder="Username" reference={usernameRef} />
        <InputForm placeholder="Password" reference={passwordRef} />

        <div className="flex justify-end w-full mt-4">
          <Button size="md" variant="primary" text="SignIn" onClick={signIn} />
        </div>

        <div className="pt-4 m-2 text-sm">
          <p>
            Don't have an account?{" "}
            <Link className="pl-2.5 text-purple-500 font-semibold" to="/signup">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

Auth.defaultProps = {
  signup: false,
  signin: false,
};

export default Auth;
