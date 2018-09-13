import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {createPost} from '../actions';

class PostsNew extends Component {
    renderInputField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ?  'has-danger' : ''}`
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className='form-control' type={field.type} {...field.input}/>
                <div className='text-help'>
                    { touched ? error : ''}
                </div>
            </div>
        );
    }
    renderDescriptionField(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <textarea className="form-control" rows="8" id="description" {...field.input}></textarea>
            </div>
        )
    }

    onSubmit = (values) => {   
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }


    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field name='day' component={this.renderInputField} label='Date' type='Date'/>
                <Field name='summary' component={this.renderInputField} label='Summary' type='text'/>
                <Field name='imageURL' component={this.renderInputField} label='Image' type='text'/>
                <div className='form-group'>
                    <label>Language</label>
                    <Field name='language' component='select' className='form-control' >
                        <option>Select Language</option>
                        <option>HTML</option>
                        <option>CSS</option>
                        <option>JavaScript</option>
                        <option>Ruby</option>
                        <option>Dart</option>
                        <option>Job</option>
                    </Field>
                </div>
                <div className='form-group'>
                    <label>Skill</label>
                    <Field name='skill' component='select' className='form-control'>
                        <option>Select Skills</option>
                        <option>Fundementals</option>
                        <option>Framework</option>
                        <option>Project</option>
                        <option>Job</option>
                    </Field>
                    
                </div>
                <Field name='description' component={this.renderDescriptionField} label='Description'/>
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link className='btn btn-danger' to=''>Nevermind</Link>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};
    //Validate errors
    if (!values.day){
        errors.day = "Must enter date"
    }
    if (!values.summary){
        errors.summary = "Must enter Summary"
    }
    if (!values.imageURL){
        errors.imageURL = "Must enter image Url"
    }

    return errors;
};


export default reduxForm({
    validate, 
    form: 'PostsNewForm'
    })(
        connect(null, {createPost})(PostsNew)
    );


