import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import ReviewList from './ReviewList.jsx'
import RatingSummary from './RatingSummary.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurantId: 1,
      reviews: [],
      origReviews: [],
      reviewsFiltered: false,
      filterScore: '',
    };
  }

  componentDidMount() {
    const splitUrl = window.location.pathname.split('/');
    const rId = Number.parseInt(splitUrl[splitUrl.length - 1]) ||  Number.parseInt(splitUrl[splitUrl.length - 2]);
    this.setState({
      restaurantId: rId,
    }, this.getReviews);
  }

  getReviews() {
    fetch(`/api/restaurants/${this.state.restaurantId}/reviews`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          reviews: data,
          origReviews: data,
        });
      })
      .catch(err => console.error('Error fetching data: ' + err));
  }

  handleChartClick(e, clickScore) {
    e.preventDefault();
    if (this.state.reviewsFiltered) {
      if (clickScore === this.state.filterScore) {
        this.setState({
          reviews: this.state.origReviews,
          reviewsFiltered: false,
        });
      } else {
        this.setState({
          reviews: this.state.origReviews.filter((rev) => {
            return rev.overall_score === clickScore;
          }),
          filterScore: clickScore,
        });
      }
    } else {
      this.setState({
        reviews: this.state.origReviews.filter((rev) => {
          return rev.overall_score === clickScore;
        }),
        reviewsFiltered: true,
        filterScore: clickScore,
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/api/restaurants/:id/reviews" component={ReviewList} />
          <RatingSummary
            reviews={this.state.reviews} 
            origReviews={this.state.origReviews}
            handleChartClick={this.handleChartClick.bind(this)} 
          />
          <ReviewList reviews={this.state.reviews} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
