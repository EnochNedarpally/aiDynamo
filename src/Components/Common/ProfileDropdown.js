import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//import images
import Person from "../../assets/images/personIcon.png";
import { createSelector } from "reselect";

const ProfileDropdown = () => {
  const selectLayoutState = (state) => state;
  const profiledropdownData = createSelector(
    selectLayoutState,
    (state) => ({
    // (state) => state.Profile,
    user : state.Login.user,
    token:state.Login.token
}));
  // Inside your component
  const token = useSelector(state => state.Login.token)
  const user = useSelector(state => state.Login.user)

  const [userName, setUserName] = useState("Admin");
  const authUserData = JSON.parse(sessionStorage.getItem("authUser"));
  
  useEffect(() => {
    // if (sessionStorage.getItem("authUser")) {
    //   setUserName(
    //     process.env.REACT_APP_DEFAULTAUTH === "fake"
    //       ? authUserData.username === undefined
    //         ? user.first_name
    //           ? user.first_name
    //           : authUserData.data.first_name
    //         : "Admin" || "Admin"
    //       : process.env.REACT_APP_DEFAULTAUTH === "firebase"
    //       ? authUserData.email && authUserData.email
    //       : "Admin"
    //   );
    // }
  }, [userName, user]);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
console.log("user",user)
  return (
    <React.Fragment>
      {/* <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user"> */}
      <Dropdown
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
        isOpen={isProfileDropdown}
      >
        {/* isOpen={isProfileDropdown} */}
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={user?.profilePic ? user?.profilePic :  Person}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              {/* <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userName}</span> */}
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {user?.name || "N/A"}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome {userName}!</h6>
          <DropdownItem className="p-0">
            <Link to="/logout" className="dropdown-item">
              <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                Logout
              </span>
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
