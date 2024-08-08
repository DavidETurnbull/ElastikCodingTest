import { CInputGroup } from '@coreui/react';
import { CFormInput } from '@coreui/react';
import { CInputGroupText } from '@coreui/react';
import { CContainer } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilAt, cilLockUnlocked } from '@coreui/icons';
import { CButton } from '@coreui/react';

export default function Login(){
    return (
        <CContainer className="login-container">
            <h2 className="text-center">Login</h2>
            <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon1"><CIcon icon={cilAt} title="Email" size="sm" /></CInputGroupText>
                <CFormInput placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"/>
            </CInputGroup>

            <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon1"><CIcon icon={cilLockUnlocked} title="Password" size="sm" /></CInputGroupText>
                <CFormInput type="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
            </CInputGroup>
            
            <CInputGroup className="mb-3 justify-content-end">
                <CButton as="input" type="submit" color="primary" value="Login" />
            </CInputGroup>
        </CContainer>
    );
}