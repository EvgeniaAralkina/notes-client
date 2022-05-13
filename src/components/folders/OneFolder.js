// import "../../css/folder.css"
import folder1 from '../../css/folder1.png'
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
            {/*<Link to= {`/${props.id}/board`}>*/}
            <img src={img()}  width="55%" onClick={submitLogOut}/>
            <div className="centered">{props.folderName}</div>
            {/*</Link>*/}
        </div>
    );
}

export default Folder;