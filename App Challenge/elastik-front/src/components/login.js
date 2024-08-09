import { CInputGroup } from '@coreui/react';
import { CFormInput } from '@coreui/react';
import { CInputGroupText } from '@coreui/react';
import { CContainer } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilAt, cilLockUnlocked } from '@coreui/icons';
import { CButton } from '@coreui/react';
import { CTabList, CTab, CTabs, CTabContent, CTabPanel } from '@coreui/react';
import { useState } from 'react';

export default function Login(){
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    
    async function Signup() {
        window.location = '/dashboard';
    }

    return (
        <CContainer className="login-container">
            <CTabs activeItemKey="login">
                <CTabList variant="tabs" layout="fill">
                    <CTab itemKey="signup">Sign Up</CTab>
                    <CTab itemKey="login">Login</CTab>
                    <CTab itemKey="forgot">Forgot Password</CTab>
                </CTabList>
                <CTabContent>


                    <CTabPanel className="p-3" itemKey="signup">
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="basic-addon1"><CIcon icon={cilAt} title="Email" size="sm" /></CInputGroupText>
                            <CFormInput placeholder="Email" aria-label="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} aria-describedby="basic-addon1"/>
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                            <CInputGroupText id="basic-addon1"><CIcon icon={cilLockUnlocked} title="Password" size="sm" /></CInputGroupText>
                            <CFormInput type="password" placeholder="Password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)}  aria-label="setSignupPassword" aria-describedby="basic-addon1"/>
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                            <CInputGroupText id="basic-addon1"><CIcon icon={cilLockUnlocked} title="Confirm Password" size="sm" /></CInputGroupText>
                            <CFormInput type="password" placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="basic-addon1"/>
                        </CInputGroup>
                        
                        <CInputGroup className="mb-3 justify-content-end">
                            <CButton as="input" type="submit" color="primary" onClick={Signup} value="Sign up" />
                        </CInputGroup>
                    </CTabPanel>


                    <CTabPanel className="p-3" itemKey="login">
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="basic-addon1"><CIcon icon={cilAt} title="Email" size="sm" /></CInputGroupText>
                            <CFormInput placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"/>
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                            <CInputGroupText id="basic-addon1"><CIcon icon={cilLockUnlocked} title="Password" size="sm" /></CInputGroupText>
                            <CFormInput type="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
                        </CInputGroup>
                        
                        <CInputGroup className="mb-3 justify-content-end">
                            <CButton as="input" type="submit" color="primary" onClick={Signup} value="Login" />
                        </CInputGroup>
                    </CTabPanel>


                    <CTabPanel className="p-3" itemKey="forgot">
                        <CInputGroup className="mb-3">
                            <CInputGroupText id="basic-addon1"><CIcon icon={cilAt} title="Email" size="sm" /></CInputGroupText>
                            <CFormInput placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"/>
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                            <CInputGroupText id="basic-addon1"><CIcon icon={cilLockUnlocked} title="Password" size="sm" /></CInputGroupText>
                            <CFormInput type="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                            <CInputGroupText id="basic-addon1"><CIcon icon={cilLockUnlocked} title="Confirm Password" size="sm" /></CInputGroupText>
                            <CFormInput type="password" placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="basic-addon1"/>
                        </CInputGroup>
                        
                        <CInputGroup className="mb-3 justify-content-end">
                            <CButton as="input" type="submit" color="primary" onClick={Signup} value="Reset" />
                        </CInputGroup>
                        
                    </CTabPanel>


                </CTabContent>
            </CTabs>
        </CContainer>
    );
}