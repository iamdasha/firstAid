import React, { Component } from 'react'

import SC_ToggleButton from '../components/SC_ToggleButton.jsx'

export default class Mute extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { settings, handleValueChange } = this.props

    return (
      <div className="Mute">
        <SC_ToggleButton
          text={settings.title}
          isOn={settings.channel.mute}
          handleClick={() =>
            handleValueChange('channelMute', !settings.channel.mute)
          }
        />
      </div>
    )
  }
}