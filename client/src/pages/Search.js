import React from 'react';
import Header from "../components/Header"
import Results from "../components/Results"
import API from "../utility/API"
import ReactDOM from "react-dom"

class Search extends Component {
    h

    state = {
        books: [],
        search: "",
        status: "search for a Book"
    }

    handleSearch = (search) => {
        API.searchBooks(search)
            .then(res => {
                this.setState({ books: res.data, status: "search results" })
                console.log(this.state);
                const results = ReactDOM.findDOMNode(this.refs.test);
                results.scrollIntoView({ behavior: "smooth" });
            })
    }
    updateIput = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    componentWillUnmount() {
        API.deleteAllUnsaved()
    }

    render() {
        return (
            <div>
                <Header
                    handleSearch={this.handleSearch}
                    search={this.state.search}
                    updateInput={this.updateInput}
                />
                <div ref="test" >
                    <Results
                        books={this.state.books}
                        status={this.state.status}
                        buttonText="Save"
                    />
                </div>
            </div>
        )
    }
}

export default Search