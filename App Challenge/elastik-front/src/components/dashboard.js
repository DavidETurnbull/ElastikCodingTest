import { CContainer, CTable } from '@coreui/react';
import Create from './create';
import Delete from './delete';
import { useState, useEffect } from 'react';

export default function Dashboard(){
    async function loadStudents() {
        try {
            let response = await fetch('https://7w8byan8ag.execute-api.us-east-2.amazonaws.com/students', {
                method: "GET",
                //body: JSON.stringify({ email: signupEmail, password: signupPassword }),
            });
            let responseJson = await response.json();
            setItems(responseJson);
        } catch(error) {
            console.error(error);
        }
    }

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
          key: 'dob',
          label: 'Date of Birth',
          _props: { scope: 'col' },
        },
    ];
    const [items, setItems] = useState(0);
    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <CContainer className="container-lg dashboard-container">
            <CTable columns={columns} items={items} />
        </CContainer>
    );
}