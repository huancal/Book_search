import React from 'react';
import Header from '../components/Header'
import Results from "../components/Results"
import API from "../utility/API"


class Saved extends React.Component {

    state = {
        saved: [],
        btnColor: { background: "yellow" }
    }

    componentDidMount() {
        this.getSaved()
    }

    getSaved = () => {
        API.getAllBooks().then(res => {
            this.setState({ saved: res.data })
        })
    }
    render() {
        return (
            <div>
                <Saved />
                <Results
                    books={this.state.saved}
                    status="Saved Books:"
                    buttonText="Delete"
                    buttonColor={this.state.btnColor}
                    get Saved={this.getSaved}
                />
            </div>
        )
    }
}

export default Saved