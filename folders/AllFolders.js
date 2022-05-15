import OneFolder from "./OneFolder";

export default function AllFolders (props) {
    return (
        <div>
            {props.folders?.map(folder => (
                <OneFolder id_open={props.folder_id} id={folder.folder_id} folderName={folder.folder_name}/>
            ))}
        </div>
    )
}