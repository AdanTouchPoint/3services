import React,{useState} from 'react'
import MainForm from "./components/MainForm";

function App() {
    const [emailData, setEmailData] = useState({
        userName: ''
    })
    const [dataUser, setDataUser] = useState({
        userName: '',
        zipCode: '',
        emailUser: '',
        text:`Dear ${emailData.name} 
     I live in your electorate and wanted to let you know that Im tired of wasteful government  spending. My tax dollars are being spent on unnecessary government programs, subsidies,  and initiatives, and we must put an end to it. As a voter, this is my most important issue and I am urging you to work in Canberra towards eliminating waste. Thank you.`
    })
    const [mp, setMp] = useState([])
    const [senator, setSenator] = useState([])
    return(
        <MainForm
            setEmailData={setEmailData}
            emailData={emailData}
            dataUser={dataUser}
            setDataUser={setDataUser}
            mp={mp}
            setMp={setMp}
            senator={senator}
            setSenator={setSenator}
        />
    )

}

export default App;
