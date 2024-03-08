import React, { useState } from "react";

import "./RegisterAccount.css";
import logore from './picgo.png';
import axios from 'axios';


const isEmptyValue = (value) => {
    return !value || value.trim().length < 1;
};

const isEmailValid = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export default function RegisterPage() {
    const [formValue, setFormValue] = useState({});
    const [formError, setFormError] = useState({});

    const validateForm = () => {
        const error = {};

        if (isEmptyValue(formValue.username) || isEmptyValue(formValue.firstname)
            || isEmptyValue(formValue.lastname) || isEmptyValue(formValue.birthdate)
            || isEmptyValue(formValue.email) || isEmptyValue(formValue.phone)
            || isEmptyValue(formValue.password)) {
            error["password"] = "Error: Please Fill All Information";
        }
        setFormError(error);
        return Object.keys(error).length === 0;
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setFormValue({
            ...formValue,
            [name]: value,
            date: new Date().toISOString()
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        if (validateForm()) {
            try {

                const userData = {
                    username: formValue.username,
                    firstname: formValue.firstname,
                    lastname: formValue.lastname,
                    birthdate: formValue.birthdate,
                    email: formValue.email,
                    phone: formValue.phone,
                    password: formValue.password,
                    date: formattedDate,
                };
                const response = await axios.post('https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/Log_in', userData);

                console.log('Đã gửi dữ liệu thành công:', response.data);
                // Xóa thông tin trong form sau khi gửi thành công
                setFormValue({
                    username: '',
                    firstname: '',
                    lastname: '',
                    birthdate: '',
                    email: '',
                    phone: '',
                    password: '',
                });
                // Thực hiện các xử lý tiếp theo, ví dụ: chuyển hướng, hiển thị thông báo thành công, vv.
            } catch (error) {
                console.error('Lỗi khi gửi dữ liệu:', error);
                // Xử lý lỗi và hiển thị thông báo lỗi
            }
        }
    };


    console.log(formError);

    return (

        <div className="limiter">
            <form class="login-formz" onSubmit={handleSubmit}>
                <h1 style={{ textAlign: 'center' }}>Register</h1>
                <div class="form-groupz">
                    <label>Username</label>
                    <input className="textz" id="username" name="username"
                        placeholder="Username" value={formValue.username} onChange={handleChange} />
                </div>
                <div class="form-groupz">
                    <label>Name</label>
                    <div style={{ display: 'flex' }}>
                        <input
                            className="textz"
                            id="firstname"
                            name="firstname"
                            placeholder="First Name"
                            value={formValue.firstname}
                            onChange={handleChange}
                        />
                        <input
                            className="textz"
                            id="lastname"
                            name="lastname"
                            placeholder="Last Name"
                            style={{ marginLeft: '10px' }}
                            value={formValue.lastname}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div class="form-groupz">
                    <label>DateOfBirth</label>
                    <input className="textz" id="birthdate" name="birthdate"
                        placeholder="DateOfBirth" value={formValue.birthdate} onChange={handleChange} />
                </div>
                <div class="form-groupz">
                    <label>Email</label>
                    <input className="textz" id="email" name="email"
                        placeholder="Email" value={formValue.email} onChange={handleChange} />
                </div>
                <div class="form-groupz">
                    <label>Phone</label>
                    <input className="textz" id="phone" name="phone"
                        placeholder="Phone" value={formValue.phone} onChange={handleChange} />
                </div>
                <div class="form-groupz">
                    <label>Password</label>
                    <input className="textz" type="password" id="password" name="password"
                        placeholder="Password" value={formValue.password} onChange={handleChange} />
                </div>
                {formError.password && (
                    <div className="error-feedback">{formError.password}</div>
                )}
                <button className='buttonz' type="submit">Đăng Kí</button>
            </form>
        </div>
    );
}