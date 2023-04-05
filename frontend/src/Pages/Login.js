import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBIcon, MDBInput, MDBSpinner, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { googlSignIn, login } from '../Redux/features/authSlice'
import { toast } from 'react-toastify'
import GoogleLogin from 'react-google-login'


const initalState = {
    email: '',
    password: ''
}
const Login = () => {
    const [formValue, setFormValue] = useState(initalState)
    const { loading, error } = useSelector((state) => ({ ...state.auth }))
    const { email, password } = formValue
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        error && toast.error(error)
    }, [error])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login({ formValue, navigate, toast }));
        }
    }
    const googleSuccess = (res) => {
        const email = res?.profileObj?.email
        const name = res?.profileObj?.name
        const token = res?.tokenId
        const googleId = res?.googleId
        const result = { email, name, token, googleId }
        dispatch(googlSignIn({ result, navigate, toast }))
    }
    const googleFailure = (error) => {
        toast.error(error)
    }
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value })
    }
    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>
            <MDBCard>
                <MDBIcon fas icon='user-circle' className='fa-2x' />
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                        <MDBValidationItem feedback='Please choose a Email.' invalid className='col-md-12'>
                            <MDBInput label="Email" type={"email"} value={email} name="email" onChange={onInputChange} required />
                        </MDBValidationItem>
                        <MDBValidationItem feedback='Please choose a Passsword.' invalid className="col-md-12">
                            <MDBInput label="Password" type={"password"} value={password} name="password" onChange={onInputChange} required />
                        </MDBValidationItem>
                        <div className='col-12'>
                            <MDBBtn style={{ width: "100%" }} className="mt-2">
                                {loading && (<MDBSpinner
                                    size='sm'
                                    role="status"
                                    tag={'span'}
                                    className="me-2"
                                />)}
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation><br />
                    <GoogleLogin clientId='500852971355-6upomadqd80rkj5hdbqf8j7pl07q8kpq.apps.googleusercontent.com' render={(renderProps) => (
                        <MDBBtn style={{ width: "100%" }} color='danger' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <MDBIcon className='me-2' fab icon='google'>Google Sign In</MDBIcon>
                        </MDBBtn>
                    )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={false}>

                    </GoogleLogin>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to={"/register"}><p>Don't have an Account ? Sign Up</p></Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}

export default Login