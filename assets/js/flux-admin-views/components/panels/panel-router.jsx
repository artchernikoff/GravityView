var React = require('react');
var ReactTooltip = require('react-tooltip');

var SettingsMenuPanel = require('./settings-menu-panel.jsx');
var SettingsSubPanel = require('./settings-sub-panel.jsx');

var ViewConstants = require('../../constants/view-constants.js');
var ViewActions = require('../../actions/view-actions.js');
var PanelStore = require('../../stores/panel-store.js');
var SettingsStore = require('../../stores/settings-store.js');


var PanelRouter = React.createClass({

    getState: function() {
        return {
            currentPanel: PanelStore.getActivePanel(), // which panel id is open
            returnPanel: PanelStore.getReturnPanel(), // when the go back panel control links
            settingsValues: SettingsStore.getAllValues(),
            settingsInputs: SettingsStore.getInputs(),
            settingsSections: SettingsStore.getSections()
        };
    },

    getInitialState: function() {
        return this.getState();
    },

    /**
     * Panel Store communications
     */
    onStoreChange: function() {
        this.setState( this.getState() );
    },

    componentDidMount: function() {
        PanelStore.addChangeListener( this.onStoreChange );
        SettingsStore.addChangeListener( this.onStoreChange );

        // Trigger Flux to get the initial settings
        ViewActions.fetchSettingsSections();
        ViewActions.fetchSettingsInputs();
        ViewActions.fetchSettingsAllValues();
    },

    componentWillUnmount: function() {
        PanelStore.removeChangeListener( this.onStoreChange );
        SettingsStore.removeChangeListener( this.onStoreChange );
    },

    render: function() {

        return (
           <div>
               <SettingsMenuPanel returnPanel={this.state.returnPanel} currentPanel={this.state.currentPanel} sections={this.state.settingsSections} />
               <SettingsSubPanel returnPanel={this.state.returnPanel} currentPanel={this.state.currentPanel} settingsValues={this.state.settingsValues} sections={this.state.settingsSections} inputs={this.state.settingsInputs} />
               <ReactTooltip html={true} place="bottom" type="info" effect="float" />
           </div>
        );
    }


});

module.exports = PanelRouter;