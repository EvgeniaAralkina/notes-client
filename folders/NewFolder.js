import React, {useEffect, useState} from 'react'
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';
import "../../css/form.css"

export default function NewFolder () {
    const [folder, setFolder] = useState(() => {
        return {
            folder_name: ""
        }
    })

    const changeInputFolder = event => {
        event.persist()
        setFolder(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const submitCheck = event => {
        event.preventDefault();
        const folderName = folder.folder_name
        if (folderName.length > 25) {
            alert("Имя слишком длинное (долдно быть не более 25 символов)") // выбрать конкретную длину
        } else {
            fetch(DOMEN_SERVER + "/addFolder", {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"folder_name": folder.folder_name}),

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
    }

    return (
        <div className="form1">
            <h2>Новая папка:</h2>
            <form onSubmit={submitCheck}>
                <p><input
                    placeholder="введите имя папки"
                    type="folder_name"
                    id="folder_name"
                    name="folder_name"
                    value={folder.folder_name}
                    onChange={changeInputFolder}
                /></p>
                <input type="submit"/>
            </form>
        </div>
    )
}