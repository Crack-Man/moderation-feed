import React, {useEffect, useRef, useState} from 'react';
import BulletinApi from "@/app/api/BulletinApi";
import BulletinComponent from "@/app/components/BulletinComponent";
import "@/app/styles/scss/Feed.scss";
import DialogComponent from "@/app/components/DialogComponent";


export default function FeedComponent() {
    const [bulletinsState, setBulletinsState] = useState([]);
    const [dialogData, setDialogData] = useState({visible: false, subject: ""});
    const bulletins = useRef([]);
    const focusedBulletin = useRef({id: -1, position: -1});
    const decidedBulletins = useRef([]);

    function setFocusedBulletin(data, position) {
        focusedBulletin.current = {id: data.id, position};
        console.log(`Focused bulletin ID: ${focusedBulletin.current.id}`);
    }

    function nextBulletin() {
        let position = 0;
        if (focusedBulletin.current.position < bulletins.current.length - 1) {
            position = focusedBulletin.current.position + 1;
        }
        setFocusedBulletin(bulletins.current[position], position);
        scrollToBulletin();
    }

    function scrollToBulletin() {
        const bulletinElement = document.getElementById(`bulletin-${focusedBulletin.current.id}`);
        if (bulletinElement) {
            bulletinElement.scrollIntoView({behavior: 'smooth'});
        }
    }

    function decide(decision, declineReason = null, escalateNote = null) {
        decidedBulletins.current = decidedBulletins.current.filter(bulletin => bulletin.id !== focusedBulletin.current.id);
        decidedBulletins.current.push({
            id: focusedBulletin.current.id,
            decision,
            declineReason,
            escalateNote
        });
        nextBulletin();
    }

    function openDialog(subject, type) {
        setDialogData({...dialogData, visible: true, subject, type});
    }

    function submitDialog(text, type) {
        if (type === "decline") {
            decide(type, text);
        } else if (type === "escalate") {
            decide(type, null, text);
        }
        closeDialog();
    }

    function closeDialog() {
        setDialogData({...dialogData, visible: false});
    }

    useEffect(() => {
        let enterWasPressed = false;

        async function fillBulletinsData() {
            const data = await BulletinApi.getList();
            if (data && data.length) {
                setBulletinsState(data);
                setFocusedBulletin(data[0], 0);
                bulletins.current = data;
                enterWasPressed = true;
            }
        }

        async function handleKeyDown(event) {
            if (enterWasPressed) {
                if (event.key === 'Enter' && event.shiftKey) {
                    openDialog("Примечание для старшего модератора", "escalate");
                } else if (event.key === ' ') {
                    event.preventDefault();
                    decide("approve");
                } else if (event.key === 'Delete') {
                    openDialog("Причина отклонения", "decline");
                } else if (event.key === 'F7') {
                    event.preventDefault();
                    if (decidedBulletins.current.length) {
                        await BulletinApi.setDecisions(decidedBulletins.current);
                        await fillBulletinsData();
                    }
                }
            } else {
                if (event.key === 'Enter') {
                    await fillBulletinsData();
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (bulletinsState.length) {
            scrollToBulletin();
        }
    }, [bulletinsState]);

    return (
        <div className="feed">
            <DialogComponent dialogData={dialogData} onClose={closeDialog} onSubmit={submitDialog}/>
            {
                bulletinsState.map((bulletin, index) => {
                    return (
                        <BulletinComponent data={bulletin} key={bulletin.id}
                                           onClick={() => setFocusedBulletin(bulletin, index)}/>
                    );
                })
            }
        </div>
    );
}