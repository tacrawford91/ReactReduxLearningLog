import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPost, deletePost} from '../actions'

class PostsShow extends Component {
    componentDidMount() {
        if (!this.props.post) {
            const {id} = this.props.match.params;
            this.props.fetchPost(id);
        }
    }
    createMarkup() {
        return {__html: this.props.post.description}        
    }
    onDeleteClick = () => {
        const {id} = this.props.match.params
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {post} = this.props;

        if(!post) {
            return <div>Loading..</div>;
        }
        return (
            <div className='showBody'>
                <div className='container'>
                    <Link to='/'> Back To All Posts</Link>
                    <hr></hr>
                    <div className='row showPostHeader'>
                        <div className='col-md-6 posRel'>
                            <h1 className='posAbs'>{post.summary}</h1>
                        </div>
                        <div className='col-md-6'>
                            <img className='showPostImg' src={post.imageURL}/>
                        </div>
                    </div>
                    <hr></hr>
                    <div dangerouslySetInnerHTML={this.createMarkup()} className='showPostContent'></div>
                    {/* <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick} > Delete Post </button> */}
                </div>
            </div>
        );
    };
};

function mapStateToProps({posts}, ownProps) {
    return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);
