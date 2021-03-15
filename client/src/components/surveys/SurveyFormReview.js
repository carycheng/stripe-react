import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ( {onCancel, formValues, submitSurvey} ) => {
    const reviewFields = _.map(formFields, ({name, label}) => {
        return(
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });
    
    return (
        <div>
            <h5> Please review your entries </h5>
            {reviewFields}
            <button className="yellow darken-3 btn-flat" onClick={ onCancel}>
                Back
            </button>
            <button className="green btn-flat right white-text" onClick={() => actions.submitSurvey(formValues)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state, actions) {
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps)(SurveyFormReview);