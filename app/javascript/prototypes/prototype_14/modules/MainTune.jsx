import React, { Component } from 'react'

import SC_ToggleButtonSet from '../components/SC_ToggleButtonSet.jsx'
import SC_Slider from '../components/SC_Slider.jsx'

export default class MainTune extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const text = this.props.settings.title
    const { settings, handleValueChange } = this.props
    const options = ['sine', 'square', 'sawtooth', 'triangle']

    return (
      <div className="MainTune">

        <h2>{text}</h2>

        <SC_ToggleButtonSet
          name="Wave"
          options={options}
          value={settings.synth.oscillator.type}
          property="synthType"
          handleChange={handleValueChange}
        />

        <SC_Slider
          name="Sustain"
          min={0}
          max={1}
          step={0.01}
          value={settings.synth.envelope.sustain}
          property="synthEnvelopeSustain"
          handleChange={handleValueChange}
        />

        <SC_Slider
          name="Release"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.release}
          property="synthEnvelopeRelease"
          handleChange={handleValueChange}
        />

        <SC_Slider
          name="Volume"
          min={-100}
          max={20}
          step={1}
          value={settings.synth.volume}
          property="synthVolume"
          handleChange={handleValueChange}
        />
      </div>
    )
  }
}