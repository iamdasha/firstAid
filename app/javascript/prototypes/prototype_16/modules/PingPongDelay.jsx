import React, { Component } from 'react'

import SC_ToggleButtonSet from '../components/SC_ToggleButtonSet.jsx'
import SC_ToggleButton from '../components/SC_ToggleButton.jsx'
import SC_Slider from '../components/SC_Slider.jsx'

export default class PingPongDelay extends Component {
  constructor(props) {
    super(props)
  }

  handleValueChange = (property, value) => {
    const { instrumentName, handleValueChange } = this.props
    handleValueChange(instrumentName, property, value)
  }

  render() {
    const { settings, handleValueChange } = this.props

    return (
      <div className="PingPongDelay">
        <SC_Slider
          name="Delay Wet"
          min={0}
          max={1}
          step={0.01}
          value={settings.pingPongDelay.wet}
          property="pingPongDelayWet"
          handleChange={handleValueChange}
        />
      </div>
    )
  }
}
