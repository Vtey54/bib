import React, { Component} from 'react';
import PostData from '../data/restaurantFinal.json';
import PostDetail from './PostDetail';

class PostList extends Component {
  constructor(props){
    super(props)
    this.nameWasClicked = this.nameWasClicked.bind(this)
  }

  handleDataCallback(txtMsg){
    alert(txtMsg)
    console.log(this)
  }

  nameWasClicked (event)  {
    event.preventDefault()
    this.handleDataCallback('Sort option coming soon.')

  }


  render() {
    return (

      <div >
        <h1>Restaurants Maitres Restaurateurs et Bib Gourmand </h1>
        <tr>
          <th onClick={this.nameWasClicked}>Name</th>
          <th onClick={this.nameWasClicked}>Street</th>
          <th onClick={this.nameWasClicked}>City</th>
          <th onClick={this.nameWasClicked}>Postal Code</th>
          <th onClick={this.nameWasClicked}>Experience</th>
          <th onClick={this.nameWasClicked}>Phone number</th>
          </tr>
        {PostData.map((item, index)=>{
          return <PostDetail post={item} key={'post-list-key ${index}'}/>

        })}
      </div>
    );
  }
  
}

export default PostList;

//define a state for the .json then don click -> call funciton that changes state and so that changes the display.

// on click { PosTList.setState('new_value') }