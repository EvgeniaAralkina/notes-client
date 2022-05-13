import NewNote from "./notes/NewNote";
import AllNotes from "./notes/allNotes";
import AllFolders from "./folders/AllFolders";
import NewFolder from "./folders/NewFolder";
import "../css/menu.css"
import {useEffect, useState} from "react";
import {DOMEN_SERVER, DOMEN_SITE} from "../config/const";
import {Link} from "react-router-dom";
import home from "../css/home.png";
import exit from "../css/logout.png";

function Board(props){
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        getAll();
    }, []);

    const [folders, setFolders] = useState([]);
    useEffect(() => {
        getAll();
    }, []);

    const [login, setLogin] = useState([]);
    useEffect(() => {
        getAll();
    }, []);

    function getAll() {
        fetch(DOMEN_SERVER + "/getNotesAndFolders", {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        })
            .then(res => {
                res.json()
                    .then(res => {
                        if (res['answ'] !== "ok") {
                            window.location.href = "/login";
                        } else {
                                setNotes(res['note']);
                                setFolders(res['folder']);
                                setLogin(res['login'])
                            }
                        })
                    })}

    const submitLogOut = event => {
        event.preventDefault();
        fetch(DOMEN_SERVER + "/logout", {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json',}
        })
            .then(res => {
                window.location.href = DOMEN_SITE + "/login"
            })
            .catch(() => {
                alert("An error occurred on the server")
            })
    }

    return(
        <div>
            <div className="folders-div">

                <Link to= {`/`}>
                    <img src={home}  width="60%"/>
                </Link>

                <hr align="center" border-radius="10px" width="90%" size="10" color="lightslategray" />

                <AllFolders folders={folders} className="folders-div"/>

                <hr align="center" border-radius="10px" width="90%" size="10" color="lightslategray" />

                <img src={exit}  width="60%" onClick={submitLogOut}/>

            </div>

            <div  className="main-div">
                <NewFolder/>
                <NewNote folder_id={-1} folders={folders}/>
                <AllNotes folder_id={-1} notes={notes}/>
            </div>

        </div>
    );
}

export default Board;