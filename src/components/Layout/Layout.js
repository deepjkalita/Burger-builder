import React,{Component} from 'react';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component{
  state={
    showSideDrawer:false
  }
  sideDrawerClosedHandler=()=>{
    this.setState((prevState)=>{
      return{showSideDrawer:!prevState.showSideDrawer};
    });
  }
  sideDrawerToggleHandler=()=>{
    this.setState({showSideDrawer:!this.state.showSideDrawer});
  }
  render(){
    return(  <React.Fragment>
          <Toolbar drawerToggleClicked={this.sideDrawerClosedHandler}/>
          <SideDrawer open ={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
          <main className={classes.Content} >
              {this.props.children}
          </main>
      </React.Fragment>);
  }
}

export default Layout;
