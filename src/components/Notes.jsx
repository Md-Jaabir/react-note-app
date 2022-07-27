import {Component} from "react";
import Note from "./Note";


export default class Notes extends Component{
  render(){
    const {notesArr,noteDeleteFunc,noteEditFunc,showViewModal}=this.props;
    return(
      <div className="notes">
        {notesArr.map((note)=><Note showViewModal={showViewModal} noteDeleteFunc={noteDeleteFunc} noteEditFunc={noteEditFunc} key={Math.random()} uid={note.uid} title={note.title} description={note.description}/>)}
      </div>
    )
  }
}
