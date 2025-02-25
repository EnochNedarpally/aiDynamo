import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  const location = useLocation();
  //state data
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

  const [userType, setUserType] = useState("admin");

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

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
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
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
    isMultiLevel,
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
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },

    {
      id: "authentication",
      // label: "Authentication",
      label: "Users",
      icon: "ri-account-circle-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsAuth(!isAuth);
        setIscurrentState("Auth");
        updateIconSidebar(e);
      },
      stateVariables: isAuth,
      subItems: [
        {
          id: "signIn",
          label: "Admin",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsSignIn(!isSignIn);
          },
          parentId: "authentication",
          stateVariables: isSignIn,
          childItems: [
            { id: 2, label: "Add Admin", link: "/admin/user-addadmin" },
            { id: 1, label: "All Admin", link: "/admin/user-alladmin" },
          ],
        },

        {
          id: "signUp",
          label: "Campaign Managers",
          link: "/campaign-managers",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsSignUp(!isSignUp);
          },
          parentId: "authentication",
          stateVariables: isSignUp,
          childItems: [
            {
              id: 1,
              label: "All CampaignManagers",
              link: "/admin/user-allcampaign-managers",
            },
            {
              id: 2,
              label: "Add CampaignManager",
              link: "/admin/user-addcampaign-managers",
            },
          ],
        },
        {
          id: "passwordReset",
          label: "Editors",
          link: "/editors",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsPasswordReset(!isPasswordReset);
          },
          parentId: "authentication",
          stateVariables: isPasswordReset,
          childItems: [
            { id: 1, label: "All Editors", link: "/admin/user-alleditors" },
            { id: 2, label: "Add Editor", link: "/admin/user-addeditors" },
          ],
        },
      ],
    },

    {
      id: "Vendors",
      // label: "Pages",
      label: "Vendors",
      icon: "ri-pages-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsPages(!isPages);
        setIscurrentState("Pages");
        updateIconSidebar(e);
      },

      stateVariables: isPages,
      subItems: [
        {
          id: "profile",
          label: "All Vendors",
          link: "/admin/all-vendors",
          // isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsProfile(!isProfile);
          },
          parentId: "pages",
          stateVariables: isProfile,
        },
        {
          id: "team",
          label: "Review Vendor",
          link: "/admin/review-vendors",
          parentId: "pages",
        },
        //,,,,,,,,,,,,,,,,,,,,,,,,,
      ],
    },
    {
      id: "Category",
      label: "Category",
      icon: "ri-dashboard-2-line",
      link: "/#",
      stateVariables: isDashboard,
      subItems: [
        {
          id: "profile",
          label: "All Category",

          link: "/all-category",
          // isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsProfile(!isProfile);
          },
          parentId: "pages",
          stateVariables: isProfile,
        },
        {
          id: "team",
          label: "Add Category",
          link: "/add-category",
          parentId: "pages",
        },
      ],
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },

    {
      id: "pages",
      // label: "Pages",
      label: "Whitepapers",
      icon: "ri-pages-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsPages(!isPages);
        setIscurrentState("Pages");
        updateIconSidebar(e);
      },

      stateVariables: isPages,
      subItems: [
        {
          id: "profile",
          label: "All Whitepapers",
          link: "/all-whitepapers",
          // isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsProfile(!isProfile);
          },
          parentId: "pages",
          stateVariables: isProfile,
        },
        {
          id: "team",
          label: "Add Whitepapers",
          link: "/add-whitepapers",
          parentId: "pages",
        },
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
        setIscurrentState("Icons");
        updateIconSidebar(e);
      },
      stateVariables: isIcons,
      subItems: [
        {
          id: "all-campaign",
          label: "All Campaign",
          link: "/all-campaign",
          parentId: "icons",
        },
        {
          id: "add-campaign",
          label: "Add Campaign",
          link: "/add-campaign",
          parentId: "icons",
        },
      ],
    },
    {
      id: "NewsLetters",
      label: "NewsLetters",
      icon: "ri-map-pin-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsMaps(!isMaps);
        setIscurrentState("Maps");
        updateIconSidebar(e);
      },
      stateVariables: isMaps,
      subItems: [
        {
          id: "all-news-letters",
          label: "All NewsLetters",
          link: "/all-news-letters",
          parentId: "maps",
        },
        {
          id: "add-news-letters",
          label: "Add NewsLetters",
          link: "/add-news-letters",
          parentId: "icons",
        },
      ],
    },
    {
      id: "Blogs",
      label: "Blogs",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsMultiLevel(!isMultiLevel);
        setIscurrentState("MuliLevel");
        updateIconSidebar(e);
      },

      stateVariables: isMultiLevel,
      subItems: [
        {
          id: "level1.1",
          label: "All blogs category",
          link: "/all-blogs-category",
          parentId: "multilevel",
        },
        {
          id: "Level 1.2",
          label: "Add blogs category",
          link: "/add-blogs-category",
          // isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsLevel1(!isLevel1);
          },
          stateVariables: isLevel1,
        },
        {
          id: "All Blogs",
          label: "All blogs",
          link: "/all-blogs",
          // isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsLevel1(!isLevel1);
          },
          stateVariables: isLevel1,
        },

        {
          id: "add new Blogs",
          label: "Add new Blogs",
          link: "/add-new-blog",
          // isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsLevel1(!isLevel1);
          },
          stateVariables: isLevel1,
        },
      ],
    },

    {
      id: "Report",
      label: "Report",
      icon: "ri-pie-chart-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsCharts(!isCharts);
        setIscurrentState("Charts");
        updateIconSidebar(e);
      },
      stateVariables: isCharts,
      subItems: [
        {
          id: "apexcharts",
          label: "Campaign reports",
          link: "/campaign-reports",
          // isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsApex(!isApex);
          },
          stateVariables: isApex,
        },
        {
          id: "Newsletter report",
          label: "Newsletter reports",
          link: "/newsletter-reports",
          parentId: "charts",
        },
        {
          id: "Subscriber report",
          label: "Subscriber reports",
          link: "/subscriber-reports",
          parentId: "charts",
        },
        {
          id: "Download report",
          label: "Download reports",
          link: "/download-reports",
          parentId: "charts",
        },
      ],
    },
    {
      id: "Setting",
      label: "Setting",
      icon: "ri-dashboard-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsCharts(!isCharts);
        setIscurrentState("Charts");
        updateIconSidebar(e);
      },
      stateVariables: isCharts,
      subItems: [
        {
          id: "Site setting",
          label: "Site setting",
          link: "/#",
          // isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsApex(!isApex);
          },
          stateVariables: isApex,
        },
        {
          id: "Home",
          label: "Home",
          link: "/charts-chartjs",
          parentId: "charts",
        },

        {
          id: "PrivecyPolicy",
          label: "Privacy Policy",
          link: "/pages-privacy-policy",
          parentId: "pages",
        },
        {
          id: "TermsCondition",
          label: "Terms Condition",
          link: "/pages-terms-condition",
          parentId: "pages",
        },
        {
          id: "GDPR comlainces",
          label: "GDPR comlainces",
          link: "/pages-terms-condition",
          parentId: "pages",
        },
        {
          id: "edit profile",
          label: "Edit profile",
          link: "/pages-terms-condition",
          parentId: "pages",
        },
      ],
    },
    {
      label: "User",

      isHeader: true,
    },
    {
      id: "Userdashboard",
      label: "Dashboards",
      icon: "ri-dashboard-2-line",
      link: "/user/dashboard",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "SavedWhitePapers",
      label: "Saved WhitePapers",
      icon: "ri-dashboard-2-line",
      link: "/user/saved-whitepapers",
      stateVariables: isDashboard,
    },
    {
      id: "CategorySubscribers",
      label: "Subscribe Category",
      icon: "ri-dashboard-2-line",
      link: "/user/category-subsciber",
      stateVariables: isDashboard,
    },
    {
      id: "NewsLetterSubsciber",
      label: "NewsLetter",
      icon: "ri-dashboard-2-line",
      // link: "/user/newsletter-subsciber",
      link: "/#",
      stateVariables: isDashboard,
    },
    {
      id: "profile",
      label: "Profile",
      link: "/user/profile",
      icon: "ri-account-circle-line",
      // isChildItem: true,
      click: function (e) {
        e.preventDefault();
        setIsProfile(!isProfile);
      },
      parentId: "pages",
      stateVariables: isProfile,
    },
    ////////////////////////////////////////////////////////
    {
      label: "Vendor",

      isHeader: true,
    },
    {
      id: "Vendordashboard",
      label: "Dashboards",
      icon: "ri-dashboard-2-line",
      link: "/vendor/dashboard",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "pages",
      // label: "Pages",
      label: "Whitepapers",
      icon: "ri-pages-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsPages(!isPages);
        setIscurrentState("Pages");
        updateIconSidebar(e);
      },

      stateVariables: isPages,
      subItems: [
        {
          id: "profile",
          label: "All Whitepapers",
          link: "/vendor/all-whitepapers",
          // isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsProfile(!isProfile);
          },
          parentId: "pages",
          stateVariables: isProfile,
        },
        {
          id: "team",
          label: "Add Whitepapers",
          link: "/vendor/add-whitepapers",
          parentId: "pages",
        },
      ],
    },
    {
      id: "profile",
      label: "Profile",
      link: "/vendor/profile",
      icon: "ri-account-circle-line",
      // isChildItem: true,
      click: function (e) {
        e.preventDefault();
        setIsProfile(!isProfile);
      },
      parentId: "pages",
      stateVariables: isProfile,
    },
  ];

  const getFilteredMenuItems = () => {
    return menuItems.filter((item) => {
      if (userType === "vendor") {
        // Show only vendor-related items and headers
        return item.isHeader === true
          ? item.label === "Vendor"
          : item.id?.toLowerCase().includes("vendor") ||
              (item.label === "Profile" && item.link?.startsWith("/vendor"));
      }

      if (userType === "user") {
        // Show only user-related items and headers
        return item.isHeader === true
          ? item.label === "User"
          : item.id?.toLowerCase().includes("user") ||
              (item.label === "Profile" && item.link?.startsWith("/user"));
      }

      // For admin, show all items except user and vendor specific ones
      return !(item.isHeader === true
        ? item.label === "User" || item.label === "Vendor"
        : item.id?.toLowerCase().includes("user") ||
          item.id?.toLowerCase().includes("vendor"));
    });
  };

  return <React.Fragment>{getFilteredMenuItems()}</React.Fragment>;
};

export default Navdata;
