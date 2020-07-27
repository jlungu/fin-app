import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

const stocks =[
    
]


//HOW should the autocomplete get suggestions?
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : stocks.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  
  //How the autosuggest should populate names.
  const getSuggestionValue = suggestion => suggestion.name;
  
  //Rendering the actual names in div!
  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

export class SearchBarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      suggestions: [],
    };
  }

  componentDidMount() {
    //API Call to get list of supported stocks!
    fetch(
      "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=brain17rh5rbgnjpuck0"
    )
      .then((res) => res.json())
      .then((data) => {
        var sugg = [];
        //Want array of this structure; SYMBOL - DESCRIPTION
        data.forEach(function (item, index, array) {
          sugg.push(
            data[index].displaySymbol + " - " + data[index].description
          );
        });
        //Setting our suggestions state to this new array!
        this.setState({
          suggestions: sugg,
        });
      });
  }

  //Autosuggest func #1, updating value to fit new suggestions
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    });
  };

  //Autosuggest func #2, getting suggestions on a 'change'
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  //Autosuggest func #3, clearing suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Stock Ticker or Name...",
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
export default SearchBarComponent;
