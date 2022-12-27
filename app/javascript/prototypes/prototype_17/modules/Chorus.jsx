import React, { Component } from 'react'

import SC_ToggleButtonSet from '../components/SC_ToggleButtonSet.jsx'
import SC_ToggleButton from '../components/SC_ToggleButton.jsx'
import SC_Slider from '../components/SC_Slider.jsx'

export default class Chorus extends Component {
  constructor(props) {
    super(props)
  }

  handleValueChange = (property, value) => {
    const { instrumentName, handleValueChange } = this.props
    handleValueChange(instrumentName, property, value)
  }

  render() {
    const { settings, handleValueChange } = this.props
    const options = ['sine', 'square', 'sawtooth', 'triangle']

    return (
      <div className="Chorus">
        <SC_Slider
          name="Wet"
          min={0}
          max={1}
          step={0.01}
          value={settings.chorus.wet}
          property="chorusWet"
          handleChange={handleValueChange}
        />

        <SC_ToggleButtonSet
          name="Type"
          options={options}
          value={settings.chorus.type}
          property="chorusType"
          handleChange={handleValueChange}
        />

        <SC_Slider
          name="Delay Time"
          min={0}
          max={1}
          step={0.01}
          value={settings.chorus.delayTime.value}
          property="chorusDelayTime"
          handleChange={handleValueChange}
        />

        <SC_Slider
          name="Frequency"
          min={0}
          max={100}
          step={0.01}
          value={settings.chorus.frequency.value}
          property="chorusFrequency"
          handleChange={handleValueChange}
        />

        <SC_Slider
          name="Depth"
          min={0}
          max={1}
          step={0.01}
          value={settings.chorus.depth}
          property="chorusDepth"
          handleChange={handleValueChange}
        />

        <SC_Slider
          name="Spread"
          min={0}
          max={1}
          step={0.01}
          value={settings.chorus.spread}
          property="chorusSpread"
          handleChange={handleValueChange}
        />
      </div>
    )
  }
}
