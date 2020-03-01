import React, { Component} from 'react';
import PostData from '../data/restaurantFinal.json';

class postDetail extends Component {

  nameWasClicked (){
    alert('clicked')
  }

  render() {
    const {post} = this.props

    return (

      <tr>
          <th onclick={this.nameWasClicked}>{post.name}</th>
          <th>{post.rue}</th>
          <th>{post.ville}</th>
          <th>{post.codePostal}</th>
          <th>{post.experience}</th>
          <th>{post.telephone}</th>
      </tr>

    );
  }
  
}

export default postDetail;
//define a state for the .json then don click -> call funciton that changes state and so that changes the display.

// on click { PosTList.setState('new_value') }