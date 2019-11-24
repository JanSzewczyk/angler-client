import React, { Component } from 'react'

class FishingTrip extends Component {

    componentDidMount() {
        console.log(this.props.match.params.id)
    }
    render() {
        return (
            <div>
                elooo
            </div>
        )
    }
}

export default FishingTrip
