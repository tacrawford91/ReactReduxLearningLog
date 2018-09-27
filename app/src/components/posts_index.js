import React, {Component} from 'react'; 
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import {Link} from 'react-router-dom';
import {Timeline} from 'react-twitter-widgets';
import Moment from 'react-moment'; 

import _ from 'lodash';

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }
    renderPosts() {
        let sorted = _.sortBy(this.props.posts, (dateObj) => new Date(dateObj.day)).reverse();
        return _.map(sorted, post => {
            console.log(sorted);
            return (
                <div className="card customCard" key={post.id} >
                    <img className="card-img-top" src={post.imageURL} alt="Card image cap" />
                    <div className="card-body">
                        <h3 className="card-title"><Moment format='dddd, MM/DD/YY'>{post.day}</Moment></h3>
                        <h5 className="card-title">{post.language}</h5>
                        <h5 className="card-title">{post.skill}</h5>
                        <p className="card-text">{post.summary}</p>
                        <Link to={`/posts/${post.id}`} className="btn btn-primary">Read More</Link>
                    </div>
                </div>
            )
        });
    };

    render() {
        return (
            <div className='indexBody'>
                <div className="jumbotron" id='customJumbo'>
                    <div className="container">
                        <h1 className="display-8">Troy A. Crawford</h1>
                        <p className="lead">Welcome! I built this learning log as an extension of the basic log that can be found <a href='https://tac-basic-learninglog.herokuapp.com/'>here!</a> This log utilizes react and redux for the application view and state management. The application hits the original log to pull in content (custom api). The log is a centralized location to hold all of my new found knowledge. Below I break down the day's main take away. Please feel free to reach out on twitter to ask questions or leave comments. When WE all learn, WE all win!</p>
                        <a href="https://troycrawford.tech" className="text-center"><h4>Portfolio: https://troycrawford.tech</h4></a>
                        <hr className="jumbohr"></hr>
                    </div>
                </div>
                <div className='container'>                
                    <div className="row">
                        <div className='col-md-8'>
                            <div className='postDiv'>
                                {this.renderPosts()}
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='twitterDiv'>
                                <Timeline 
                                dataSource={{
                                    sourceType: 'profile',
                                    screenName: 'deveLOVEper1234'
                                }}
                                ></Timeline>
                            </div>
                        </div>
                    </div>
                    <div className='text-xs-right'>
                        <Link className='btn btn-primary hideBtn' to='/posts/new'>
                            Add a Post
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapToStateProps(state) {
    return {posts: state.posts};
}

export default connect(mapToStateProps, {fetchPosts}) (PostsIndex); 