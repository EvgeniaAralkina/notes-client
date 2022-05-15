import OneNote from "./OneNote";

export default function AllNotes (props) {
    return (
        <div>
            {props.notes?.map(note => (
                <OneNote folder_id={props.folder_id} note_id={note.note_id} content={note.content}/>
            ))}
        </div>
)}