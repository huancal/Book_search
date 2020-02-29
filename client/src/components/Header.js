import React from 'react'
import "../assets/header.css"




class Header extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleSearch(this.props.search)
    }
    render() {
        return (
            <div className="header">
                <h1>Google Book Search</h1>
                <h2>Search and save your favorite Books</h2>
                <form>
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Find your Book" value={this.props.search} onChange={this.props.updateInput} />
                        <button className="btn input-group-append" onClick={this.handleSubmit}>Search</button>
                    </div>
                </form>
            </div>
        )
    }
}



export default Header
