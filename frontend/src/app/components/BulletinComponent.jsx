import "@/app/styles/scss/Bulletin.scss";
import BulletinApi from "@/app/api/BulletinApi";
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function BulletinHeaderComponent({data}) {
    return (
        <div className="bulletin__header">
            <div className="bulletin__id-time">
                <a href={`https://farpost.ru/${data.id}`} target="_blank" className="bulletin__id">
                    {data.id}
                </a>
                <span className="bulletin__separator">—</span>
                <div className="bulletin__time">
                    {data.publishDateString}
                </div>
            </div>
            <div className="bulletin__owner">
                <a href={`https://farpost.ru/user/${data.ownerLogin}`} className="bulletin__avatar">
                    <img src="/img/avatar.svg" width="17" height="17" alt="Avatar"/>
                </a>
                <a href={`https://farpost.ru/user/${data.ownerLogin}`} className="bulletin__login">
                    {data.ownerLogin}
                </a>
            </div>
        </div>
    );
}

function BulletinBodyComponent({data}) {
    function formatText(text) {
        return text.split("\n").map((item) => (
            <React.Fragment key={uuidv4()}>
                {item}
                <br/>
            </React.Fragment>
        ));
    }

    return (
        <div className="bulletin__body">
            <div className="bulletin__subject">
                {data.bulletinSubject}
            </div>
            <div className="bulletin__content bulletin__content_flexible">
                <div className="bulletin__text bulletin__text_flex-item">
                    {formatText(data.bulletinText)}
                </div>
                <div className="bulletin__images">
                    {
                        JSON.parse(data.bulletinImages).map((imageFile) => {
                            return (
                                <img
                                    src={BulletinApi.getImage(imageFile)}
                                    alt={imageFile}
                                    key={uuidv4()}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default function BulletinComponent({data, onClick}) {

    return (
        <div onClick={onClick} className="bulletin">
            <BulletinHeaderComponent data={data} />
            <BulletinBodyComponent data={data} />
        </div>
    );
}