import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

interface Props{
    suggestions:any,
    navigator:any
}
class Autocomplete extends Component<Props>  {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array),
        navigator:PropTypes.instanceOf(Function)
    };

    static defaultProps = {
        suggestions: []
    };

    constructor(props:any) {
        super(props);
        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: ""
        };
    }

    onChange = (e:any) => {
        // @ts-ignore
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input

        const filteredSuggestions = suggestions.filter(
            // @ts-ignore
            suggestion =>
                suggestion.class_associated.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    onHover = (e:any, index:number) => {
        this.setState({
            // activeSuggestion: 0,
            // filteredSuggestions: [],
            // showSuggestions: false,
            userInput: e.currentTarget.innerText,
            activeSuggestion: index
        });
    };

    onClick = (index:number) => {
        this.props.navigator(`/dashboard/classes/${index}/details`)
    }

    onKeyDown = (e:any) => {
        // @ts-ignore
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion].class_associated
            });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        // @ts-ignore
        const {
            onChange,
            onClick,
            onKeyDown,
            // @ts-ignore
            state: {
                // @ts-ignore
                activeSuggestion,
                // @ts-ignore
                filteredSuggestions,
                // @ts-ignore
                showSuggestions,
                // @ts-ignore
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {

                suggestionsListComponent = (
                    // @ts-ignore
                    <ul className="suggestions text-white absolute bg-gray-800 w-full rounded-b-md ring-2 ring-green-800 cursor-pointer">
                        {/*// @ts-ignore*/}
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "bg-purple-800";
                            }

                            return (
                                <li className={className} key={index}
                                    onMouseOver={(e)=> this.onHover(e,index)}
                                    onClick={()=>onClick(suggestion.id)}>
                                    {suggestion.class_associated}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    // @ts-ignore
                    <div class="no-suggestions absolute">
                        <em>No suggestions, you're on your own!</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <input
                    type={"text"}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    className={"bg-gray-800 pl-1 py-0.5 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"}
                />
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

export default Autocomplete;
