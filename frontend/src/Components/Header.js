import { MDBCollapse, MDBContainer, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setLogOut } from '../Redux/features/authSlice'

const Header = () => {
    const [show, setShow] = useState(false)
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch()
    const hanleLogOut = () => {
        dispatch(setLogOut())
    }
    return (
        <MDBNavbar fixed='top' expand='lg' style={{ backgroundColor: "#f0e6ea" }} >
            <MDBContainer>
                <MDBNavbarBrand style={{ color: '#606080', fontWeight: '600', fontSize: '22px' }}>
                    <Link to={'/'} style={{ color: '#606080' }}>TouroPedia</Link>
                </MDBNavbarBrand>
                <MDBNavbarToggler type='button' aria-expanded="false" aria-label='Toogle navigation' style={{ color: '#606080' }} onClick={() => { setShow(!show) }}>
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                        {user?.result?._id && (<h5 style={{ marginRight: '10px', marginTop: '17px' }}>Logged in as :{user?.result?.name}</h5>)}
                        <MDBNavbarItem>
                            <MDBNavbarLink>
                                <Link to={'/'} className='header-text'>Home</Link>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?._id && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink>
                                        <Link to={'/addTour'} className='header-text'>Add Tour</Link>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink>
                                        <Link to={'/dashboard'} className='header-text'>Dashboard</Link>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                        {user?.result?._id ?
                            (<MDBNavbarItem>
                                <MDBNavbarLink>
                                    <Link to={'/login'} className='header-text' onClick={hanleLogOut}>Logout</Link>
                                </MDBNavbarLink>
                            </MDBNavbarItem>) : (
                                <MDBNavbarItem>
                                    <MDBNavbarLink>
                                        <Link to={'/login'} className='header-text'>Login</Link>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            )
                        }
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>

        </MDBNavbar>
    )
}

export default Header
