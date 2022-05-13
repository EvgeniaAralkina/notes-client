import "../../css/noteStyle.css"
import DeleteNote from "./DeleteNote";

function Note(props){
    return(
        <div >

        <div className="paper-shadow">
            <DeleteNote folder_id={props.folder_id} note_id = {props.note_id}/>
            <p>{props.content}</p>

        </div>
        </div>
    );
}

export default Note;
