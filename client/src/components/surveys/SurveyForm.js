import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

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
                {/* On form submit call onSurveySubmit method to set the showFormReview state which will trigger it to set to true
                    showing the Survey Form */}
                <form onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}>
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
    const errors = {}
    
    // name is a variable representing title, subject, etc... Dot notation
    // can only reference static property names whereas brackets will evaluate
    // the variable name and determine the value. In this case the variable name
    // is name.
    _.each(Fields, ({name}) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value'
        }
    });

    errors.emails = validateEmails(values.emails || '');

    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);