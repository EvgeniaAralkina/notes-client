import React, {useEffect, useState} from 'react'
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';
import del from "../../css/delete.png";
import "../../css/form.css"


export default function DeleteNote (props) {

    const submitCheck = event => {
        event.preventDefault();
        fetch(DOMEN_SERVER + "/deleteNote", {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json',},
            body: JSON.stringify({
                "note_id": props.note_id,
            }),
        })
            .then(res => {
                res.json()
                    .then(res => {
                        if (res['answ'] !== "ok") {
                            window.location.href = "/login";
                        } else {
                            if (props.folder_id === -1) {
                                window.location.href = DOMEN_SITE + "/"
                            } else { window.location.href = DOMEN_SITE + "/" + props.folder_id }
                        }
                    })
            })
            .catch(() => {
                alert("An error occurred on the server")
            })
        }

    return (
        <div className="delNote">
        <img src={del} width="17rem" className="delNote" onClick={submitCheck}/>
        </div>
    )
}