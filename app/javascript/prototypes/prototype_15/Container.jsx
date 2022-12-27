import * as Tone from 'tone'
import React, { Component } from 'react'

import * as bassSettings from './tunes/bass.js'
import * as melodySettings from './tunes/melody.js'
import * as drumsSettings from './tunes/drums.js'

import ToneSynth from './modules/ToneSynth.jsx'
import Channel from './modules/Channel.jsx'

import SC_Button from './components/SC_Button'
import SC_Slider from './components/SC_Slider'

let bassSynth
let bassChorus
let bassPingPongDelay

let melodySynth
let melodyChorus
let melodyPingPongDelay
let melodyDistortion
let melodyFreeverb

let samplerChannel

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bassSettings,
      melodySettings,
      drumsSettings
    }
  }

  handleStart = () => {
    const { bassSettings, melodySettings, drumsSettings } = this.state

    //
    //
    bassSynth = new Tone.Synth(bassSettings.synth)
    bassChorus = new Tone.Chorus(bassSettings.chorus).start()

    bassPingPongDelay = new Tone.PingPongDelay(
      bassSettings.pingPongDelay
    ).toDestination()

    bassSynth.chain(bassChorus, bassPingPongDelay)

    const bassPart = new Tone.Part((time, note) => {
      bassSynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, bassSettings.sequence.steps).start(0)

    bassPart.loopEnd = bassSettings.sequence.duration
    bassPart.loop = true
    //
    //
    melodySynth = new Tone.Synth(melodySettings.synth)
    melodyChorus = new Tone.Chorus(melodySettings.chorus).start()
    melodyDistortion = new Tone.Distortion(melodySettings.distortion)
    melodyFreeverb = new Tone.Freeverb(melodySettings.freeverb).toDestination()

    melodyPingPongDelay = new Tone.PingPongDelay(
      melodySettings.pingPongDelay
    ).toDestination()

    melodySynth.chain(
      melodyChorus,
      melodyPingPongDelay,
      melodyDistortion,
      melodyFreeverb
    )

    const melodyPart = new Tone.Part((time, note) => {
      melodySynth.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, melodySettings.sequence.steps).start(0)

    melodyPart.loopEnd = melodySettings.sequence.duration
    melodyPart.loop = true
    //
    //
    const sampler = new Tone.Sampler({
      urls: {
        A1: '00001-Linn-9000-BassDrumrum1.mp3',
        A2: '00017-Linn-9000-Snare.mp3'
      },
      baseUrl: 'http://localhost:3000/samples/'
      // onload: () => {
      //   sampler.triggerAttackRelease(['A1', 'A2', 'A1', 'A2'], 0.5)
      // }
    })

    samplerChannel = new Tone.Channel(drumsSettings.channel).toDestination()

    sampler.chain(samplerChannel)

    const drumsPart = new Tone.Part((time, note) => {
      sampler.triggerAttackRelease(
        note.noteName,
        note.duration,
        time,
        note.velocity
      )
    }, drumsSettings.sequence.steps).start(0)

    drumsPart.loopEnd = drumsSettings.sequence.duration
    drumsPart.loop = true

    Tone.Transport.start()
  }

  handleBassValueChange = (property, value) => {
    const { bassSettings } = this.state

    if (property === 'synthType') {
      bassSynth.oscillator.type = value
      bassSettings.synth.oscillator.type = value
    } else if (property === 'synthEnvelopeAttack') {
      bassSynth.envelope.attack = value
      bassSettings.synth.envelope.attack = value
    } else if (property === 'synthEnvelopeDecay') {
      bassSynth.envelope.decay = value
      bassSettings.synth.envelope.decay = value
    } else if (property === 'synthEnvelopeSustain') {
      bassSynth.envelope.sustain = value
      bassSettings.synth.envelope.sustain = value
    } else if (property === 'synthEnvelopeRelease') {
      bassSynth.envelope.release = value
      bassSettings.synth.envelope.release = value
    } else if (property === 'pingPongDelayWet') {
      bassPingPongDelay.wet.value = value
      bassSettings.pingPongDelay.wet = value
    } else if (property === 'pingPongDelayDelay') {
      bassPingPongDelay.delayTime.value = value
      bassSettings.pingPongDelay.delayTime = value
    } else if (property === 'chorusWet') {
      bassChorus.wet.value = value
      bassSettings.chorus.wet = value
    } else if (property === 'chorusFrequency') {
      bassChorus.frecuency.value = value
      bassSettings.chorus.frequency = value
    } else if (property === 'chorusSpread') {
      bassChorus.spread = value
      bassSettings.chorus.spread = value
    }

    this.setState({
      bassSettings
    })
  }

  handleMelodyValueChange = (property, value) => {
    const { melodySettings } = this.state

    if (property === 'synthType') {
      melodySynth.oscillator.type = value
      melodySettings.synth.oscillator.type = value
    } else if (property === 'synthEnvelopeAttack') {
      melodySynth.envelope.attack = value
      melodySettings.synth.envelope.attack = value
    } else if (property === 'synthEnvelopeDecay') {
      melodySynth.envelope.decay = value
      melodySettings.synth.envelope.decay = value
    } else if (property === 'synthEnvelopeSustain') {
      melodySynth.envelope.sustain = value
      melodySettings.synth.envelope.sustain = value
    } else if (property === 'synthEnvelopeRelease') {
      melodySynth.envelope.release = value
      melodySettings.synth.envelope.release = value
    } else if (property === 'pingPongDelayWet') {
      melodyPingPongDelay.wet.value = value
      melodySettings.pingPongDelay.wet = value
    } else if (property === 'pingPongDelayDelay') {
      melodyPingPongDelay.delayTime.value = value
      melodySettings.pingPongDelay.delayTime = value
    } else if (property === 'chorusWet') {
      melodyChorus.wet.value = value
      melodySettings.chorus.wet = value
    } else if (property === 'chorusFrequency') {
      melodyChorus.frecuency = value
      melodySettings.chorus.frequency = value
    } else if (property === 'chorusSpread') {
      melodyChorus.spread = value
      melodySettings.chorus.spread = value
    } else if (property === 'distortionWet') {
      melodyDistortion.wet.value = value
      melodySettings.distortion.wet = value
    } else if (property === 'distortion') {
      melodyDistortion.distortion = value
      melodySettings.distortion.distortion = value
    } else if (property === 'freeverbWet') {
      melodyFreeverb.wet.value = value
      melodySettings.freeverb.wet = value
    }

    this.setState({
      melodySettings
    })
  }

  handleDrumsValueChange = (property, value) => {
    const { drumsSettings } = this.state

    if (property === 'channelVolume') {
      samplerChannel.volume.value = value
      drumsSettings.channel.volume = value
    } else if (property === 'channelMute') {
      samplerChannel.mute = value
      drumsSettings.channel.mute = value
    }

    this.setState({
      drumsSettings
    })
  }

  render() {
    const { melodySettings, bassSettings, drumsSettings } = this.state

    return (
      <div className="Container">
        <div className="Header">
          <SC_Button text="play" handleClick={this.handleStart} />
        </div>
        <div className="Synth">
          <div className="Left">
            <div className="SynthName">
              <h1>
                Vitamin<br></br>synth
              </h1>
            </div>
            <ToneSynth
              settings={melodySettings}
              handleValueChange={this.handleMelodyValueChange}
            />
            <div className="PingPong">
              <h3>
                Ping Pong<br></br>delay
              </h3>
              <SC_Slider
                name="Wet"
                min={0}
                max={1}
                step={0.01}
                value={melodySettings.pingPongDelay.wet}
                property="pingPongDelayWet"
                handleChange={this.handleMelodyValueChange}
              />
              <SC_Slider
                name="Delay"
                min={0}
                max={1}
                step={0.01}
                value={melodySettings.pingPongDelay.delayTime}
                property="pingPongDelayDelay"
                handleChange={this.handleMelodyValueChange}
              />
            </div>
            <div className="Chorus">
              <h3>Chorus</h3>
              <SC_Slider
                name="Wet"
                min={0}
                max={1}
                step={0.01}
                value={melodySettings.chorus.wet}
                property="chorusWet"
                handleChange={this.handleMelodyValueChange}
              />
              <SC_Slider
                name="Frequency"
                min={0}
                max={100}
                step={0.01}
                value={melodySettings.chorus.frequency}
                property="chorusFrequency"
                handleChange={this.handleMelodyValueChange}
              />
              <SC_Slider
                name="Spread"
                min={0}
                max={360}
                step={1}
                value={melodySettings.chorus.spread}
                property="chorusSpread"
                handleChange={this.handleMelodyValueChange}
              />
            </div>
            <div className="Distortion">
              <h3>Distortion</h3>
              <SC_Slider
                name="Wet"
                min={0}
                max={1}
                step={0.01}
                value={melodySettings.distortion.wet}
                property="distortionWet"
                handleChange={this.handleMelodyValueChange}
              />
              <SC_Slider
                name="distortion"
                min={0}
                max={100}
                step={0.01}
                value={melodySettings.distortion.distortion}
                property="distortion"
                handleChange={this.handleMelodyValueChange}
              />
            </div>
            <div className="Freeverb">
              <h3>Freeverb</h3>
              <SC_Slider
                name="Freeverb"
                min={0}
                max={1}
                step={0.01}
                value={melodySettings.freeverb.wet}
                property="freeverbWet"
                handleChange={this.handleMelodyValueChange}
              />
            </div>
          </div>

          <div className="Right">
            <div className="SynthName">
              <h1>
                Mineral<br></br>synth
              </h1>
            </div>
            <ToneSynth
              settings={bassSettings}
              handleValueChange={this.handleBassValueChange}
            />
            <div className="PingPong">
              <h3>
                Ping Pong<br></br>delay
              </h3>
              <SC_Slider
                name="Wet"
                min={0}
                max={1}
                step={0.01}
                value={bassSettings.pingPongDelay.wet}
                property="pingPongDelayWet"
                handleChange={this.handleBassValueChange}
              />
              <SC_Slider
                name="Delay"
                min={0}
                max={1}
                step={0.01}
                value={bassSettings.pingPongDelay.delayTime}
                property="pingPongDelayDelay"
                handleChange={this.handleBassValueChange}
              />
            </div>
            <div className="Chorus">
              <h3>Chorus</h3>
              <SC_Slider
                name="Wet"
                min={0}
                max={1}
                step={0.01}
                value={bassSettings.chorus.wet}
                property="chorusWet"
                handleChange={this.handleBassValueChange}
              />
              <SC_Slider
                name="Frequency"
                min={0}
                max={100}
                step={0.01}
                value={bassSettings.chorus.frequency}
                property="chorusFrequency"
                handleChange={this.handleBassValueChange}
              />
              <SC_Slider
                name="Spread"
                min={0}
                max={360}
                step={1}
                value={bassSettings.chorus.spread}
                property="chorusSpread"
                handleChange={this.handleBassValueChange}
              />
            </div>
            <div className="Samples">
              <Channel
                settings={drumsSettings}
                handleValueChange={this.handleDrumsValueChange}
              />
              <Channel
                settings={drumsSettings}
                handleValueChange={this.handleDrumsValueChange}
              />
              <Channel
                settings={drumsSettings}
                handleValueChange={this.handleDrumsValueChange}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
