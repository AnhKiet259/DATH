import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./Login.css";
const LoginPage = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const loginData = {
            username: username,
            password: password,
        };

        console.log('Thông tin đăng nhập:', loginData);
        axios
            .post('https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/LOGINADM', loginData)
            .then(response => {
                // Kiểm tra phản hồi từ server
                if (response.data.body === true) {
                    // Đăng nhập thành công, cập nhật trạng thái isLoggedIn
                    setIsLoggedIn(true);
                    console.log('Đăng nhập thành công');
                    // Set the session identifier in a cookie
                    document.cookie = 'isLoggedIn=true; path=/;';
                    setIsLoggedIn(true);
                    Cookies.set('session_username', username);
                    Cookies.set('session_firstname', response.data.firstname);
                    Cookies.set('session_lastname', response.data.lastname);
                    Cookies.set('session_email', response.data.email);
                    Cookies.set('session_birthdate', response.data.birthdate);
                    Cookies.set('session_date', response.data.date);
                    Cookies.set('session_phone', response.data.phone);
                    Cookies.set('session_password', response.data.password);
                } else {
                    // Đăng nhập không thành công, xử lý thông báo lỗi hoặc thực hiện các hành động khác
                    console.log('Đăng nhập không thành công');
                }
            })
            .catch(error => {
                // Xử lý lỗi khi gửi yêu cầu đăng nhập
                console.error('Đăng nhập thất bại:', error);
            });
    };

    return (
        <form class="login-formz" onSubmit={handleLogin}>
            <h1 style={{ textAlign: 'center' }}>Login</h1>
            <div class="form-groupz">
                <label >Username</label>
                <input className='textz' id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            </div>
            <div class="form-groupz">
                <label >Mật khẩu</label>
                <input className='textz' type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" />
            </div>
            <button className='buttonz' type="submit">Đăng nhập</button>
        </form>
    );
};

export default LoginPage;