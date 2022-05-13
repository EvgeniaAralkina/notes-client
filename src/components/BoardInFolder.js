import NewNote from "./notes/NewNote";
import AllNotes from "./notes/allNotes";
import AllFolders from "./folders/AllFolders";
import "../css/menu.css"
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import DeleteFolder from "./folders/DeleteFolder";
import {useState} from "react";
import {DOMEN_SERVER, DOMEN_SITE} from "../config/const";
import home from '../css/home.png';
import exit from "../css/logout.png";

function BoardInFolder(props){
    let { id } = useParams();
    useEffect(() => {
    }, []);

    const [notes, setNotes] = useState([]);
    useEffect(() => {
        getAll();
    }, []);

    const [folders, setFolders] = useState([]);
    useEffect(() => {
        getAll();
    }, []);

    function getAll() {
        fetch(DOMEN_SERVER + '/' +id + "/getNotesAndFolders", {
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
                    <img src={home}  width="60%" />
                </Link>

                <hr align="center" border-radius="10px" width="90%" size="10" color="lightslategray" />

                <AllFolders folder_id={id} folders={folders} className="folders-div"/>

                <hr align="center" border-radius="10px" width="90%" size="10" color="lightslategray" />

                <img src={exit}  width="60%" onClick={submitLogOut}/>

            </div>
            <div key={id} className="main-div">

                <NewNote folder_id={id} folders={folders}/>
                <DeleteFolder folder_id={id}/>
                <AllNotes folder_id={id} notes={notes}/>

            </div>
        </div>
    );
}

export default BoardInFolder;