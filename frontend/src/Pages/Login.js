import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBIcon, MDBInput, MDBSpinner, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../Redux/features/authSlice'
import { toast } from 'react-toastify'


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
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to={"/register"}><p>Don't have an Account ? Sign Up</p></Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}

export default Login