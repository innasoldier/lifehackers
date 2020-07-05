import React from 'react'
import withAuthorization from 'components/hoc/withAuthorization'
import ServiceItem from 'components/service/ServiceItem'
import { connect } from 'react-redux'
import { fetchSentOffers } from 'actions'

class SentOffers extends React.Component {

    componentDidMount() {
        const { auth } = this.props
        this.props.dispatch(fetchSentOffers(auth.user.uid))
    }

    render() {
        const { offers } = this.props
        return (
            <div className="container">
                <div className="content-wrapper">
                    <h1 className="title">Sent Offers</h1>
                    <div className="columns">
                        { offers.map(offer => (
                            <div
                                key={offer.id}
                                className="column is-one-third">
                                <ServiceItem
                                    noButton
                                    className="offer-card"
                                    service={offer.service}>
                                    <div className="tag is-large">
                                        {offer.status}
                                    </div>
                                    <hr />
                                    <div className="service-offer">
                                        <div>
                                            <span className="label">To User:</span> {offer.toUser.fullName}
                                        </div>
                                        <div>
                                            <span className="label">Note:</span> {offer.note}
                                        </div>
                                        <div>
                                            <span className="label">Price:</span> ${offer.price}
                                        </div>
                                        <div>
                                            <span className="label">Time:</span> {offer.time} hours
                                        </div>
                                    </div>
                                </ServiceItem>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({offers}) => ({ offers: offers.sent })

export default
withAuthorization(
    connect(mapStateToProps)(SentOffers))