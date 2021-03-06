import React,{Component} from 'react';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';



class BurgerBuilder extends Component{
  state={
    ingredients:null,
    totalPrice:4,
    purchasable:false,
    purchasing:false,

  }
componentDidMount(){
  this.props.onInitIngredient();
}

updatePurchaseState(ingredients){
  const sum=Object.keys(ingredients)
    .map(igKey=>{
      return ingredients[igKey];
    })
    .reduce((sum,el)=>{
      return sum+el;
    },0);
    return sum>0;
}

purchaseHandler=()=>{
  this.setState({purchasing:true});
}
purchaseCancelHandler=()=>{
    this.setState({purchasing:false});
}
purchaseContinueHandler=()=>{

    this.props.onInitPurchase();
    this.props.history.push('/Checkout');
}
  render(){
    const disabledInfo={
      ...this.props.ings
    };
    for(let key in disabledInfo){
      disabledInfo[key]=disabledInfo[key] <=0
    }
    let orderSummary=null;

    let burger=this.props.error?<p>Ingredients can't be loaded</p>:<Spinner/>;
    if(this.props.ings){
      burger= (<React.Fragment> <Burger ingredients={this.props.ings}/>

        <BuildControls
        ingredientAdded={this.props.onIngredientAdded}
        ingredientRemoved={this.props.onIngredientRemoved}
        purchasable={this.updatePurchaseState(this.props.ings)}
        disabled={disabledInfo}
        ordered={this.purchaseHandler}
        price={this.props.price}/>
        </React.Fragment>);
        orderSummary=<OrderSummary ingredients={this.props.ings}
                      purchaseCancelled={this.purchaseCancelHandler}
                      purchaseContinue={this.purchaseContinueHandler}
                      price={this.props.price}/>
    }


    return(
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}

      </React.Fragment>
    );
}
}
const mapStateToProps=state=>{
  return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error
  };
}
const mapDispatchToProps=dispatch=>{
  return{
    onIngredientAdded:(ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved:(ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredient:()=>dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit())
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
