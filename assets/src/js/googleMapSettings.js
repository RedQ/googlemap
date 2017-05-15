import React, { Component } from 'react';
import { render } from 'react-dom';
import { http } from './utility/helper';

const ReuseForm = __REUSEFORM__;
const Loader = __REUSEFORM_COMPONENT__['ReLoader'];
const fields = [
  {
    'id': 'enable_google_map',
    'type': 'select',
    'label': 'Enable Google Map',
    'param': 'enable_google_map',
    'value': '',
    options: {
      enable: 'Enable',
      disable: 'Disable',
    },
  },
  {
    'id': 'enable_rich_marker',
    'type': 'select',
    'label': 'Enable Rich Marker',
    'param': 'enable_rich_marker',
    'value': '',
    options: {
      enable: 'Enable',
      disable: 'Disable',
    },
  },
  {
    'id': 'marker_cluster',
    'type': 'select',
    'label': 'Enable Map Marker Cluster',
    'param': 'marker_cluster',
    'value': '',
    options: {
      enable: 'Enable',
      disable: 'Disable',
    },
  },
  {
    'id': 'js_info_bubble',
    'type': 'select',
    'label': 'Enable Js Info Bubble',
    'param': 'js_info_bubble',
    'value': '',
    options: {
      enable: 'Enable',
      disable: 'Disable',
    },
  },
  {
    'id': 'google_map_api_key',
    'type': 'text',
    'label': 'Google Map API Key',
    'param': 'google_map_api_key',
    'value': '',
    'placeholder': 'enter your map api key here...',
  },
  {
    'id': 'save_map_settings',
    'type': 'compoundbutton',
    'label':  'Save',
    'getallData': 'true', // optional
    'getFormData': 'true', // optional
    'buttonType': 'submit', // optional
  }
];

export default class GoogleMapSettings extends Component {
  constructor(props) {
    super(props);
    let preValue = {};
    try {
      preValue = GOOGLE_MAP_ADMIN.GOOGLE_MAP_SETTINGS ? JSON.parse(GOOGLE_MAP_ADMIN.GOOGLE_MAP_SETTINGS) : {};
    } catch (err) {
      console.log(err);
    }
    this.state = {
      preValue,
      loading: 'false',
    };
  }
  render() {
    const { preValue } = this.state;
    const getUpdatedFields = (data) => {
      const newData = {};
      fields.forEach((field) => {
        const id = field.id.replace('ReGoogleMapSettings__', '');
        if (data[id] === undefined) {
          newData[id] = field.value;
        } else {
          newData[id] = data[id];
        }
      });
      document.getElementById('_google_map_settings').value = JSON.stringify(newData);
    };
    const saveGoogleMapSettings = (formData) => {
      let data = {};
      const self = this;
      self.setState({loading: 'true'});
      data.mapSettings = formData.data ? JSON.stringify(formData.data) : '';
      data.action_type = 'save_google_map_settings';
      http
       .post(data)
       .end((err, res) => {
          self.setState({loading: 'false'});
       });
    }
    const reuseFormOption = {
      reuseFormId: 'ReGoogleMapSettings',
      fields,
      getUpdatedFields,
      errorMessages: {},
      getButtonData: saveGoogleMapSettings,
      preValue,
    };
    return (<div>
      {this.state.loading === 'true' ? <Loader /> : ''}
      <ReuseForm {...reuseFormOption} />
    </div>);
  }
}

const documentRoot = document.getElementById('google_map_settings');
if (documentRoot) {
  render(<GoogleMapSettings />, documentRoot);
}
