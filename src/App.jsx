import React from "react";
import Navigation from "./components/Navigation";
import Notes from "./components/Notes";
import Modal from "./components/Modal";
import ViewNoteModal from "./components/ViewNote";

class App extends React.Component {

  state={
    notes:JSON.parse(localStorage.getItem("notes")) || [],
    search:"",
    note_title:"",
    note_description:"",
    modalDisplayStatus:false,
    saveFunction:null,
    editNoteId:null,
    modalHeader:"",
    displayNotes:JSON.parse(localStorage.getItem("notes")) || [],
    viewNoteStatus:false,
    view_title:"",
    view_description:"",
  }

  saveNote=()=>{
    let {note_title,note_description}=this.state;

    if(!note_title || !note_description){
      alert("can't set empty note");
      return;
    }
    
    let localNotes= JSON.parse(localStorage.getItem("notes")) || [];
    localNotes.push({
      uid:Math.random(),
      title:note_title,
      description:note_description
    });

    localStorage.setItem("notes",JSON.stringify(localNotes));
    this.setState({
      notes:JSON.parse(localStorage.getItem("notes")) || [],
      note_title:"",
      note_description:"",
      modalDisplayStatus:false,
      displayNotes:[...localNotes]
    })
  }
  
  onInputChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  showModal=()=>{
    this.setState({
      note_title:"",
      note_description:"",
      modalDisplayStatus:true,
      saveFunction:this.saveNote,
      modalHeader:"Create new note"
    })
  }

  showViewModal=(uid,event)=>{
    console.log("viewing");
    let {notes}=this.state;
    let note=notes.find((singleNote)=>singleNote.uid===uid);
    this.setState({
      view_title:note.title,
      view_description:note.description,
      viewNoteStatus:true
    })
  }

  closeModal=()=>{
    this.setState({
      modalDisplayStatus:false
    })
  }

  hideViewModal=()=>{
    this.setState({
      view_title:"",
      view_description:"",
      viewNoteStatus:false
    })
  }

  saveEditedNote=()=>{
    let {editNoteId:uid,notes,note_title,note_description}=this.state;
    // let note=notes.find((singleNote)=>singleNote.uid===uid);
    if(!note_title || !uid || !note_description){
      alert("can't set empty note");
      return;
    }
    
    let noteIndex=notes.findIndex((singleNote)=>singleNote.uid===uid);
    notes[noteIndex]={
      uid,
      title:note_title,
      description:note_description
    }

    localStorage.setItem("notes",JSON.stringify(notes));
    this.setState({
      notes:JSON.parse(localStorage.getItem("notes")) || [],
      modalDisplayStatus:false,
      displayNotes:[...notes]
    });
  }

  deleteNote=(uid)=>{
    console.log("deleting");
    let {notes}=this.state;
    let noteIndex=notes.findIndex((note)=>note.uid===uid);
    notes.splice(noteIndex,1);
    localStorage.setItem("notes",JSON.stringify(notes));
    this.setState({
      notes:JSON.parse(localStorage.getItem("notes")) || [],
      displayNotes:[...notes],
      search:"",
    })
  }


  showModalForEdit=(uid)=>{
    let {notes}=this.state;
    let note=notes.find((singleNote)=>singleNote.uid===uid);
    this.setState({
      saveFunction:this.saveEditedNote,
      editNoteId:uid,
      viewNoteStatus:false,
      modalDisplayStatus:true,
      note_title:note.title,
      note_description:note.description,
      modalHeader:"Edit your modal"
    });
    // setTimeout(()=>{
    //   this.setState({
    //     viewNoteStatus:false
    //   });
    // },10);
  }

  filterNotes=(event)=>{
    let {notes,search}=this.state;
    if(!search){
      this.setState({
        notes:JSON.parse(localStorage.getItem("notes")) || [],
        displayNotes:[...notes]
      });
      return;
    }

    let filteredNotes=notes.filter((note)=>{
      // console.log(note.title.match(search));
      const searchRegexp=new RegExp(search,'gi');
      return (searchRegexp.test(note.title) || searchRegexp.test(note.description));
    });

    

    this.setState({
        displayNotes:filteredNotes
      });
  }
  
  render(){
    
    let {search,viewNoteStatus,view_title,view_description,displayNotes,modalDisplayStatus,note_title,note_description,saveFunction,editNoteId,modalHeader}=this.state;
    return(
      <div>
        <Navigation showModalFunction={this.showModal} value={search} onInputChange={this.onInputChange} searchFunction={this.filterNotes}/>
        <Notes showViewModal={this.showViewModal} noteDeleteFunc={this.deleteNote} noteEditFunc={this.showModalForEdit} editNoteId={editNoteId} notesArr={displayNotes}/>
        <Modal modalHeader={modalHeader} closeFunc={this.closeModal} note_title={note_title} note_description={note_description} noteSaveFunction={()=>saveFunction()} displayStatus={modalDisplayStatus} onInputChange={this.onInputChange}/>
        <ViewNoteModal hideViewModal={this.hideViewModal}  view_title={view_title} view_description={view_description} viewNoteStatus={viewNoteStatus}/>
        <button className="add-btn" onClick={this.showModal}><span className="material-symbols-outlined">add</span></button>
      </div>
    )
  }
}

export default App;
