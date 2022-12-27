import React, { Component } from 'react'
import * as Tone from 'tone'
import * as firstSettings from '../tunes/firstDrum.js'
import * as secondSettings from '../tunes/secondDrum.js'
import * as thirdSettings from '../tunes/thirdDrum.js'
import * as fourthSettings from '../tunes/fourthDrum.js'
import SC_Button from '../components/SC_Button'
import Muted from './Muted'

let firstSynth
let channelFirst

let secondSynth
let channelSecond

let thirdSynth
let channelThird

let fourthSynth
let channelFourth

export default class Drums extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        firstSettings, secondSettings, thirdSettings, fourthSettings
      }
    }
  
    handleDrumsStart = () => {
        const { firstSettings, secondSettings, thirdSettings, fourthSettings } = this.state
        //
        firstSynth = new Tone.Synth(firstSettings.synth)

        channelFirst = new Tone.Channel(firstSettings.channel).toDestination()
        firstSynth.chain(channelFirst)

        const firstPart = new Tone.Part((time, note) => {
          firstSynth.triggerAttackRelease(
            note.noteName,
            note.duration,
            time,
            note.velocity
          )
        }, firstSettings.sequence.steps).start(0)
    
        firstPart.loopEnd = firstSettings.sequence.duration
        firstPart.loop = true
        //
        secondSynth = new Tone.Synth(secondSettings.synth)

        channelSecond = new Tone.Channel(secondSettings.channel).toDestination()
        secondSynth.chain(channelSecond)

        const secondPart = new Tone.Part((time, note) => {
          secondSynth.triggerAttackRelease(
            note.noteName,
            note.duration,
            time,
            note.velocity
          )
        }, secondSettings.sequence.steps).start(0)
    
        secondPart.loopEnd = secondSettings.sequence.duration
        secondPart.loop = true
        //
        thirdSynth = new Tone.Synth(thirdSettings.synth)

        channelThird = new Tone.Channel(thirdSettings.channel).toDestination()
        thirdSynth.chain(channelThird)

        const thirdPart = new Tone.Part((time, note) => {
          thirdSynth.triggerAttackRelease(
            note.noteName,
            note.duration,
            time,
            note.velocity
          )
        }, thirdSettings.sequence.steps).start(0)
    
        thirdPart.loopEnd = thirdSettings.sequence.duration
        thirdPart.loop = true
        //
        fourthSynth = new Tone.Synth(fourthSettings.synth)

        channelFourth = new Tone.Channel(fourthSettings.channel).toDestination()
        fourthSynth.chain(channelFourth)

        const fourthPart = new Tone.Part((time, note) => {
          fourthSynth.triggerAttackRelease(
            note.noteName,
            note.duration,
            time,
            note.velocity
          )
        }, fourthSettings.sequence.steps).start(0)
    
        fourthPart.loopEnd = fourthSettings.sequence.duration
        fourthPart.loop = true
      }

      handleMute = (property, value) => {
        const { firstSettings } = this.state
    
        if (property === 'channelMute') {
          channelFirst.mute = value
          firstSettings.channel.mute = value
        } 
    
        this.setState({
          firstSettings
        })
      }
      handleMuteTwo = (property, value) => {
        const { secondSettings } = this.state
    
        if (property === 'channelMute') {
          channelSecond.mute = value
          secondSettings.channel.mute = value
        } 
    
        this.setState({
          secondSettings
        })
      }
      handleMuteThird = (property, value) => {
        const { thirdSettings } = this.state
    
        if (property === 'channelMute') {
          channelThird.mute = value
          thirdSettings.channel.mute = value
        } 
    
        this.setState({
          thirdSettings
        })
      }
      handleMuteFourth = (property, value) => {
        const { fourthSettings } = this.state
    
        if (property === 'channelMute') {
          channelFourth.mute = value
          fourthSettings.channel.mute = value
        } 
    
        this.setState({
          fourthSettings
        })
      }
  
    render(){
        const { firstSettings, secondSettings, thirdSettings, fourthSettings} = this.state

      return (
        <div className="Drums">
        <SC_Button
            text="LOOP"
            handleClick={this.handleDrumsStart}
          />
            <div className="DrumSamples">
              <Muted
              settings = {firstSettings}
              handleValueChange = {this.handleMute}
              />
              <Muted
                settings = {secondSettings}
                handleValueChange = {this.handleMuteTwo}
              />
              <Muted
                settings = {thirdSettings}
                handleValueChange = {this.handleMuteThird}
              />
              <Muted
                settings = {fourthSettings}
                handleValueChange = {this.handleMuteFourth}
              />
          </div>
        </div>
      )

    }
}
