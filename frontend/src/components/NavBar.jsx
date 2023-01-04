import { motion } from "framer-motion";
import React from "react";
import { app } from "../firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { TiShoppingCart } from "react-icons/ti";
import Avatar from "../images/ava2.png";

import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

// import Logo from "https://res.cloudinary.com/cheloytec/image/upload/v1669305398/online-shop/MyLogo.png";

const NavBar = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const login = async () => {
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(firebaseAuth, provider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
  };
  return (
    <div className="fixed z-50 w-screen p-6 px-16 bg-gradient-to-r from-purple-50 to-blue-50 text-center text-gray-900">
      {/* //Tablet */}
      <div className="hidden md:flex w-full h-full justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/cheloytec/image/upload/v1669305398/online-shop/MyLogo.png"
            alt="LOGO"
            className="w-10 object-cover"
          />
          <p className="text-headingColor text-2xl font-bold">CheloyTec</p>
        </Link>
        <div className="flex gap-6 cursor-pointer">
          <ul className="flex gap-10 p-6">
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer capitalize">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer capitalize">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer capitalize">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer capitalize">
              Contacts
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer capitalize">
              Service
            </li>
          </ul>
          <div className="relative flex justify-center items-center">
            <TiShoppingCart className="text-textColor text-2xl" />
            <div className="absolute top-2 -right-2 flex w-5 h-5 rounded-full bg-red-600 justify-center items-center ">
              <p className="text-sm text-white">2</p>
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-5 min-w-[40px] h-5 min-h-[40px] drop-shadow-2xl rounded-full bg-slate-300"
              alt="AvatarImg"
              onClick={login}
            />
          </div>
        </div>
      </div>

      <div className="flex md:hidden w-full h-full"></div>
    </div>
  );
};

export default NavBar;
