import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    // React State, which is different from Redux State. Think of Redux
    // state as a global database. React State is only used locally for a
    // particular component it is attached to. Great to use if data does
    // not need to be sent to other places.
    // constructor(props) {
    //     super(props);

    //     this.state = { new: true };
    // }
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview === true) {
            return <SurveyFormReview
                onCancel={() => this.setState({ showFormReview: false})}
            />;
        }

        return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);