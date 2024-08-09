import { CContainer, CTable } from '@coreui/react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import { useState, useEffect } from 'react';
import { CButton, CInputGroup, CInputGroupText, CFormInput, CAlert } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilAt, cilAddressBook, cilCalendar, cilClipboard } from '@coreui/icons';

export default function Dashboard() {
    //controls visibilty of the "add student" modal
    const [createVisible, setCreateVisible] = useState(false);

    //variables of the "add student" form
    const [createId, setCreateId] = useState('');
    const [createFName, setCreateFName] = useState('');
    const [createLName, setCreateLName] = useState('');
    const [createEmail, setCreateEmail] = useState('');
    const [createDob, setCreateDob] = useState('');

    //error for the "add student" form
    const [createError, setCreateError] = useState('');

    //students to display
    const [items, setItems] = useState(0);

    //load students from the api
    async function loadStudents() {
        try {
            let response = await fetch('https://7w8byan8ag.execute-api.us-east-2.amazonaws.com/students', {
                method: "GET",
            });
            let responseJson = await response.json();
            //add delete button
            for(var a=0 ; a<responseJson.length ; a++){
                responseJson[a].delete = <CButton color="danger"
                    onClick = {deleteStudent}
                    value = {responseJson[a].id}>
                    Delete
                </CButton>
            };
            setItems(responseJson);
        } catch(error) {
            console.error(error);
        }
    }

    //save new student and refresh data
    async function saveNew() {
        try {
            //validate form inputs
            var error = [];
            if(createId == ""){
                error.push("Id missing");
            }
            if(createFName == "") {
                error.push("First Name missing");
            }
            if(createLName == "") {
                error.push("Last Name missing");
            }
            if(createEmail == "") {
                error.push("email missing");
            }else if(!createEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                //above regex found here: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
                error.push("Invalid email");
            }
            if(createDob == "") {
                error.push("Date of Birth missing");
            }

            if(error.length > 0) {
                setCreateError(error.join("<br />"));
            } else {
                //inputs are safe, send to API
                let response = await fetch('https://7w8byan8ag.execute-api.us-east-2.amazonaws.com/students', {
                    method: "PUT",
                    body: JSON.stringify({"id":createId, "fName":createFName, "lName":createLName, "email":createEmail, "dob":createDob}),
                });
                let responseJson = await response.json();
                await loadStudents();
                setCreateVisible(false);
                setCreateId("");
                setCreateFName("");
                setCreateLName("");
                setCreateEmail("");
                setCreateDob("");
            }
        } catch(error) {
            console.error(error);
        }
    }

    //display "Add Student" modal
    function displayCreate() {
        setCreateVisible(!createVisible);
    }

    //delete student from api and refresh data
    async function deleteStudent(e) {
        try {
            let response = await fetch('https://7w8byan8ag.execute-api.us-east-2.amazonaws.com/students/' + e.target.value, {
                method: "DELETE",
            });
            let responseJson = await response.json();
            await loadStudents();
        } catch(error) {
            console.error(error);
        }
    }

    //columns for student data
    const columns = [
        {
          key: 'id',
          label: 'Id',
          _props: { scope: 'col' },
        },
        {
          key: 'fName',
          label: "First Name",
          _props: { scope: 'col' },
        },
        {
            key: 'lName',
            label: "Last Name",
          _props: { scope: 'col' },
        },
        {
            key: 'email',
            label: "email",
          _props: { scope: 'col' },
        },
        {
          key: 'dob',
          label: 'Date of Birth',
          _props: { scope: 'col' },
        },
        {
            key: 'delete',
            label: 'Delete',
            _props: { scope: 'col' },
          },
    ];
    
    //load students on inital page load
    useEffect(() => {
        loadStudents();
    }, []);

    //ideally the Date of Birth should be a Date Picker component from CoreUI, but that's a paid component
    return (
        <CContainer className="container-lg dashboard-container">
            <CButton as="input" type="submit" color="primary" className="mb-3 float-end" onClick={displayCreate} value="Add" />

            <CTable columns={columns} items={items} />

            <CModal
                visible={createVisible}
                onClose={() => setCreateVisible(false)}
                aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Add Student</CModalTitle>
            </CModalHeader>
            <CModalBody>

                <CAlert color="danger" visible={createError.length > 0}>
                    <p dangerouslySetInnerHTML={{__html: createError}}></p>
                </CAlert>

                <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1"><CIcon icon={cilAddressBook} title="Id" size="sm" /></CInputGroupText>
                    <CFormInput placeholder="Email" aria-label="Email" value={createId} onChange={e => setCreateId(e.target.value)} aria-describedby="basic-addon1"/>
                </CInputGroup>
                <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1"><CIcon icon={cilClipboard} title="First Name" size="sm" /></CInputGroupText>
                    <CFormInput placeholder="First Name" aria-label="First Name" value={createFName} onChange={e => setCreateFName(e.target.value)} aria-describedby="basic-addon1"/>
                </CInputGroup>
                <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1"><CIcon icon={cilClipboard} title="Last Name" size="sm" /></CInputGroupText>
                    <CFormInput placeholder="Last Name" aria-label="Last Name" value={createLName} onChange={e => setCreateLName(e.target.value)} aria-describedby="basic-addon1"/>
                </CInputGroup>
                <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1"><CIcon icon={cilAt} title="Email" size="sm" /></CInputGroupText>
                    <CFormInput placeholder="Email" aria-label="Email" value={createEmail} onChange={e => setCreateEmail(e.target.value)} aria-describedby="basic-addon1"/>
                </CInputGroup>
                <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1"><CIcon icon={cilCalendar} title="Date of Birth" size="sm" /></CInputGroupText>
                    <CFormInput placeholder="Date of Birth" aria-label="Date of Birth" value={createDob} onChange={e => setCreateDob(e.target.value)} aria-describedby="basic-addon1"/>
                </CInputGroup>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setCreateVisible(false)}>
                Close
                </CButton>
                <CButton color="primary" onClick={() => saveNew()}>Save changes</CButton>
            </CModalFooter>
            </CModal>
        </CContainer>
        
    );
}