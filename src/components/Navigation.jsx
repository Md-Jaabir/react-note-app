import {Component} from "react";

export default class Navigation extends Component {

  render(){
    let {search,onInputChange,showModalFunction,searchFunction} =this.props;
    return(
      <nav>
        <h2>Note taker</h2>
        <input name="search" onKeyUp={searchFunction} value={search} onChange={onInputChange} type="text" placeholder="Type to search note"/>
        <button onClick={showModalFunction}>
          <span className="material-symbols-outlined">add</span>Create new note
        </button>
      </nav>
    )
  }
}