// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the 'Gravity Force Lab' sim.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( [
  'string!WOAS/simTitle',
  'JOIST/SimLauncher', 'JOIST/Sim', 'JOIST/Screen',
  'SCENERY/nodes/Rectangle',
  'model/WOASModel',
  'view/WOASView'], function( titleString, SimLauncher, Sim, Screen, Rectangle, WOASModel, WOASView ) {
  'use strict';

  var simOptions = {
    credits: {
      leadDesign: 'Michael Dubson',
      softwareDevelopment: 'Michael Dubson',
      interviews: 'Wendy Adams, Danielle Harlow',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team\nto convert this simulation to HTML5.'
    }
  };

  SimLauncher.launch( function() {
    //Create and start the sim
    new Sim( titleString, [
      new Screen( titleString, null, /* single-screen sim, no icon */
        function() { return new WOASModel( 768, 504 ); },
        function( model ) { return new WOASView( model ); },
        { backgroundColor: "#FFFFB7" }
      )
    ], simOptions ).start();
  } );
} );
