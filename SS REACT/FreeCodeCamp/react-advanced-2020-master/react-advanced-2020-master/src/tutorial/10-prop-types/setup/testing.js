// rfcep
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const testing = (props) => {
  return (
    <div>testing</div>
  )
}

testing.propTypes = {
  second: PropTypes.third
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(testing)
