import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from "./About";
import { Switch, Route, Redirect } from 'react-router-dom'
import { COMMENTS } from '../shared/comments'
import { DISHES } from '../shared/dishes'
import { LEADERS } from '../shared/leaders'
import { PROMOTIONS } from '../shared/promotions'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: COMMENTS,
            dishes: DISHES,
            leaders: LEADERS,
            promotions: PROMOTIONS,
        };
    }

    onDishSelect = (dishId) => {
        this.setState({ selectedDish: dishId });
    }



    render() {

        const HomePage = () => <Home
            dish={this.state.dishes.filter((dish) => dish.featured)[0]}
            promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
            leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />

        const DishDetailsPage = ({ match }) => {
            return (
                <DishDetail
                    dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                />
            );
        };

        const AboutPage = () => <About
            leaders={this.state.leaders}
        />

        return (

            <div>
                <Header />


                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} onClick={this.onDishSelect} />} />
                    <Route path="/menu/:dishId" component={DishDetailsPage} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route exact path="/about" component={AboutPage} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;