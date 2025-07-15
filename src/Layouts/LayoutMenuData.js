import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data
    const [userType, setUserType] = useState("admin");
    const [isDashboard, setIsDashboard] = useState(false);
    const [isApps, setIsApps] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isPages, setIsPages] = useState(false);
    const [isBaseUi, setIsBaseUi] = useState(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState(false);
    const [isForms, setIsForms] = useState(false);
    const [isTables, setIsTables] = useState(false);
    const [isCharts, setIsCharts] = useState(false);
    const [isIcons, setIsIcons] = useState(false);
    const [isMaps, setIsMaps] = useState(false);
    const [isMultiLevel, setIsMultiLevel] = useState(false);

    //Calender
    const [isEmailLog, setIsEmailLog] = useState(false);

    const [isEmail, setEmail] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [isLanding, setIsLanding] = useState(false);

    const [isSubscriberList, setIsSubscriberList] = useState(false);
    const [isUnsubsciberList, setIsUnsubsciberList] = useState(false);
    const [isUserReport, setIsUserReport] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUsersMenu, setIsUsersMenu] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');
    // to show menu according to userRole
    const role = useSelector(state => state.Login.role)

    useEffect(() => {
        getFilteredMenuItems()
    }, [role])
  
  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/vendor")) {
      setUserType("vendor");
    } else if (path.startsWith("/user")) {
      setUserType("user");
    } else {
      setUserType("admin");
    }
  }, [location.pathname]);


    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Apps') {
            setIsApps(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'BaseUi') {
            setIsBaseUi(false);
        }
        if (iscurrentState !== 'AdvanceUi') {
            setIsAdvanceUi(false);
        }
        if (iscurrentState !== 'Forms') {
            setIsForms(false);
        }
        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Charts') {
            setIsCharts(false);
        }
        if (iscurrentState !== 'Icons') {
            setIsIcons(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }
        if (iscurrentState !== 'MuliLevel') {
            setIsMultiLevel(false);
        }
        if (iscurrentState === 'Widgets') {
            history("/widgets");
            document.body.classList.add('twocolumn-panel');
        }
        if (iscurrentState !== 'Landing') {
            setIsLanding(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isApps,
        isAuth,
        isPages,
        isBaseUi,
        isAdvanceUi,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isMaps,
        isMultiLevel
    ]);

    const menuItems = [
      
        {
            label: "Admin",
        
            isHeader: true,
        },
      
        {
            id: "dashboard",
            label: "Dashboards",
            icon: "ri-dashboard-2-line",
            role:"user",
            link: "/admin/dashboard",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
        },
        {
            id: "accounts",
            label: "Accounts",
            icon: "ri-account-circle-line",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsAuth(!isAuth);
                setIscurrentState('Auth');
                updateIconSidebar(e);
            },
            stateVariables: isAuth,
            subItems: [
                { id: 2, label: "All Account", link: "/admin/accounts" },
                { id: 1, label: "Add Account", link: "/admin/add-account" },
            ]
        },
        {
            id: "category",
            // label: "Pages",
            label: "Category",
            icon: "ri-attachment-2",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsPages(!isPages);
                setIscurrentState('Pages');
                updateIconSidebar(e);
            },
            
            stateVariables: isPages,
            subItems: [
                
                {
                    id: "allCategory",
                    label: "All Category",
                    link: "/admin/category",               
                },
                { id: "addCategory", label: "Add Category", link: "/admin/add-category"},
            ],
        },
        {
            id: "Campaign",
            label: "Campaign",
            icon: "ri-compasses-2-line",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsIcons(!isIcons);
                setIscurrentState('Icons');
                updateIconSidebar(e);
            },
            stateVariables: isIcons,
            subItems: [
                { id: "all-campaign", label: "All Campaign", link: "/admin/campaigns", parentId: "icons" },
                { id: "add-campaign", label: "Add Campaign", link: "/admin/add-campaign", parentId: "icons" },
                { id: "all-asset", label: "All Asset", link: "/admin/assets", parentId: "icons" },
                { id: "add-asset", label: "Add Asset", link: "/admin/add-asset", parentId: "icons" },
               
            ],
        },
        {
            id: "validateEmail",
            label: "Email Validator",
            icon: "ri-mail-check-line",
            link: "/admin/verify-email",
            click: function (e) {
                e.preventDefault();
                setIsIcons(!isIcons);
                setIscurrentState('Icons');
                updateIconSidebar(e);
            },
            stateVariables: isIcons,
        },
        {
            id: "email",
            label: "Send Email",
            icon: "ri-mail-send-fill",
            link: "/#",
            role:"user",
            stateVariables: isDashboard,
            subItems: [
               
                {
                    id: "singleEmail",
                    label: "Single Email",
                    link: "/admin/single-email",
                },
                { id: "bulkEmail", label: "Bulk Email", link: "/admin/bulk-email"},
                // { id: "validateEmail", label: "Verify Email Account", link: "/admin/verify-email"},
             
            ],
            click: function (e) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                updateIconSidebar(e);
            },
            
        },
        {
            id: "emailLogList",
            // label: "Pages",
            label: "Email Log",
            icon: "ri-mail-download-line",
            role:"user",
            link: "/admin/email-log",
            click: function (e) {
                e.preventDefault();
                setIsEmailLog(!isEmailLog);
                setIscurrentState('Email Log');
                updateIconSidebar(e);
            },
            
            stateVariables: isEmailLog,
        },
        {
            id: "subscriberList",
            // label: "Pages",
            label: "Subscriber List",
            icon: "ri-user-add-line",
            role:"user",
            link: "/admin/subscriber-list",
            click: function (e) {
                e.preventDefault();
                setIsSubscriberList(!isSubscriberList);
                setIscurrentState('Subscriber List');
                updateIconSidebar(e);
            },
            
            stateVariables: isSubscriberList,
        },
        {
            id: "unsubscriberList",
            // label: "Pages",
            label: "UnSubscriber List",
            icon: "ri-user-unfollow-line",
            role:"user",
            link: "/admin/unsubscriber-list",
            click: function (e) {
                e.preventDefault();
                setIsUnsubsciberlist(!isUnsubsciberList);
                setIscurrentState('Unsubscriber List');
                updateIconSidebar(e);
            },
            
            stateVariables: isUnsubsciberList,
        },        
        // {
        //     id: "email",
        //     label: "Emails",
        //     icon: "ri-mail-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setEmail(!isEmail);
        //         setIscurrentState('Email');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isEmail,
        //     subItems: [
        //         { id: "emailList", label: "All Emails", link: "/admin/email-list" },
        //          { id: "add-email", label: "Add Email", link: "/admin/add-email" },
        //     ],
        // },
        {
            id: "admin",
            label: "Admin",
            icon: "ri-admin-fill",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsAdmin(!isAdmin);
                setIscurrentState('Admin');
                updateIconSidebar(e);
            },

            stateVariables: isAdmin,
            subItems: [
                {
                    id: "admins",
                    label: "All Admins",
                    link: "/admin/admin-list",
                },
              
                {
                    id: "addAdmin",
                    label: "Add Admin",
                    link: "/admin/add-admin",
                },
               
            ],
        },    
        {
            id: "users",
            label: "Users",
            icon: "ri-user-line",
            link: "/#",
            click: function (e) {
                e.preventDefault();
                setIsUsersMenu(!isUsersMenu);
                setIscurrentState('Users');
                updateIconSidebar(e);
            },
            stateVariables: isUsersMenu,
            subItems: [
                { id: "userList", label: "All User", link: "/admin/user-list" },
                { id: "addUser", label: "Add User", link: "/admin/add-user"},

            ],
        },
    ];
 const getFilteredMenuItems = () => {
  return menuItems.filter((item) => {
    if (role === "user") {
      // Show only vendor-related items and headers
      return item.role == "user"
    }

    if (userType === "user") {
      // Show only user-related items and headers
      return item.isHeader === true
        ? item.label === "User"
        : item.link?.startsWith("/user") || (item.label === "Profile" && item.link?.startsWith("/user"));
    }

    // For admin, show all items except user and vendor specific ones
 
    return !(item.isHeader === true
      ? item.label === "User" || item.label === "Vendor"
      : item.link?.startsWith("/user") || item.link?.startsWith("/vendor"));
 
  });
};

    
  
    // return <React.Fragment>{menuItems}</React.Fragment>;
    return <React.Fragment>{getFilteredMenuItems()}</React.Fragment>;

};



export default Navdata;