/**
 * Copyright 2002-2013, University of Colorado
 * buttons and model control elements view
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var Line = require( 'SCENERY/nodes/Line' );
  var inherit = require( 'PHET_CORE/inherit' );
  var rulersString = require( 'string!WOAS/rulers' );
  var timerString = require( 'string!WOAS/timer' );
  var referenceLineString = require( 'string!WOAS/referenceLine' );
  var tensionString = require( 'string!WOAS/tension' );
  var dampingString = require( 'string!WOAS/damping' );
  var lowString = require( 'string!WOAS/low' );
  var highString = require( 'string!WOAS/high' );
  var noneString = require( 'string!WOAS/none' );
  var lotsString = require( 'string!WOAS/lots' );
  var frequencyString = require( 'string!WOAS/frequency' );
  var patternValueUnitHzString = require( 'string!WOAS/patternValueUnitHz' );
  var pulseWidthString = require( 'string!WOAS/pulseWidth' );
  var patternValueUnitSString = require( 'string!WOAS/patternValueUnitS' );
  var amplitudeString = require( 'string!WOAS/amplitude' );
  var patternValueUnitCmString = require( 'string!WOAS/patternValueUnitCm' );
  var Panel = require( 'SUN/Panel' );
  var CheckBoxGroup = require( 'WOAS/view/control/CheckBoxGroup' );
  var Slider = require( 'WOAS/view/control/slider/Slider' );
  var Constants = require( 'WOAS/Constants' );
  var Dimension2 = require( 'DOT/Dimension2' );

  function BottomControlPanel( model ) {

    Node.call( this, { x: 5, scale: 0.7 } );

    var oscillatePanel;
    var manualPanel;
    var pulsePanel;

    var checkBoxGroup = new CheckBoxGroup( {check: [
      {text: rulersString, property: model.rulersProperty},
      {text: timerString, property: model.timerProperty},
      {text: referenceLineString, property: model.referenceLineProperty}
    ]} );

    var checkBoxGroupOffset = 20;
    checkBoxGroup.x = checkBoxGroupOffset;

    var tensionSlider = new Slider( { sliderX: 60 - 240, title: tensionString, property: model.tensionProperty, trackSize: new Dimension2( 80, 2 ), rounding: 0, range: Constants.tensionRange, titleVerticalOffset: 15, tick: {step: 1, minText: lowString, maxText: highString} } );
    var dampingSlider = new Slider( { sliderX: 60 - 420, title: dampingString, property: model.dampingProperty, rounding: -1, range: Constants.dampingRange, titleVerticalOffset: 15, tick: {step: 10, minText: noneString, maxText: lotsString}} );
    var frequencySlider = new Slider( { sliderX: 60 - 630, type: 'button', buttonStep: 0.01, title: frequencyString, property: model.frequencyProperty, patternValueUnit: patternValueUnitHzString, rounding: 2, range: Constants.frequencyRange } );
    var pulseWidthSlider = new Slider( { sliderX: 60 - 630, type: 'button', buttonStep: 0.01, title: pulseWidthString, property: model.pulseWidthProperty, patternValueUnit: patternValueUnitSString, rounding: 2, range: Constants.pulseWidthRange } );
    var amplitudeSlider = new Slider( { sliderX: 60 - 840, type: 'button', buttonStep: 0.01, title: amplitudeString, property: model.amplitudeProperty, patternValueUnit: patternValueUnitCmString, rounding: 2, range: Constants.amplitudeRange } );

    var separator = new Line( 0, 10, 0, 100, { stroke: 'gray', lineWidth: 1 } );

    var oscillatePanel = new Panel( new Node( {
      children: [amplitudeSlider, frequencySlider, dampingSlider, tensionSlider, separator, checkBoxGroup]
    } ), {
      fill: '#D9FCC5', xMargin: 10, yMargin: 5
    } );
    this.addChild( oscillatePanel );

    var manualContainer = new Node();
    manualContainer.addChild( dampingSlider );
    manualContainer.addChild( tensionSlider );
    manualContainer.addChild( separator );
    manualContainer.addChild( checkBoxGroup );
    this.addChild( manualPanel = new Panel( manualContainer, {
      fill: '#D9FCC5', xMargin: 10, yMargin: 5
    } ) );

    var pulseContainer = new Node();
    pulseContainer.addChild( amplitudeSlider );
    pulseContainer.addChild( pulseWidthSlider );
    pulseContainer.addChild( dampingSlider );
    pulseContainer.addChild( tensionSlider );
    pulseContainer.addChild( separator );
    pulseContainer.addChild( checkBoxGroup );
    this.addChild( pulsePanel = new Panel( pulseContainer, {
      fill: '#D9FCC5', xMargin: 10, yMargin: 5
    } ) );


    if ( pulsePanel.width > Constants.maxWidthBottomControlPanel ) {
      pulsePanel.scale( Constants.maxWidthBottomControlPanel / pulsePanel.width );
    }
    if ( manualPanel.width > Constants.maxWidthBottomControlPanel ) {
      manualPanel.scale( Constants.maxWidthBottomControlPanel / manualPanel.width );
    }
    if ( oscillatePanel.width > Constants.maxWidthBottomControlPanel ) {
      oscillatePanel.scale( Constants.maxWidthBottomControlPanel / oscillatePanel.width );
    }
    pulsePanel.right = manualPanel.right = oscillatePanel.right = Constants.maxWidthBottomControlPanel - 60 + checkBoxGroupOffset;
    this.bottom = Constants.viewSize.height - 10;
    model.modeProperty.link( function updateBottomControlPanel( value ) {
      oscillatePanel.setVisible( value === 'oscillate' );
      manualPanel.setVisible( value === 'manual' );
      pulsePanel.setVisible( value === 'pulse' );
    } );
  }

  inherit( Node, BottomControlPanel );

  return BottomControlPanel;
} );
