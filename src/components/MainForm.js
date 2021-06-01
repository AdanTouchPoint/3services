import React, {useState} from 'react';
import Loader from "react-loader-spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import List from './List'
import mainimage from '../assets/20-3670x2462.jpg';
import icon from '../assets/tw.png'
import cryptoRandomString from "crypto-random-string";
import EmailForm from "./EmailForm";
import ThankYou from "./ThankYou";
import CardImg from "react-bootstrap/cjs/CardImg";
import Card from "react-bootstrap/cjs/Card";
const MainForm = ({dataUser, setDataUser, setSenator, senator, mp, setMp, setEmailData, emailData}) => {
    const [showLoadSpin, setShowLoadSpin] = useState(false)
    const [showList, setShowList] = useState(true)
    const [showFindForm, setShowFindForm] = useState(false)
    const [showEmailForm, setShowEmailForm] = useState(true)
    // const [yourMP, setYourMP] = useState([])
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false)
    const [showThankYou, setShowThankYou] = useState(true)
    // const [tweetText, setTweetText] = useState({})
    const handleChange = e => {
        e.preventDefault();
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        })
        console.log(e.target.value)
        console.log(dataUser)
    }
    const {userName, zipCode, emailUser, id} = dataUser;

    const click = async e => {
        e.preventDefault();
        setShowLoadSpin(true)
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (//firstName.trim() === '' || lastName.trim() === '' || //
            zipCode.trim() === '' || emailUser.trim() === '') {
            setError(true)
            return
        }
        setError(false)
        const randomId = cryptoRandomString({type: 'distinguishable', length: 10})
        dataUser.id = randomId;
        const response = await axios.post(`https://sendemail-service.herokuapp.com/sendtwit`, {dataUser})
        const dataPayload = await response.data.data
        const getMp = await response.data.getMp
        setSenator(dataPayload)
        setMp(getMp)
        setShowLoadSpin(false)
        setShowList(false)

    }
    return (

        <div className={'container'} style={{justifyContent: 'center', display: 'block'}}>
            <div>
                <img style={{margin: '20px', maxHeight: '50px', maxWidth: '50px', height: '100%', width: '100px'}}
                     src={icon}/>
            </div>
            <Card className="bg-dark text-white">
                <Card.Img style={{maxWidth: '1150px', maxHeight: '350px', height: '100%', width: '100%',}} src={mainimage}
                     alt={'logo'}/>
                     <Card.ImgOverlay style={{backgroundColor:'rgba(0,0,0,0.3)'}}>
                         <Card.Body>
                         <Card.Text className={'text'} style={{fontWeight:'300px', textAlign:'center'}}>
                                 Lorem ipsum dolor sit amet
                         </Card.Text>
                             <Card.Text className={'text2'} style={{fontWeight:'300px', textAlign:'center'}}>
                                 facilisi quam amet
                             </Card.Text>
                         </Card.Body>
                     </Card.ImgOverlay>
            </Card>
            <div className={'container'} style={{padding: '35px'}}>

                Lorem ipsum dolor sit amet consectetur adipiscing elit habitant montes nibh id dictumst, facilisi quam
                ullamcorper felis ante class eros tortor velit nisi. Facilisis conubia laoreet vestibulum nostra tempus
                fusce sodales.

            </div>
            <div style={{maxWidth: '1150px', width: '100%', backgroundColor: '#f4f4f4'}}>
                <div hidden={showFindForm} className={'container'} style={{textAlign: 'center', padding: '30px'}}>

                    {error ? <Alert variant={'danger'}>
                        All fields are required!
                    </Alert> : null}
                    <Form onSubmit={click} noValidate validated={validated}>

                        <h3>Find you local MP here:</h3>
                        <Form.Group>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="emailUser"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Control
                                type="text"
                                placeholder="Type your zipCode and press ENTER"
                                name="zipCode"
                                onChange={handleChange}
                                required
                                maxLength="4"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button
                                type={'submit'}
                                variant={'dark'}
                                size={'lg'}
                                onClick={click}
                                className={'u-full-width'}
                            >
                                Find your MP
                            </Button>
                        </Form.Group>
                        {showLoadSpin ? <Loader
                            visible={showLoadSpin}
                            type="Puff"
                            color="#000000"
                            height={100}
                            width={100}
                            timeout={5000} //3 secs
                        /> : null }
                    </Form>

                    <div style={{textAlign: 'justify'}} className={'container'} hidden={showList}>
                        <div>
                            <p>NOTE: Choose only one Representative at a time.
                                If you wish to contact more than one representative, or add further emails to the same
                                Representative, you will have the option to repeat after sending each email.</p>
                        </div>
                        <h2>MP´s</h2>
                        <div>
                            {mp.length > 0 && mp.filter(item => item.govt_type === 'Federal MPs').map((mps, index) => (
                                <List
                                    setShowEmailForm={setShowEmailForm}
                                    setShowFindForm={setShowFindForm}
                                    showFindForm={showFindForm}
                                    emailData={emailData}
                                    setEmailData={setEmailData}
                                    dataUser={dataUser}
                                    // tweetText={tweetText}
                                    mps={mps}
                                    key={index}
                                />)
                            )}
                        </div>
                    </div>
                    <div style={{textAlign: 'justify'}} className={'container'} hidden={showList}>
                        <h2>Senators</h2>
                        {senator.filter(item => item.govt_type === 'Federal Senators').map((mps, index) => (
                                <div>
                                    <List
                                        setShowEmailForm={setShowEmailForm}
                                        setShowFindForm={setShowFindForm}
                                        showFindForm={showFindForm}
                                        emailData={emailData}
                                        setEmailData={setEmailData}
                                        dataUser={dataUser}
                                        // tweetText={tweetText}
                                        mps={mps}
                                        key={index}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <EmailForm
                setShowThankYou={setShowThankYou}
                setShowFindForm={setShowFindForm}
                setShowEmailForm={setShowEmailForm}
                showEmailForm={showEmailForm}
                dataUser={dataUser}
                emailData={emailData}
                setEmailData={setEmailData}
                setDataUser={setDataUser}
            />
            <ThankYou
                emailData={emailData}
                setDataUser={setDataUser}
                setEmailData={setEmailData}
                setShowFindForm={setShowFindForm}
                setShowThankYou={setShowThankYou}
                showThankYou={showThankYou}/>
        </div>
    )
}
export default MainForm;


