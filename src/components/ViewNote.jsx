import {Component} from "react";

export default class ViewNote extends Component {
  render(){
    let {view_title,view_description,viewNoteStatus,hideViewModal}=this.props;
    return(
      <div className={viewNoteStatus?"view-note modal" :" view-note modal hide"}>
        <div className="close-btn" onClick={hideViewModal}><span className="material-symbols-outlined">close</span></div>
        <h2>View note</h2>
        <input type="text" readOnly={true} value={view_title} className="title" placeholder="Note title"/>
        <textarea type="text" readOnly={true} value={view_description} className="desc" placeholder="Note decription"></textarea>
      </div>
    )
  }
}
