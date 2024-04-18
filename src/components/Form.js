import './form.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { InputLabel, MenuItem, Select } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';


export default function Form() {

    const [date, setDate] = useState(new Date());
    const [fullName, setFullName] = useState('');
    const [fullNameError, setNameError] = useState('');
    const [contact, setContact] = useState('');
    const [contactError, setContactError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [birthdateError, setBirthdateError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');



    const handleFullName = (e) => {
        const item = e.target.value;
        const nameRegex = /^([a-zA-Z]+(?:\s+[a-zA-Z]+)*)$/;

        if (!item.trim()) {
            setNameError('Full name cannot be empty. Please try later.');
        } else if (!nameRegex.test(item) || item.length < 3) {
            setNameError('Invalid full name. Please enter valid name.');
        } else {
            setNameError('');
        }

        setFullName(item);
    };

    const handleContact = (e) => {
        let contValue = e.target.value;

        const numericValue = contValue.replace(/\D/g, "");

        contValue = numericValue.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');

        setContact(contValue);

        const contactPattern = /^\(\d{3}\) \d{3}-\d{4}$/;

        if (!contValue.trim()) {
            setContactError('Contact cannot be empty.');
        } else if (!contactPattern.test(contValue)) {
            setContactError('Sorry, contact is invalid. Please enter a valid contact number.');
        } else {
            setContactError('');
        }
    };

    const handleEmail = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        // const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regEx = /^[a-zA-Z0-9\.]{3,10}@[a-zA-Z]{2,10}\.[a-zA-Z]{2,5}$/;

        if (!emailValue.trim()) {
            setEmailError('Email cannot be empty.');
        }
        else if (!regEx.test(String(emailValue).toLowerCase())) {
            setEmailError('Sorry, this email address is not valid . Please try again.');
        }

        else {
            setEmailError('');
        }
    };

    const handlePassword = (e) => {
        const passValue = e.target.value;
        setPassword(passValue);

        const capitalLetterRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;
        const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

        if (!passValue.trim()) {
            setPasswordError('Password cannot be empty.');
        } else if (passValue.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
        } else if (!capitalLetterRegex.test(passValue)) {
            setPasswordError('Password must contain at least one capital letter.');
        } else if (!numberRegex.test(passValue)) {
            setPasswordError('Password must contain at least one number.');
        } else if (!specialCharacterRegex.test(passValue)) {
            setPasswordError('Password must contain at least one special character.');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPassword = (e, arg) => {
        const confPassValue = e.target.value;
        setConfirmPassword(confPassValue);

        if (!confPassValue.trim()) {
            setConfirmPasswordError('Confirm password cannot be empty.');
        }
        else if (password !== confPassValue) {
            setConfirmPasswordError('Password Didn"t Match')
        }
        else {
            setConfirmPasswordError('');
        }
    }

    const validateDate = (day, month, year) => {
        if (!day || !month || !year) {
            return false;
        }

        const selectedDate = new Date(`${month} ${day}, ${year}`);
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            return false;
        }

        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        const daysInMonth = new Date(year, month, 0).getDate();
        if (month === '2' && day > 29) {
            return false;
        } else if (month === '2' && day === 29 && !isLeapYear) {
            return false;
        } else if (day < 1 || day > daysInMonth) {
            return false;
        }

        return true;
    };

    const handleDayChange = (e) => {
        const selectedDay = e.target.value;
        setDay(selectedDay);

        const isValidDate = validateDate(selectedDay, month, year);
        if (!isValidDate) {
            setBirthdateError('Please select a valid birthdate.');
        } else {
            setBirthdateError('');
        }
    };

    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;
        setMonth(selectedMonth);

        const isValidDate = validateDate(day, selectedMonth, year);
        if (!isValidDate) {
            setBirthdateError('Please select a valid birthdate.');
        } else {
            setBirthdateError('');
        }
    };

    const handleYearChange = (e) => {
        const selectedYear = e.target.value;
        setYear(selectedYear);

        const isValidDate = validateDate(day, month, selectedYear);
        if (!isValidDate) {
            setBirthdateError('Please select a valid birthdate.');
        } else {
            setBirthdateError('');
        }
    };



    const handleSubmit = async () => {

        const birthDate = new Date(`${month} ${day}, ${year}`);
        let values = {
            fullName,
            contact: contact.replace(/\D/g, ''),
            email,
            birthDate,
            password
        }
        console.log(!fullNameError && !contactError && !email && birthdateError && !passwordError);

        if ((fullName && contact && email && day && month && year && password) && (!fullNameError && !contactError && !emailError && !birthdateError && !passwordError && !confirmPasswordError)) {
            try {
                console.log('Request Sent', values);
                let res = await axios.post('http://localhost:3001/api/auth/signup', values);
                toast.success("User account successfully created.", {
                    position: "top-right",
                    theme: "colored",
                    hideProgressBar: true,
                    closeOnClick: true,
                });
                // clearAllValues();
            }
            catch {
                toast.error("Sorry For Inconvenience", {
                position: "top-right",
                theme: "colored",
                hideProgressBar: true,
                closeOnClick: false
            });
            }
        } else {
            console.log('Req Not Sent');
            // toast.error("Please Check all required fields.", {
            //     position: "top-right",
            //     theme: "colored",
            //     hideProgressBar: true,
            //     closeOnClick: false
            // });

            const errors = [fullNameError, contactError, emailError, birthdateError, passwordError, confirmPasswordError];
            const fields = [fullName, contact, email, day, month, year, password, confirmPassword];
            const fieldNames = ['FullName', 'Contact', 'Email', 'Birth Day', 'Birth Month', 'Birth Year', 'Password', 'Confirm Password'];
            errors.forEach((v, i, arr) => {
                if (v) {
                    toast.error(v, {
                        position: "top-right",
                        theme: "colored",
                        hideProgressBar: true,
                        closeOnClick: false
                    });
                }
            });
            fields.forEach((v, i, arr) => {
                if (!v) {
                    toast.error(`${fieldNames[i]} Cannot be Empty`, {
                        position: "top-right",
                        theme: "colored",
                        hideProgressBar: true,
                        closeOnClick: false
                    });
                }
            });

        }
    }

    const handleCancel = () => {

        toast.error("Form cancelled successfully.", {
            position: "top-right",
            theme: "colored",
            hideProgressBar: true,
            closeOnClick: false,
            bodyClassName: "text-sm"
        });

        clearAllValues();
    }

    const clearAllValues = () => {
        setFullName('');
        setNameError('');
        setContact('');
        setContactError('');
        setEmail('');
        setEmailError('');
        setPassword('');
        setPasswordError('');
        setConfirmPassword('');
        setConfirmPasswordError('');
        setDay('');
        setMonth('');
        setYear('');
        setBirthdateError('');
    }


    return (
        <div className='formComponent'>
            {[<ToastContainer />]}
            <p className='formHeading'>Create User Account</p>
            <div className=''>
                <div className='form'>
                    <div className='inputLabel'>
                        <label className='label'>Full Name</label>
                        <TextField
                            id="outlined-basic"
                            label="Full Name"
                            variant="outlined"
                            size="small"
                            type="text"
                            value={fullName}
                            onChange={handleFullName}
                            error={fullNameError}
                            helperText={fullNameError ? fullNameError : ''}
                            className='inputMuiStyles'
                            sx={{
                                // height: '135px',
                                // width: '300px',
                                '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'red',
                                },
                            }}
                        />
                    </div>
                    <div className='inputLabel'>
                        <label className='label'>Contact Number</label>
                        <TextField
                            id="outlined-basic"
                            label="Contact Number"
                            variant="outlined"
                            size="small"
                            type="text"
                            value={contact}
                            onChange={handleContact}
                            className='inputMuiStyles'
                            error={contactError}
                            helperText={contactError ? contactError : ''}
                            sx={{
                                // height: '135px',
                                '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'red',
                                },
                            }}
                        />
                    </div>

                    <div className='inputLabel formMainDiv'>
                        <label className='label'>Birth Date</label>
                        <div className='formDiv'>
                            <Select
                                id="outlined-basic"
                                label="Day"
                                labelId="day-label"
                                variant="outlined"
                                size="small"
                                // select
                                // autoWidth
                                value={day}
                                onChange={handleDayChange}
                                error={birthdateError}
                                // helperText={birthdateError ? birthdateError : ''}
                                className='selectStyles'
                                // style={{ marginRight: '10px', width: '93px' }}
                                sx={{
                                    // height: '135px',
                                    width: '300px',
                                    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'red',
                                    },
                                }}
                            >
                                {Array.from({ length: date.getFullYear() == year ? date.getDate() : 31 }, (_, i) => i + 1).map(day => (
                                    <MenuItem key={day} value={day}>{day}</MenuItem>
                                ))}
                            </Select>

                            <Select
                                id="outlined-basic"
                                label="Month"
                                variant="outlined"
                                size="small"
                                select
                                value={month}
                                onChange={handleMonthChange}
                                error={birthdateError}
                                // helperText={birthdateError ? birthdateError : ''}
                                className='selectStyles'
                                // style={{ marginRight: '10px', width: '93px' }}
                                sx={{
                                    // height: '135px',
                                    width: '300px',
                                    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'red',
                                    },
                                }}
                            >
                                {Array.from({ length: date.getFullYear() == year ? (date.getMonth() + 1) : 12 }, (_, i) => i + 1).map(month => (
                                    <MenuItem key={month} value={month}>{month}</MenuItem>
                                ))}
                            </Select>

                            <Select
                                id="outlined-basic"
                                label="Year"
                                variant="outlined"
                                size="small"
                                select
                                value={year}
                                onChange={handleYearChange}
                                error={birthdateError}
                                // helperText={birthdateError ? birthdateError : ''}
                                className='selectStyles'
                                // style={{ marginRight: '10px', width: '93px' }}
                                sx={{
                                    // height: '135px',
                                    width: '300px',
                                    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'red',
                                    },
                                }}
                            >
                                {Array.from({ length: 105 }, (_, i) => 2024 - i).map(year => (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        {birthdateError && <span className='birthDateError'>{birthdateError}</span>}
                    </div>
                    <div className='inputLabel'>
                        <label className='label'>Email</label>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            size="small"
                            type="email"
                            value={email}
                            onChange={handleEmail}
                            error={emailError}
                            helperText={emailError ? emailError : ''}
                            className='inputMuiStyles'
                            sx={{
                                // height: '135px',
                                // width: '300px',
                                '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'red',
                                },
                            }}
                        />
                    </div>

                    <div className='inputLabel'>
                        <label className='label'>Password</label>
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            size="small"
                            type="password"
                            value={password}
                            onChange={handlePassword}
                            error={passwordError}
                            helperText={passwordError ? passwordError : ''}
                            className='inputMuiStyles'
                            sx={{
                                // height: '135px',
                                // width: '300px',
                                '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'red',
                                },
                            }}
                        />
                    </div>
                    <div className='inputLabel'>
                        <label className='label'>Confirm Password</label>
                        <TextField
                            id="outlined-basic"
                            label="Confirm Password"
                            variant="outlined"
                            size="small"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            error={confirmPasswordError}
                            helperText={confirmPasswordError ? confirmPasswordError : ''}
                            className='inputMuiStyles'
                            sx={{
                                // height: '135px',
                                // width: '300px',
                                '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'red',
                                },
                            }}
                        />
                    </div>
                    {/* <button className='submitButton' type='submit' disabled={isSubmitting}>Submit</button> */}
                </div>
                <div className='formButtons'>
                    <button className='cancelButton' onClick={handleCancel}>Cancel</button>
                    <button className='submitButton' onClick={handleSubmit}>Submit</button>
                </div>

            </div>
        </div>
    )
}