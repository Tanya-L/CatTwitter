import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListPost from './Posts/XXXListPost'
import Login from './Auth/Login'

class XXXHome extends Component {

    render() {
        const {isAuthenticated} = this.props
        return (
            <div>
                { isAuthenticated ? <ListPost/> : <Login/> }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
      isAuthenticated: !!state.auth.isAuthenticated
})

export default connect(mapStateToProps)(XXXHome)