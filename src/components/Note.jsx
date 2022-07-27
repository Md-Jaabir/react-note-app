import {Component} from "react";


export default class Note extends Component {

  render(){
    const {uid,title,description,noteDeleteFunc:deleteNote,noteEditFunc:editNote,showViewModal}=this.props;
    return(
      <div className="note" onClick={(event)=>{
          if(event.target.name==="button" || event.target.innerHTML===" Edit" || event.target.innerHTML===" Delete" || event.target.innerHTML==="edit" || event.target.innerHTML==="delete"){
            event.preventDefault();
            return;
          }
          showViewModal(uid);
        }
      } id={uid}>
        <h2>{title}</h2>
        <p>{description.substr(0,32)}...</p>
        <div className="delete-edit">
          <button name="button" className="clickPreventer" onClick={()=>deleteNote(uid)}><span name="span" className="material-symbols-outlined">delete</span ><span name="span" > Delete</span></button>
          <button name="button" onClick={()=>editNote(uid)}><span name="span"  className="material-symbols-outlined">edit</span><span name="span" > Edit</span></button>
        </div>
      </div>
    )
  }
}
