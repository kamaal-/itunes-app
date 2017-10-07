import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import IsolatedScroll from 'react-isolated-scroll'
import { searchTextUpdated } from '../services/actions/'
import { connect } from 'react-redux'

import './Search.css'

//https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, suggestions) => {

    const escapedValue = escapeRegexCharacters(value.trim())
    console.log(escapedValue)

    if (escapedValue === '') {
        return []
    }

    const regex = new RegExp('^' + escapedValue, 'i')

    return suggestions.filter(suggestion => regex.test(suggestion.name))
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => {
    console.log(suggestion)
    return suggestion.name
}

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
)


const renderSuggestionsContainer = ({ containerProps, children }) => {
    const { ref, ...restContainerProps } = containerProps;
    const callRef = isolatedScroll => {
        if (isolatedScroll !== null) {
            ref(isolatedScroll.component);
        }
    };

    return (
        <IsolatedScroll ref={callRef} {...restContainerProps}>
            {children}
        </IsolatedScroll>
    );
}


class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filteredSuggestions: []
        }
    }

    /*
     * prop types and default prop
     */
    static propTypes = {
        searchTextUpdated: PropTypes.func, // will be update redux action
        searchText: PropTypes.string // will pass from redux, so can be auto fill from redux
    }

    static defaultProps = {
        searchText: ''
    }

    onSuggestionsFetchRequested = ({value}) => {
        const { suggestions } = this.props
        this.setState({ filteredSuggestions: getSuggestions(value, suggestions)})
    }

    onSuggestionsClearRequested = () => { this.setState({ filteredSuggestions: []}) }

    render(){
        const { filteredSuggestions } = this.state
            ,{ searchText } = this.props
            , inputProps = {
            placeholder: 'Search...',
            value: searchText,
            onChange: this._searchOnChange
        }

        return(
            <section className="search">
                <Autosuggest
                    suggestions={filteredSuggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    renderSuggestionsContainer={renderSuggestionsContainer}
                    inputProps={inputProps}
                />
            </section>
        )
    }

    _searchOnChange = (event, { newValue }) => {
        const { searchTextUpdated } = this.props
        // https://github.com/moroshko/react-autosuggest/issues/368
        const value = newValue || event.target.value
        searchTextUpdated(value)
    }

}

const mapStateToProps = (state) => {
    return {
        searchText: state.searchText,
        suggestions: state.suggestions // suggestions are collected from each fetch result
    }
}

export default connect(mapStateToProps, { searchTextUpdated})(Search)
