var React = require('react')
var Popover = require('./popover-follow')
var Slider = require('./slider-core')
var PropTypes = require('prop-types');
var isFunction = require('lodash/isFunction')
var classnames = require('classnames')
var isUndefined = require('lodash/isUndefined')

module.exports = React.createClass({
  displayName: 'nw-slider',
  propTypes: {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    ticks: PropTypes.bool,
    onChange: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    triggerOnChangeWhileDragging: PropTypes.bool,
    markerLabel: PropTypes.array,
    displayFollowerPopover: PropTypes.bool
  },

  getInitialState: function () {
    return {
      rtPosition: undefined,
      handleWidth: undefined
    }
  },

  componentDidUpdate: function () {
    if (isUndefined(this.state.handleWidth) && this.refs.slider.refs.handle) {
      this.setState({handleWidth: this.refs.slider.refs.handle.offsetWidth}) // eslint-disable-line
    }
  },

  handleSliderChange: function (value, rtPosition) {
    if (isFunction(this.props.onChange)) {
      // Send the value and position of the slider in case the container needs it.
      this.props.onChange(value, rtPosition)
    }
    this.setState({rtPosition})
  },

  render: function () {
    var trackWidth = this.refs.slider && this.refs.slider.state.trackWidth
    var handleWidth = this.state.handleWidth
    var dragging = this.refs.slider && this.refs.slider.state.dragging
    var follower = (this.props.displayFollowerPopover && !isUndefined(this.state.rtPosition))
      ? (<Popover trackWidth={trackWidth} handleWidth={handleWidth} value={this.props.value} position={this.state.rtPosition} />)
      : (<span/>)
    return (
      <div className={classnames('slider-container-component', {dragging: dragging})} >
        <Slider
          ref='slider'
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          onChange={this.handleSliderChange}
          onDragStart={this.props.onDragStart}
          onDragEnd={this.props.onDragEnd}
          triggerOnChangeWhileDragging={this.props.triggerOnChangeWhileDragging}
          ticks={this.props.ticks}
          markerLabel={this.props.markerLabel} />
        {follower}
      </div>
    )
  }
})
