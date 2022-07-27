import {Component} from "react";

export default class Modal extends Component{

  render(){
    const {displayStatus,onInputChange,noteSaveFunction:saveNote,note_title,note_description,closeFunc,modalHeader}=this.props;
    return(
      <div className={(displayStatus ? 'modal' : 'modal hide')}>
        <h2>{modalHeader}</h2>
        <input value={note_title} onChange={onInputChange} name="note_title" type="text" className="title" placeholder="Enter note title"/>
        <textarea value={note_description} onChange={onInputChange} name="note_description" type="text" className="desc" placeholder="Enter note decription"></textarea>
        <button onClick={saveNote}> <span className="material-symbols-outlined">save</span><span className="save-span">Save note</span></button>
        <div onClick={closeFunc} className="close-btn"><span className="material-symbols-outlined">close</span></div>
      </div>
    )
  }
}
