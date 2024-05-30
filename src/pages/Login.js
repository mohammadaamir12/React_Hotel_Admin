import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { LOGINAPI, VALIDATEAPI } from '../Config/config';


export default function Login({setAuth }) {
    const navigate = useNavigate();
    const [number, setNumber] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('')
    const [session,setSession]=useState('')
    const [userId,setUserId]=useState('')
    const [loading, setLoading] = useState(false); 

    const handleNumberChange = (e) => {
        setNumber(e.target.value);

    };
    const handleOtpChange = (e) => {
        setOtp(e.target.value)
    }


    const handleNumberSubmit = (e) => {
        e.preventDefault();
        if (number != '') {
            setLoading(true);
            axios.post(LOGINAPI, {
                phone_number: number,
            })
                .then(function (response) {
                    toast('Successfully Otp sent',response.data.challengeParameters.answer)
                    setSession(response.data.session)
                    setUserId(response.data.challengeParameters.USERNAME)
                    
                    console.log('Successfully Otp sent:', response.data);
                })
                .catch(function (error) {
                    console.error('error', error);
                    toast('Failed')
                }).finally(() => {
                    setLoading(false); 
                });
        }
        console.log('Number submitted:', number);

        setShowOtp(true);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(userId);
        console.log(session);
        console.log(otp);
        if (otp != '') {
            axios.post(VALIDATEAPI, {
              phone_number:number,
                session: session,
                challengeParameters: {
                    USERNAME:userId,
                    answer: otp
                },
            },{mode:'cors'})
                .then(function (response) {
                  setLoading(false);
                    toast('Success')
                    const token = response.data.idToken;
                    localStorage.setItem('token', token);
                    console.log('successful:', response.data);
                    
                    setAuth(true)
                    navigate('/')
                })
                .catch(function (error) {
                    console.error('error', error);
                    toast('Failed to verify')
                    setLoading(false);
                });
        }
    };

    return (
        <div style={styles.authFormContainer}>
          <form style={styles.authForm} onSubmit={showOtp ? handleOtpSubmit : handleNumberSubmit}>
            <div style={styles.authFormContent}>
              <h3 style={styles.authFormTitle}>Sign In</h3>
              <div style={styles.formGroup}>
                <label>Enter Your Number</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Enter number"
                  value={number}
                  onChange={handleNumberChange}
                />
              </div>
              {showOtp && (
                <div style={styles.formGroup}>
                  <label>OTP</label>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="Enter otp here"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                </div>
              )}
              <div style={styles.buttonContainer}>
                <button type="submit" style={styles.button}>
                  {showOtp ? 'Submit OTP' : 'Submit Number'}
                  {loading ? <div style={styles.loader}>Loading...</div> : null}
                </button>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      );
}
const styles = {
    authFormContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f7f7f7',
    },
    authForm: {
      background: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      boxSizing: 'border-box',
    },
    authFormContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    authFormTitle: {
      marginBottom: '1.5rem',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      marginTop: '0.5rem',
    },
    buttonContainer: {
      display: 'grid',
      gap: '0.5rem',
      marginTop: '1.5rem',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    loader: {
      marginLeft: '0.5rem',
    },
  };