import React, {useEffect, useState} from 'react'
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup"
import Col from "react-bootstrap/cjs/Col";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Loader from "react-loader-spinner";
const EmailForm = ({mps,setShowThankYou, setShowFindForm, dataUser, setDataUser, showEmailForm, setShowEmailForm, emailData, setEmailData}) => {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false)
    const [showLoadSpin, setShowLoadSpin] = useState(false)

   //  const text = `I live in your electorate and wanted to let you know that I'm tired of wasteful government  spending.
   // My tax dollars are being spent on unnecessary government programs, subsidies,  and initiatives, and we must put an end to it.
   // As a voter, this is my most important issue and I am urging you to work in Canberra towards eliminating waste.
   // Thank you.`
    const handleChange = e => {
        e.preventDefault()
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        })
        setEmailData({
            ...dataUser,
            ...emailData,
            [e.target.name]: e.target.value
        })
    }
    const {userName} = dataUser
    const send = async e => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (//firstName.trim() === '' || lastName.trim() === '' || //
            userName.trim() === '' ) {
            setError(true)
            return
        }
        setError(false)
        const  payload = await axios.post('https://sendemail-service.herokuapp.com/email',{dataUser,emailData})
        await setShowLoadSpin(false)
        if (payload.status === 200 ) {
                setShowEmailForm(true)
                setShowThankYou(false)
                dataUser.id= ''
}

    }
    const back = e => {
        e.preventDefault()
        setShowFindForm(false)
        setShowEmailForm(true)
    }
    useEffect(()=> {
        console.log(dataUser)
    },[dataUser])
    return (
        <div className={'emailContainer'} hidden={showEmailForm}>
            {/*<p style={{textAlign: 'center'}}> FROM: add your full name and surname</p>*/}
            {error ? <Alert variant={'danger'}>
                All fields are required!
            </Alert> : null}
            <Form  onSubmit={send} noValidate validated={validated}>
                <div className={'formEmail'}>
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>
                            *First name and last name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            name="userName"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>
                            *Email
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder={"email"}
                            onChange={handleChange}
                            name="emailUser"
                        />
                    </Form.Group>
                </div>
                <div style={{maxHeight:'38',height:'100%'}}>TO: REPRESENTATIVE INFORMATION</div>
                <div className={'formEmail'}>
                    <Form.Group as={Col}>
                        <Form.Control
                            as={'input'}
                            // inline
                            readOnly
                            type="text"
                            placeholder={emailData.name}
                            name="nameTo"
                        />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Control
                            as={'input'}
                            // inline
                            readOnly
                            type="text"
                            placeholder={`${emailData.city} - ${emailData.state}`}
                            name="state-city"
                        />
                    </Form.Group>
                    <InputGroup as={Col} >
                        <Form.Control
                            // inline
                            readOnly
                            type="text"
                            name="cp"
                            placeholder={dataUser.zipCode}
                        />
                    </InputGroup>
                </div>
                <div style={{paddingTop:'5px'}}>
                    <Form.Label>
                        Subject
                    </Form.Label>
                    <Form.Control
                        as="input"
                        type="text"
                        name="subject"
                        defaultValue={'Time to End Wasteful Spending'}
                    />

                </div>
                <Form.Group style={{paddingTop:'20px'}}>
                    <Form.Control
                        // plainText
                        as="textarea"
                        rows={8}
                        defaultValue={dataUser.text}
                        onChange={handleChange}
                        name="text"
                    />
                </Form.Group>
                <Loader
                    visible={showLoadSpin}
                    type="Puff"
                    color="#000000"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
            </Form>
            {/*SEPARAR BUTTONS*/}
            <div className={'container'} style={{textAlign:'center'}}>
                <Button
                    type={'submit'}
                    style={{margin:'20px'}}
                    variant={'dark'}
                    onClick={send}>
                    Send
                </Button>
                <Button
                    style={{margin:'20px'}}
                    variant={'dark'}
                    onClick={back}>
                    Back
                </Button>
            </div>
        </div>

    )
}

export default EmailForm;


