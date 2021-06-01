import React, {useState} from 'react'
import Button from "react-bootstrap/cjs/Button";

const List = ({mps, dataUser,  setEmailData,  setShowFindForm, setShowEmailForm}) => {
    const tweetText = `.${mps.twitter}%2C+I%E2%80%99m+a+voter+in+your+electorate%2C+and+I+think+our+taxes+are+too+high%21+Australians+deserve+to+keep+more+of+their+own+money+and+I%E2%80%99m+asking+you+to+fight+in+Canberra+for+lower+taxes.+%0D%0A%0D%0ASent+from+%40AusTaxpayers%E2%80%99+Contact+Your+Politician+Platform.&original_referer=https://www.taxpayers.org.au/let-them-know-you-care`
    const click = e => {
        e.preventDefault()
        setEmailData({
            ...dataUser,
            ...mps
        })
        setShowEmailForm(false)
        setShowFindForm(true)
    }
    return (
        <div className={'buttonsContainer'}>
            <div style={{paddingTop: '10px'}}>
                <div>
                    <h3> {mps.name} </h3>
                    <p>For: {mps.address}, City: {mps.city}, -State: {mps.state}</p>
                </div>
            </div>
            <div className={'buttons'}>
                <div style={{padding: '5px'}}>
                    {
                        mps.twitter !== 'NULL' ?
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
                                target={"blank"}
                                onClick={click}
                            >
                                SEND EMAIL
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
                                href={`tel:+61${mps.phone}`}
                                target={"blank"}
                            >
                                CALL IT
                            </Button> :
                            <p>No Phone</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default List;


