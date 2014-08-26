/**
 * Copyright 2002-2013, University of Colorado
 * end object view
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Constants = require( 'WOAS/Constants' );

  // images
  var clampImage = require( 'image!WOAS/clamp_2.png' );
  var ringBackImage = require( 'image!WOAS/ring_back.png' );
  var ringFrontImage = require( 'image!WOAS/ring_front.png' );
  var windowImage = require( 'image!WOAS/window_back.png' );

  function EndNode( model, events, options ) {
    Node.call( this );
    var clamp = new Image( clampImage, {x: -18, y: -34, scale: 0.4} ),
      ring_back = new Node( {children: [new Image( ringBackImage, {x: 5, y: -14 / 2, scale: 0.5} )]} ),
      ring_front = new Node( {children: [new Image( ringFrontImage, {x: 4.7, y: 0, scale: 0.5} )]} ),
      windowNode = new Image( windowImage, {x: -81, y: -219 / 2} ),
      post = new Rectangle( -5, -130, 10, 260, {
        stroke: '#000',
        fill: Constants.postGradient,
        x: 20
      } );

    this.addChild( clamp );
    this.addChild( ring_back );
    this.addChild( post );
    this.addChild( ring_front );
    this.windowNode = windowNode;

    this.mutate( options );

    function updateKey() {
      ring_front.y = ring_back.y = model.yNow[model.yNow.length - 1] || 0;
    }

    var dirty = true;
    model.on( 'yNowChanged', function() { dirty = true; } );
    events.on( 'frame', function() {
      if ( dirty ) {
        updateKey();
        dirty = false;
      }
    } );

    model.typeEndProperty.link( function updateVisible( value ) {
      clamp.setVisible( value === 'fixedEnd' );
      ring_back.setVisible( value === 'looseEnd' );
      post.setVisible( value === 'looseEnd' );
      ring_front.setVisible( value === 'looseEnd' );
      windowNode.setVisible( value === 'noEnd' );
    } );

  }

  inherit( Node, EndNode );

  return EndNode;
} );
