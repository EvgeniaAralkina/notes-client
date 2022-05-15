import openFolder from '../../css/openFolder.png'

function Folder(props){
    let img = () => {
        if (props.id === Number(props.id_open)){
            return (openFolder)
        } else { return (folder1) }
    }

    const submitLogOut = event => {
        event.preventDefault();
        window.location.href = `/${props.id}`
    }

    return(
        <div className="addCursor">
            <img src={img()}  width="55%" onClick={submitLogOut}/>
            <div className="centered">{props.folderName}</div>
        </div>
    );
}

export default Folder;