import React, { Component } from 'react'

import SC_ToggleButtonSet from '../components/SC_ToggleButtonSet.jsx'
import SC_Slider from '../components/SC_Slider.jsx'

export default class ToneSynth extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { settings, handleValueChange } = this.props
    const options = ['sine', 'square', 'sawtooth', 'triangle', 'pwm', 'pulse']

    return (
      <div className="ToneSynth">
        <div className="Wave">
          <SC_ToggleButtonSet
            name="Wave Type"
            options={options}
            value={settings.synth.oscillator.type}
            property="synthType"
            handleChange={handleValueChange}
          />
        </div>
        <div className="Envelope">
          <h3>Envelope</h3>
          <div className="Row">
            <div className="Column">
              <SC_Slider
                name="A"
                min={0}
                max={10}
                step={0.01}
                value={settings.synth.envelope.attack}
                property="synthEnvelopeAttack"
                handleChange={handleValueChange}
              />

              <SC_Slider
                name="D"
                min={0}
                max={10}
                step={0.01}
                value={settings.synth.envelope.decay}
                property="synthEnvelopeDecay"
                handleChange={handleValueChange}
              />
            </div>

            <div className="Column">
              <SC_Slider
                name="S"
                min={0}
                max={1}
                step={0.01}
                value={settings.synth.envelope.sustain}
                property="synthEnvelopeSustain"
                handleChange={handleValueChange}
              />

              <SC_Slider
                name="R"
                min={0}
                max={10}
                step={0.01}
                value={settings.synth.envelope.release}
                property="synthEnvelopeRelease"
                handleChange={handleValueChange}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
