import React, {useState} from 'react'
import Button from "react-bootstrap/cjs/Button";
import EmailForm from "./EmailForm";

const List = ({mps, dataUser, emailData, setEmailData,showFindForm,setShowFindForm,setShowEmailForm}) => {

    const tweetText = `.${mps.twitter}%2C+I%E2%80%99m+a+voter+in+your+electorate%2C+and+I+think+our+taxes+are+too+high%21+Australians+deserve+to+keep+more+of+their+own+money+and+I%E2%80%99m+asking+you+to+fight+in+Canberra+for+lower+taxes.+%0D%0A%0D%0ASent+from+%40AusTaxpayers%E2%80%99+Contact+Your+Politician+Platform.&original_referer=https://www.taxpayers.org.au/let-them-know-you-care`
    console.log(mps)

    const click = e => {
        e.preventDefault()
        setEmailData(mps)
        setShowEmailForm(false)
        setShowFindForm(true)

    }
    return (
        <div>
        <div className={'container'}
             style={{ padding:'7px 7px', display: "flex", backgroundColor: 'white', justifyContent: 'space-between', marginBottom: '10px'}}>
            <div style={{paddingTop: '10px'}}>
                <p>
                    <h3> {mps.name} </h3>
                    <p>For: {mps.address}, City: {mps.city}, -State: {mps.state}</p>
                </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className={'container'} style={{padding: '5px'}}>
                    {mps.twitter !== 'NULL' ?
                        <Button
                            style={{maxWidth: '110px', width: '100%'}}
                            size={'sm'}
                            variant={'dark'}
                            href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                            target={"blank"}
                        >
                            SEND TWEET
                        </Button> :
                        <p>No Tweeter</p>
                    }
                </div>
                <div className={'container'} style={{padding: '5px'}}>
                    {
                        mps.email ?
                            <Button
                                style={{maxWidth: '110px', width: '100%'}}
                                size={'sm'}
                                variant={'dark'}
                                href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                                target={"blank"}
                                onClick={click}
                            >
                                SEND email
                            </Button> :
                            <p>No Email</p>
                    }
                </div>
                <div className={'container'} style={{padding: '5px'}}>
                    {
                        mps.phone ?
                            <Button
                                style={{maxWidth: '110px', width: '100%'}}
                                size={'sm'}
                                variant={'dark'}
                                href={`tel:+61${emailData.phone}`}
                                target={"blank"}
                            >
                                CALL IT
                            </Button> :
                            <p>No Phone</p>
                    }
                </div>
            </div>
               </div>

        </div>
    )
}

export default List;


