import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import logotdt from './pic/logotdt.webp';
import logoavta from './Components/picgo.png';
import Cookies from 'js-cookie';
import usavtar from './pic/usav.png';

const RegisterPage = lazy(() => import('./Components/RegisterAccount'));
const Dashboard = lazy(() => import('./Components/Dashboard'));
const ThreeScene = lazy(() => import('./Components/ThreeScene'));
const GaugeExample = lazy(() => import('./Components/Gauge'));
const SpeedInputPage = lazy(() => import('./Components/Speed'));
const SmallFrame = lazy(() => import('./Components/ThreeJSComponent'));
const ChartMongo = lazy(() => import('./Components/Chart'));
const ListAccount = lazy(() => import('./Components/ListAccount'));
const LoginPage = lazy(() => import('./Components/Login'));


const App = () => {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [currentPage1, setCurrentPage1] = useState('Login');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state isLoggedIn

  const handleLogout = () => {
    document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
  };

  const session_username = Cookies.get('session_username');
  const session_firstname = Cookies.get('session_firstname');
  const session_lastname = Cookies.get('session_lastname');
  const session_birthdate = Cookies.get('session_birthdate');
  const session_date = Cookies.get('session_date');
  const session_phone = Cookies.get('session_phone');
  const session_email = Cookies.get('session_email');
  const session_password = Cookies.get('session_password');

  useEffect(() => {
    const isLoggedInCookie = document.cookie.split(';').some((cookie) => cookie.trim().startsWith('isLoggedIn='));
    if (isLoggedInCookie) {
      setIsLoggedIn(true);
    }
    const body = document.querySelector('body');
    const modeToggle = body.querySelector('.mode-toggle');
    const sidebar = body.querySelector('nav');
    const sidebarToggle = body.querySelector('.sidebar-toggle');

    let getMode = localStorage.getItem('mode');
    if (getMode && getMode === 'dark') {
      body.classList.add('dark');
    }

    let getStatus = localStorage.getItem('status');
    if (getStatus && getStatus === 'close') {
      sidebar.classList.add('close');
    }

    const handleModeToggle = () => {
      body.classList.toggle('dark');
      if (body.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
      } else {
        localStorage.setItem('mode', 'light');
      }
    };

    const handleSidebarToggle = () => {
      sidebar.classList.toggle('close');
      if (sidebar.classList.contains('close')) {
        localStorage.setItem('status', 'close');
      } else {
        localStorage.setItem('status', 'open');
      }
    };

    modeToggle.addEventListener('click', handleModeToggle);
    sidebarToggle.addEventListener('click', handleSidebarToggle);

    return () => {
      modeToggle.removeEventListener('click', handleModeToggle);
      sidebarToggle.removeEventListener('click', handleSidebarToggle);
    };
  }, []); // Empty dependency array to run the effect only once

  // Retrieve the SessionUser from cookies

  const renderUI = () => {

    if (!isLoggedIn) {
      switch (currentPage1) {
        case 'LoginPage':
          return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
        case 'register':
          return <RegisterPage />;
      }
    } else {
      switch (currentPage) {
        case 'Dashboard':
          return <Dashboard
            session_username={session_username}
            session_firstname={session_firstname}
            session_lastname={session_lastname}
            session_birthdate={session_birthdate}
            session_date={session_date}
            session_phone={session_phone}
            session_email={session_email}
            session_password={session_password} />;
        case 'speedtest':
          return <SpeedInputPage />;
        case 'ChartMongo':
          return <ChartMongo />;
        case 'ListAccount':
          return <ListAccount />;
        case 'ThreeJS':
          return <SmallFrame />;
        case 'threeScene':
          return (
            <div>
              <div className='title'>
                <i className='uil uil-tachometer-fast-alt'></i>
                <span className='text'>Gauge</span>
              </div>
              <div className='bg3'>
                <GaugeExample />
              </div>
              <div className='title'>
                <i className='uil uil-tachometer-fast-alt'></i>
                <span className='text'>ThreeScene</span>
              </div>
              <div>
                <ThreeScene />
              </div>
            </div>
          );
        default:
          return null;
      }
    }
  };

  return (
    <div> <link rel='stylesheet' href='https://unicons.iconscout.com/release/v4.0.0/css/line.css' />
      <nav>
        {!isLoggedIn ? (
          <div>
            <div className='logo-name'>
              <div className='logo-image1'>
                <img src={logoavta} alt='Logo' />
              </div>
              <span className='logo_name'>Motion System</span>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* <div className='logo-image22'>
                <img src={usavtar} alt='Logo' />
              </div> */}
            </div>
            <a>
              <span className='link-name'>{session_firstname} {session_lastname}</span>
            </a>
            <div style={{ textAlign: 'center' }}>
              <h2 className='online-text'>Online</h2>
            </div>
          </div>
        )}
        <div className='menu-items'>
          {!isLoggedIn ? (
            <ul className='nav-links'>
              <li>
                <a onClick={() => setCurrentPage1('LoginPage')}>
                  <i class="uil uil-estate"></i>
                  <span className="link-name">Login</span>
                </a>
              </li>
              <li>
                <a onClick={() => setCurrentPage1('register')}>
                  <i class="uil uil-user-plus"></i>
                  <span className="link-name">Register</span>
                </a>
              </li>
            </ul>
          ) : (<ul className='nav-links'>
            <li>
              <a onClick={() => setCurrentPage('Dashboard')}>
                <i class="uil uil-estate"></i>
                <span className="link-name">Dashboard</span>
              </a>
            </li>
            <li>
              <a onClick={() => setCurrentPage('ListAccount')}>
                <i class="uil uil-users-alt"></i>
                <span className="link-name">Users</span>
              </a>
            </li>
            <li>
              <a onClick={() => setCurrentPage('threeScene')}>
                <i class="uil uil-cube"></i>
                <span className="link-name">Three Scene</span>
              </a>
            </li>
            <li>
              <a onClick={() => setCurrentPage('speedtest')}>
                <i class="uil uil-tachometer-fast-alt"></i>
                <span className="link-name">Speed Test</span>
              </a>
            </li>
            <li>
              <a onClick={() => setCurrentPage('ThreeJS')}>
                <i class="uil uil-box"></i>
                <span className="link-name">Three JS</span>
              </a>
            </li>
            <li>
              <a onClick={() => setCurrentPage('ChartMongo')}>
                <i class="uil uil-chart-line"></i>
                <span className="link-name">ChartMongo</span>
              </a>
            </li>
          </ul>)}


          <ul className='logout-mode'>
            {isLoggedIn ? (
              <li>
                <a onClick={handleLogout}>
                  <i className='uil uil-signout'></i>
                  <span className='link-name'>Logout</span>
                </a>
              </li>
            ) : null}

            <li className='mode'>
              <a>
                <i className='uil uil-moon'></i>
                <span className='link-name'>Mode Light</span>
              </a>

              <div className='mode-toggle'>
                <span className='switch'></span>
              </div>
            </li>
          </ul>


        </div>
      </nav>

      <section className='dashboard'>
        <div className='top'>
          <i className='uil uil-bars sidebar-toggle'></i>
          <div className='logo-image11'>
            <img src={logotdt} alt='Logo AVT' style={{ width: '70px', borderRadius: 0 }} />
          </div>
        </div>

        <div className='dash-content'>
          <div className='overview'>
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                {renderUI()}
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;