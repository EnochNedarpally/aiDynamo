import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardAnalytics from "../pages/DashboardAnalytics";
import DashboardCrm from "../pages/DashboardCrm";
import DashboardEcommerce from "../pages/AdminDashboard/AdminDashboard";

import DashboardCrypto from "../pages/DashboardCrypto";
import DashboardProject from "../pages/DashboardProject";
import DashboardNFT from "../pages/DashboardNFT";
import DashboardJob from "../pages/DashboardJob/";

//Calendar
import MonthGrid from "../pages/Calendar/MonthGrid";
import Calendar from "../pages/Calendar/Maincalender";

// Email box
import MailInbox from "../pages/EmailInbox";
import BasicAction from "../pages/Email/EmailTemplates/BasicAction";
import EcommerceAction from "../pages/Email/EmailTemplates/EcommerceAction";

//Chat
import Chat from "../pages/Chat";

// Project
import ProjectList from "../pages/Projects/ProjectList";
import ProjectOverview from "../pages/Projects/ProjectOverview";
import CreateProject from "../pages/Projects/CreateProject";

//Task
import TaskDetails from "../pages/Tasks/TaskDetails";
import TaskList from "../pages/Tasks/TaskList";
import Kanbanboard from "../pages/Tasks/KanbanBoard";

//Transactions
import Transactions from '../pages/Crypto/Transactions';
import BuySell from '../pages/Crypto/BuySell';
import CryproOrder from '../pages/Crypto/CryptoOrder';
import MyWallet from '../pages/Crypto/MyWallet';
import ICOList from '../pages/Crypto/ICOList';
import KYCVerification from '../pages/Crypto/KYCVerification';

//Crm Pages
// import CrmCompanies from "../pages/AdminDashboard/MostDownloadedPDFList ";
import CrmContacts from "../pages/AdminDashboard/CrmContacts";
import CrmDeals from "../pages/AdminDashboard/CrmDeals/index";
import CrmLeads from "../pages/AdminDashboard/CrmLeads/index_1";

//Invoices
import InvoiceList from "../pages/Invoices/InvoiceList";
import InvoiceCreate from "../pages/Invoices/InvoiceCreate";
import InvoiceDetails from "../pages/Invoices/InvoiceDetails";

// Support Tickets
import ListView from '../pages/SupportTickets/ListView';
import TicketsDetails from '../pages/SupportTickets/TicketsDetails';

// //Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceProducts/EcommerceAddProduct";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceOrderDetail from "../pages/Ecommerce/EcommerceOrders/EcommerceOrderDetail";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
import EcommerceSellers from "../pages/Ecommerce/EcommerceSellers/index";
import EcommerceSellerDetail from "../pages/Ecommerce/EcommerceSellers/EcommerceSellerDetail";

// NFT Marketplace Pages
import Marketplace from "../pages/NFTMarketplace/Marketplace";
import Collections from "../pages/NFTMarketplace/Collections";
import CreateNFT from "../pages/NFTMarketplace/CreateNFT";
import Creators from "../pages/NFTMarketplace/Creators";
import ExploreNow from "../pages/NFTMarketplace/ExploreNow";
import ItemDetails from "../pages/NFTMarketplace/Itemdetails";
import LiveAuction from "../pages/NFTMarketplace/LiveAuction";
import Ranking from "../pages/NFTMarketplace/Ranking";
import WalletConnect from "../pages/NFTMarketplace/WalletConnect";

// Base Ui
import UiAlerts from "../pages/BaseUi/UiAlerts/UiAlerts";
import UiBadges from "../pages/BaseUi/UiBadges/UiBadges";
import UiButtons from "../pages/BaseUi/UiButtons/UiButtons";
import UiColors from "../pages/BaseUi/UiColors/UiColors";
import UiCards from "../pages/BaseUi/UiCards/UiCards";
import UiCarousel from "../pages/BaseUi/UiCarousel/UiCarousel";
import UiDropdowns from "../pages/BaseUi/UiDropdowns/UiDropdowns";
import UiGrid from "../pages/BaseUi/UiGrid/UiGrid";
import UiImages from "../pages/BaseUi/UiImages/UiImages";
import UiTabs from "../pages/BaseUi/UiTabs/UiTabs";
import UiAccordions from "../pages/BaseUi/UiAccordion&Collapse/UiAccordion&Collapse";
import UiModals from "../pages/BaseUi/UiModals/UiModals";
import UiOffcanvas from "../pages/BaseUi/UiOffcanvas/UiOffcanvas";
import UiPlaceholders from "../pages/BaseUi/UiPlaceholders/UiPlaceholders";
import UiProgress from "../pages/BaseUi/UiProgress/UiProgress";
import UiNotifications from "../pages/BaseUi/UiNotifications/UiNotifications";
import UiMediaobject from "../pages/BaseUi/UiMediaobject/UiMediaobject";
import UiEmbedVideo from "../pages/BaseUi/UiEmbedVideo/UiEmbedVideo";
import UiTypography from "../pages/BaseUi/UiTypography/UiTypography";
import UiList from "../pages/BaseUi/UiLists/UiLists";
import UiGeneral from "../pages/BaseUi/UiGeneral/UiGeneral";
import UiRibbons from "../pages/BaseUi/UiRibbons/UiRibbons";
import UiUtilities from "../pages/BaseUi/UiUtilities/UiUtilities";

// Advance Ui
import UiNestableList from "../pages/AdvanceUi/UiNestableList/UiNestableList";
import UiScrollbar from "../pages/AdvanceUi/UiScrollbar/UiScrollbar";
import UiAnimation from "../pages/AdvanceUi/UiAnimation/UiAnimation";
import UiTour from "../pages/AdvanceUi/UiTour/UiTour";
import UiSwiperSlider from "../pages/AdvanceUi/UiSwiperSlider/UiSwiperSlider";
import UiRatings from "../pages/AdvanceUi/UiRatings/UiRatings";
import UiHighlight from "../pages/AdvanceUi/UiHighlight/UiHighlight";

// Widgets
import Widgets from '../pages/Widgets/Index';

//Forms
import BasicElements from "../pages/Forms/BasicElements/BasicElements";
import FormSelect from "../pages/Forms/FormSelect/FormSelect";
import FormEditor from "../pages/Forms/FormEditor/FormEditor";
import CheckBoxAndRadio from "../pages/Forms/CheckboxAndRadio/CheckBoxAndRadio";
import Masks from "../pages/Forms/Masks/Masks";
import FormPickers from "../pages/Forms/FormPickers/FormPickers";
import FormRangeSlider from "../pages/Forms/FormRangeSlider/FormRangeSlider";
import Formlayouts from "../pages/Forms/FormLayouts/Formlayouts";
import FormValidation from "../pages/Forms/FormValidation/FormValidation";
import FormWizard from "../pages/Forms/FormWizard/FormWizard";
import FormAdvanced from "../pages/Forms/FormAdvanced/FormAdvanced";
import Select2 from "../pages/Forms/Select2/Select2";

//Tables
import BasicTables from '../pages/Tables/BasicTables/BasicTables';
import ListTables from '../pages/Tables/ListTables/ListTables';
import ReactTable from "../pages/Tables/ReactTables";

//Icon pages
import RemixIcons from "../pages/Icons/RemixIcons/RemixIcons";
import BoxIcons from "../pages/Icons/BoxIcons/BoxIcons";
import MaterialDesign from "../pages/Icons/MaterialDesign/MaterialDesign";
import FeatherIcons from "../pages/Icons/FeatherIcons/FeatherIcons";
import LineAwesomeIcons from "../pages/Icons/LineAwesomeIcons/LineAwesomeIcons";
import CryptoIcons from "../pages/Icons/CryptoIcons/CryptoIcons";

//Maps
import GoogleMaps from "../pages/Maps/GoogleMaps/GoogleMaps";

//AuthenticationInner pages
import BasicSignIn from '../pages/AuthenticationInner/Login/BasicSignIn';
import CoverSignIn from '../pages/AuthenticationInner/Login/CoverSignIn';
import BasicSignUp from '../pages/AuthenticationInner/Register/BasicSignUp';
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from '../pages/AuthenticationInner/PasswordReset/BasicPasswReset';
//pages
import Starter from '../pages/Pages/Starter/Starter';
import SimplePage from '../pages/Pages/Profile/SimplePage/SimplePage';
import Settings from '../pages/Pages/Profile/Settings/Settings';
import AddCategory from '../pages/Pages/Category/AddCategory';
import Timeline from '../pages/Pages/Timeline/Timeline';
// import Faqs from '../pages/Pages/Faqs/Faqs';
// import Pricing from '../pages/Pages/Pricing/Pricing';
// import Gallery from '../pages/Pages/Gallery/Gallery';
// import Maintenance from '../pages/Pages/Maintenance/Maintenance';
// import ComingSoon from '../pages/Pages/ComingSoon/ComingSoon';
// import SiteMap from '../pages/Pages/SiteMap/SiteMap';
// import SearchResults from '../pages/Pages/SearchResults/SearchResults';

import CoverPasswReset from '../pages/AuthenticationInner/PasswordReset/CoverPasswReset';
import BasicLockScreen from '../pages/AuthenticationInner/LockScreen/BasicLockScr';
import CoverLockScreen from '../pages/AuthenticationInner/LockScreen/CoverLockScr';
import BasicLogout from '../pages/AuthenticationInner/Logout/BasicLogout';
import CoverLogout from '../pages/AuthenticationInner/Logout/CoverLogout';
import BasicSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg';
import CoverSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg';
import BasicTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify';
import CoverTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify';
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';
import Error500 from '../pages/AuthenticationInner/Errors/Error500';

import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//APi Key
import APIKey from "../pages/APIKey/index";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

//Charts
import LineCharts from "../pages/Charts/ApexCharts/LineCharts";
import AreaCharts from "../pages/Charts/ApexCharts/AreaCharts";
import ColumnCharts from "../pages/Charts/ApexCharts/ColumnCharts";
import BarCharts from "../pages/Charts/ApexCharts/BarCharts";
import MixedCharts from "../pages/Charts/ApexCharts/MixedCharts";
import TimelineCharts from "../pages/Charts/ApexCharts/TimelineCharts";
import CandlestickChart from "../pages/Charts/ApexCharts/CandlestickChart";
import BoxplotCharts from "../pages/Charts/ApexCharts/BoxplotCharts";
import BubbleChart from "../pages/Charts/ApexCharts/BubbleChart";
import ScatterCharts from "../pages/Charts/ApexCharts/ScatterCharts";
import HeatmapCharts from "../pages/Charts/ApexCharts/HeatmapCharts";
import TreemapCharts from "../pages/Charts/ApexCharts/TreemapCharts";
import PieCharts from "../pages/Charts/ApexCharts/PieCharts";
import RadialbarCharts from "../pages/Charts/ApexCharts/RadialbarCharts";
import RadarCharts from "../pages/Charts/ApexCharts/RadarCharts";
import PolarCharts from "../pages/Charts/ApexCharts/PolarCharts";
import ChartsJs from "../pages/Charts/ChartsJs/index";
import Echarts from "../pages/Charts/ECharts/index";

//Job pages
import Statistics from "../pages/Jobs/Statistics";
import JobList from "../pages/Jobs/JobList/List";
import JobGrid from "../pages/Jobs/JobList/Grid";
import JobOverview from "../pages/Jobs/JobList/Overview";
import CandidateList from "../pages/Jobs/CandidateList/ListView";
import CandidateGrid from "../pages/Jobs/CandidateList/GridView";
import NewJobs from "../pages/Jobs/NewJob";
import JobCategories from "../pages/Jobs/JobCategories";
import Application from "../pages/Jobs/Application";
import CompaniesList from "../pages/Jobs/CompaniesList";

// Landing Index
import OnePage from "../pages/Landing/OnePage";
import NFTLanding from "../pages/Landing/NFTLanding";

import PrivecyPolicy from '../pages/Pages/PrivacyPolicy';
import TermsCondition from '../pages/Pages/TermsCondition';
import JobLanding from "../pages/Job_Landing/Job";

// User Profile

import RangeArea from '../pages/Charts/ApexCharts/RangeAreaCharts';

import FileManager from "../pages/FileManager";
import ToDoList from "../pages/ToDo";
import UILink from "../pages/BaseUi/UiLink/Index";
import FunnelCharts from "../pages/Charts/ApexCharts/FunnelCharts";
import AllCategory from "../pages/Pages/Category/AllCategory";
import AddWhitepapers from "../pages/Forms/FileUpload/AddWhitepapers";
import AllWhitepapers from "../pages/Pages/Whitepaper/AllWhitepapers ";
import AddWhitepaper from "../pages/Pages/Whitepaper/AddWhitepapers";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import MostDownloadedPDFList from "../pages/AdminDashboard/MostDownloadedPDFList ";
import ViewCategory from "../pages/Pages/Category/ViewCategory";
import AddCampaign from "../pages/Pages/campaign/AddCampaign";
import AllCampaign from "../pages/Pages/campaign/AllCampaign";
import ViewCampaign from "../pages/Pages/campaign/ViewCampaign";
import AddNewsLetters from "../pages/Pages/newsLetters/AddNewsLetters";
import AllNewsLetters from "../pages/Pages/newsLetters/AllNewsLetters";
import ViewNewsLetters from "../pages/Pages/newsLetters/ViewNewsLetters";
import AddBlogsCategory from "../pages/Pages/blogs/AddBlogsCategory";
import AllBlogsCategory from "../pages/Pages/blogs/AllBlogsCategory";
import AllBlogs from "../pages/Pages/blogs/AllBlogs";
import AddNewBlog from "../pages/Pages/blogs/AddNewBlog";
import ReviewVendor from "../pages/Pages/vendor/ReviewVendor";
import AllVendors from "../pages/Pages/vendor/AllVendors";


import CampaignReports from "../pages/Pages/report/CampaignReports";
import NewsletterReports from "../pages/Pages/report/NewsletterReports";
import SubscriberReports from "../pages/Pages/report/SubscriberReports";
import DownloadReports from "../pages/Pages/report/DownloadReports";
import CampaignManagers from "../pages/Pages/user/campaignManagers/AddCampaignManagers";
import Admin from "../pages/Pages/user/admin/AllAdmin";
import AddCampaignManagers from "../pages/Pages/user/campaignManagers/AddCampaignManagers";
import AllCampaignManagers from "../pages/Pages/user/campaignManagers/AllCampaignManagers";
import AllEditors from "../pages/Pages/user/editors/AllEditors";
import AddAdmin from "../pages/Pages/user/admin/AddAdmin";
import AllAdmin from "../pages/Pages/user/admin/AllAdmin";
import AddEditors from "../pages/Pages/user/editors/AddEditors";

import VendorDashboard from "../pages/vendorModule/vendorDashboard/VendorDashboard";
import VendorProfile from "../pages/vendorModule/Profile/Profile";
import UserProfile from "../pages/userModule/Profile/Profile";
import UserDashboard from "../pages/userModule/userDashboard/UserDashboard";
import SavedWhitepapers from "../pages/userModule/SavedWhitepapers";
import NewsletterSubsciber from "../pages/userModule/NewsletterSubsciber";
import CategorySubsciber from "../pages/userModule/CategorySubsciber";
import VendorLogin from "../pages/vendorModule/VendorLogin/VendorLogin";
import VendorAddWhitepaper from "../pages/vendorModule/Whitepaper/VendorAddWhitepapers";
import VendorAllWhitepapers from "../pages/vendorModule/Whitepaper/vendorAllWhitepapers ";
import GetUserToken from "../pages/userModule/GetUserToken";



const authProtectedRoutes = [
  { path: "/dashboard-analytics", component: <DashboardAnalytics /> },
  { path: "/dashboard-crm", component: <DashboardCrm /> },
  { path: "/admin/dashboard", component: <AdminDashboard /> },
  { path: "/index", component: <DashboardEcommerce /> },

  { path: "/apps-calendar", component: <Calendar /> },
  { path: "/apps-calendar-month-grid", component: <MonthGrid /> },
  { path: "/apps-ecommerce-products", component: <EcommerceProducts /> },

  //Projects
  // { path: "/apps-projects-list", component: <ProjectList /> },
  { path: "/apps-projects-overview", component: <ProjectOverview /> },
  // { path: "/apps-projects-create", component: <CreateProject /> },

  // Widgets
  { path: "/widgets", component: <Widgets /> },

 
  { path: "/admin/add-whitepapers", component: <AddWhitepaper /> }, 
  { path: "/admin/all-whitepapers", component: <AllWhitepapers /> }, 



  //Maps
  { path: "/maps-google", component: <GoogleMaps /> },

  //Pages
  { path: "/pages-starter", component: <Starter /> },
  { path: "/pages-profile", component: <SimplePage /> },
  { path: "/pages-profile-settings", component: <Settings /> },
  //Category
  { path: "/admin/add-category", component: <AddCategory /> },
  { path: "/view-category", component: <ViewCategory /> },
  { path: "/admin/all-category", component: <AllCategory /> },
  //Campaign
  { path: "/admin/add-campaign", component: <AddCampaign /> },
  { path: "/view-campaign", component: <ViewCampaign /> },
  { path: "/admin/all-campaign", component: <AllCampaign /> },
  //NewsLetters
  { path: "/add-news-letters", component: <AddNewsLetters/> },
  { path: "/view-news-letters", component: <ViewNewsLetters /> },
  { path: "/all-news-letters", component: <AllNewsLetters/> },
  //blogs
  { path: "/add-blogs-category", component: <AddBlogsCategory/> },
  { path: "/all-blogs-category", component: <AllBlogsCategory/> },
  { path: "/all-blogs", component: <AllBlogs /> },
  { path: "add-new-blog", component: <AddNewBlog/> },





  //report
  { path: "/campaign-reports", component: <CampaignReports/> },
  { path: "/newsletter-reports", component: <NewsletterReports/> },
  { path: "/subscriber-reports", component: <SubscriberReports /> },
  { path: "download-reports", component: <DownloadReports/> },

  
  //uses
  { path: "/admin/user-addadmin", component: <AddAdmin/> },
  { path: "/admin/user-alladmin", component: <AllAdmin/> },
  { path: "/admin/user-addcampaign-managers", component: <AddCampaignManagers/> },
  { path: "/admin/user-allcampaign-managers", component: <AllCampaignManagers/> },
  { path: "/admin/user-addeditors", component: <AddEditors /> },
  { path: "/admin/user-alleditors", component: <AllEditors /> },

  //Vendors
  { path: "/admin/review-vendor", component: <ReviewVendor/> },
  { path: "/admin/all-vendors", component: <AllVendors/> },
 

  { path: "/pages-privacy-policy", component: <PrivecyPolicy /> },
  { path: "/pages-terms-condition", component: <TermsCondition /> },


  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/admin/login",
    exact: true,
    component: <Navigate to="/admin/login" />,
  },
  { path: "*", component: <Navigate to="/admin/dashboard" /> },
  { path: "/vendor", component: <Navigate to="/vendor/login" /> },
  { path: "/vendor/dashboard", component: <VendorDashboard /> }, 

//**************************************************************** */
//vendor module
{ path: "/vendor/add-whitepapers", component: <VendorAddWhitepaper /> }, 
{ path: "/vendor/all-whitepapers", component: <VendorAllWhitepapers /> }, 

{ path: "/vendor/profile", component: <VendorProfile /> }, 

//**************************************************************** */
//user module
{ path: "/user/dashboard", component: <UserDashboard /> }, 
{ path: "/user/saved-whitepapers", component: <SavedWhitepapers /> }, 
{ path: "/user/news-letter", component: <NewsletterSubsciber /> }, 
{ path: "/user/category-subsciber", component: <CategorySubsciber /> }, 
{ path: "/user/profile", component: <UserProfile /> }, 


];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/admin/login", component: <Login /> },
  // { path: "/user/login", component: <GetUserToken /> },
  //vendor login
{ path: "/vendor/login", component: <VendorLogin /> }, 
  // { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  { path: "/auth-signup-cover", component: <CoverSignUp /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  

];

export { authProtectedRoutes, publicRoutes };