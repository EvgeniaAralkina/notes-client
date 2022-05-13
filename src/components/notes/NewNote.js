import React, {useEffect, useState} from 'react'
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';
import "../../css/form.css"

export default function NewNote (props) {
    let folders = props.folders

    const [note, setNote] = useState(() => {
        return {
            content: "",
            folder: "no value",
        }
    })

    const changeInputNote = event => {
        event.persist()
        setNote(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const submitCheck = event => {
        event.preventDefault();
        console.log(note.folder)
        // const content = note.content
        if(note.content.length > 200) {
            alert("Заметка слишком длинная (максимальное кол-во символов - 200, длина вашей заметки - "+(note.content.length) ) // выбрать конкретную длину
        } else
            if(note.folder === "no value"){
            alert("Выберите папку")
        } else {
            console.log(note.folder)
            fetch(DOMEN_SERVER + "/addNote", {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json',},
                body: JSON.stringify({
                    "content": note.content,
                    "folder": note.folder
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
    }

    return (
        <div className="form1">
            <h2>Новая заметка:</h2>
            <form onSubmit={submitCheck}>
                <p> <textarea
                    rows="5" cols="33"
                    placeholder="купить хлеб.."
                    type="content"
                    id="content"
                    name="content"
                    value={note.content}
                    onChange={changeInputNote}
                /></p>
                <select name="folder" onChange={changeInputNote}>
                    <option value={"no value"}>выберите папку</option>
                    {folders?.map(fold => (
                        <option type="folder"
                                id="folder"
                                value={fold.folder_id}
                        >
                            {fold.folder_name}
                        </option>
                    ))}
                </select>
                <input type="submit"/>
            </form>
        </div>
    )
}