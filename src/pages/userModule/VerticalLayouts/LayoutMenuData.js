import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
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

    //Calender
    const [isCalender, setCalender] = useState(false);

    // Apps
    const [isEmail, setEmail] = useState(false);
    const [isSubEmail, setSubEmail] = useState(false);
    const [isEcommerce, setIsEcommerce] = useState(false);
    const [isProjects, setIsProjects] = useState(false);
    const [isTasks, setIsTasks] = useState(false);
    const [isCRM, setIsCRM] = useState(false);
    const [isCrypto, setIsCrypto] = useState(false);
    const [isInvoices, setIsInvoices] = useState(false);
    const [isSupportTickets, setIsSupportTickets] = useState(false);
    const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
    const [isJobs, setIsJobs] = useState(false);
    const [isJobList, setIsJobList] = useState(false);
    const [isCandidateList, setIsCandidateList] = useState(false);


    // Authentication
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [isPasswordCreate, setIsPasswordCreate] = useState(false);
    const [isLockScreen, setIsLockScreen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isVerification, setIsVerification] = useState(false);
    const [isError, setIsError] = useState(false);

    // Pages
    const [isProfile, setIsProfile] = useState(false);
    const [isLanding, setIsLanding] = useState(false);


    // Charts
    const [isApex, setIsApex] = useState(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState(false);
    const [isLevel2, setIsLevel2] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

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
                setIscurrentState('Dashboard');
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
        // {
        //     label: "Vendor",
        
        //     isHeader: true,
        // },
     
       
        // {
        //     id: "pages",
        //     // label: "Pages",
        //     label: "Whitepapers",
        //     icon: "ri-pages-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsPages(!isPages);
        //         setIscurrentState('Pages');
        //         updateIconSidebar(e);
        //     },
            
        //     stateVariables: isPages,
        //     subItems: [
                
        //         {
        //             id: "profile",
        //             label: "All Whitepapers",
        //             link: "/all-whitepapers",
        //             // isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsProfile(!isProfile);
        //             },
        //             parentId: "pages",
        //             stateVariables: isProfile,
               
        //         },
        //         { id: "team", label: "Add Whitepapers", link: "/add-whitepapers", parentId: "pages" },
                
        //     ],
        // },
        // {
        //     id: "Campaign",
        //     label: "Campaign",
        //     icon: "ri-compasses-2-line",
            
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsIcons(!isIcons);
        //         setIscurrentState('Icons');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isIcons,
        //     subItems: [
        //         { id: "all-campaign", label: "All Campaign", link: "/all-campaign", parentId: "icons" },
        //         { id: "add-campaign", label: "Add Campaign", link: "/add-campaign", parentId: "icons" },
               
        //     ],
        // },
        // {
        //     id: "NewsLetters",
        //     label: "NewsLetters",
        //     icon: "ri-map-pin-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsMaps(!isMaps);
        //         setIscurrentState('Maps');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isMaps,
        //     subItems: [
        //         { id: "all-news-letters", label: "All NewsLetters", link: "/all-news-letters", parentId: "maps" },
        //          { id: "add-news-letters", label: "Add NewsLetters", link: "/add-news-letters", parentId: "icons" },
        //     ],
        // },
        // {
        //     id: "Blogs",
        //     label: "Blogs",
        //     icon: "ri-file-list-3-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsMultiLevel(!isMultiLevel);
        //         setIscurrentState('MuliLevel');
        //         updateIconSidebar(e);
        //     },

        //     stateVariables: isMultiLevel,
        //     subItems: [
        //         { id: "level1.1", label: "All blogs category", link: "/all-blogs-category", parentId: "multilevel" },
        //         {
        //             id: "Level 1.2",
        //             label: "Add blogs category",
        //             link: "/add-blogs-category",
        //             // isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsLevel1(!isLevel1);
        //             },
        //             stateVariables: isLevel1,
            
        //         },
        //         {
        //             id: "All Blogs",
        //             label: "All blogs",
        //             link: "/all-blogs",
        //             // isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsLevel1(!isLevel1);
        //             },
        //             stateVariables: isLevel1,
     
        //         },
              
        //         {
        //             id: "add new Blogs",
        //             label: "Add new Blogs",
        //             link: "/add-new-blog",
        //             // isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsLevel1(!isLevel1);
        //             },
        //             stateVariables: isLevel1,
                
        //         },
               
        //     ],
        // },
       
        /////////////////////////////////////////////////////////////////////////////////////////////
        // {
        //     id: "forms",
        //     label: "PDF Upload",
        //     icon: "ri-file-list-3-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsForms(!isForms);
        //         setIscurrentState('Forms');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isForms,
        //     subItems: [
        //         // { id: "basicelements", label: "Basic Elements", link: "/forms-elements", parentId: "forms" },
        //         // { id: "formselect", label: "Form Select", link: "/forms-select", parentId: "forms" },
        //         // { id: "checkboxsradios", label: "Checkboxs & Radios", link: "/forms-checkboxes-radios", parentId: "forms" },
        //         // { id: "pickers", label: "Pickers", link: "/forms-pickers", parentId: "forms" },
        //         // { id: "inputmasks", label: "Input Masks", link: "/forms-masks", parentId: "forms" },
        //         // { id: "advanced", label: "Advanced", link: "/forms-advanced", parentId: "forms" },
        //         // { id: "rangeslider", label: "Range Slider", link: "/forms-range-sliders", parentId: "forms" },
        //         // { id: "validation", label: "Validation", link: "/forms-validation", parentId: "forms" },
        //         // { id: "wizard", label: "Wizard", link: "/forms-wizard", parentId: "forms" },
        //         // { id: "editors", label: "Editors", link: "/forms-editors", parentId: "forms" },
        //         { id: "fileuploads", label: "File Uploads", link: "/whitepapers", parentId: "forms" },
        //         // { id: "formlayouts", label: "Form Layouts", link: "/forms-layouts", parentId: "forms" },
        //         // { id: "select2", label: "Select2", link: "/forms-select2", parentId: "forms" },
        //     ],
        // },
          /////////////////////////////////////////////////////////////////////////////////////////////
        
        // {
        //     id: "Report",
        //     label: "Report",
        //     icon: "ri-pie-chart-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsCharts(!isCharts);
        //         setIscurrentState('Charts');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isCharts,
        //     subItems: [





        //         {
        //             id: "apexcharts",
        //             label: "Campaign reports",
        //             link: "/campaign-reports",
        //             // isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsApex(!isApex);
        //             },
        //             stateVariables: isApex,
                  
        //         },
        //         { id: "Newsletter report", label: "Newsletter reports", link: "/newsletter-reports", parentId: "charts" },
        //         { id: "Subscriber report", label: "Subscriber reports", link: "/subscriber-reports", parentId: "charts" },
        //         { id: "Download report", label: "Download reports", link: "/download-reports", parentId: "charts" },

        //     ],
        // },
        // {
        //     id: "Setting",
        //     label: "Setting",
        //     icon: "ri-dashboard-2-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsCharts(!isCharts);
        //         setIscurrentState('Charts');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isCharts,
        //     subItems: [
        //         {
        //             id: "Site setting",
        //             label: "Site setting",
        //             link: "/#",
        //             // isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsApex(!isApex);
        //             },
        //             stateVariables: isApex,
                   
               
        //         },
        //         { id: "Home", label: "Home", link: "/charts-chartjs", parentId: "charts" },
                
        //              { id: "PrivecyPolicy", label: "Privacy Policy", link: "/pages-privacy-policy", parentId: "pages" },
        //         { id: "TermsCondition", label: "Terms Condition", link: "/pages-terms-condition", parentId: "pages" },
        //         { id: "GDPR comlainces", label: "GDPR comlainces", link: "/pages-terms-condition", parentId: "pages" },
        //         { id: "edit profile", label: "Edit profile", link: "/pages-terms-condition", parentId: "pages" },

        //     ],
        // },
      
    ];


    return <React.Fragment>{menuItems}</React.Fragment>;
};



export default Navdata;