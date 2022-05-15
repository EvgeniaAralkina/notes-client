import React, {useEffect, useState} from 'react'
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';

export default function DeleteFolder (props) {
    const submitCheck = event => {
        event.preventDefault();
        fetch(DOMEN_SERVER + "/deleteFolder", {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json',},
            body: JSON.stringify({
                "folder_id": props.folder_id,
            }),
        })
            .then(res => {
                res.json()
                    .then(res => {
                        if (res['answ'] !== "ok") {
                            window.location.href = "/login";
                        } else {
                            window.location.href = DOMEN_SITE + "/"
                        }
                    })
            })
            .catch(() => {
                alert("An error occurred on the server")
            })
    }

    return (
        <div className="delFolder">
            <button onClick={submitCheck}>
                Delete folder
            </button>
        </div>
    )
}