import React, { Component } from "react";

import SC_ToggleButtonSet from "../components/SC_ToggleButtonSet.jsx";
import SC_ToggleButton from "../components/SC_ToggleButton.jsx";
import SC_Slider from "../components/SC_Slider.jsx";

export default class ToneSynth extends Component {
  constructor(props) {
    super(props);
  }

  handleValueChange = (property, value) => {
    const { instrumentName, handleValueChange } = this.props;
    handleValueChange(instrumentName, property, value);
  };

  renderEnvelopeControls = () => {
    const { settings, handleValueChange } = this.props;

    return (
      <div className="EnvSettings">
        <SC_Slider
          name="Attack"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.attack}
          property="synthEnvelopeAttack"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Decay"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.decay}
          property="synthEnvelopeDecay"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Sustain"
          min={0}
          max={1}
          step={0.01}
          value={settings.synth.envelope.sustain}
          property="synthEnvelopeSustain"
          handleChange={this.handleValueChange}
        />

        <SC_Slider
          name="Release"
          min={0}
          max={10}
          step={0.01}
          value={settings.synth.envelope.release}
          property="synthEnvelopeRelease"
          handleChange={this.handleValueChange}
        />
      </div>
    );
  };

  render() {
    const { title, settings } = this.props;
    const options = ["sine", "square", "sawtooth", "triangle", "pwm", "pulse"];

    return (
      <div className="ToneSynth">
        <div className="SynthName">
          <h1>{title}</h1>
        </div>

        <div className="Wave">
          <SC_ToggleButtonSet
            name="Wave Type"
            options={options}
            value={settings.synth.oscillator.type}
            property="synthType"
            handleChange={this.handleValueChange}
          />
        </div>

        <div className="OpenChoose">
        
          <SC_ToggleButton
            text="Envelope ↓"
            isOn={settings.synthUI.envelopeShow}
            handleClick={() =>
              this.handleValueChange(
                "synthShowEnvelope",
                !settings.synthUI.envelopeShow
              )
            }
          />
        </div>

        {settings.synthUI.envelopeShow ? this.renderEnvelopeControls() : ""}
      </div>
    );
  }
}
