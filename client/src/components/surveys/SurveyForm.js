import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';

const Fields = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails'}
];

// Main survey form
class SurveyForm extends Component {
    renderFields() {
        return _.map(Fields, ({ label, name }) => {
            return < Field key={ name} component={SurveyField} type="text" label={ label } name={ name } />
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    { this.renderFields() }
                    < Link to='/surveys' className="red btn-flat white-text">
                        Cancel
                    </ Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    console.log('Values', values);
    const errors = {}
    
    // name is a variable representing title, subject, etc... Dot notation
    // can only reference static property names whereas brackets will evaluate
    // the variable name and determine the value. In this case the variable name
    // is name.
    _.each(Fields, ({name}) => {
        console.log('ERROR');
        console.log('Name', name);
        if (!values[name]) {
            errors[name] = 'You must provide a value'
        }
    });

    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm'
})(SurveyForm);