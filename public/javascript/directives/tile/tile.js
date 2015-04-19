/**
 * Directive for tile to render the ticket info into tile form.
 *
 */
var ticketTile = function() {
  return {
    'restrict': 'EAM',
    'replace': true,
    'scope': {
      'ticket': '='
    },
    'templateUrl': ticketTile.TEMPLATE_URL_,
    'link': ticketTile.link_
  };
};

/**
 * Template URL for the directive.
 *
 */
ticketTile.TEMPLATE_URL_ =
    '/assets/javascript/directives/tile/tile-template.ng';

/** Name used by AngularJS dependency injector. */
ticketTile.NG_NAME = 'ticketTile';


/**
 * Module used by AngularJS dependency injector.
 *
 */
ticketTile.NG_MODULE = angular.module(ticketTile.NG_NAME, []).
    directive(ticketTile.NG_NAME, ticketTile);


/**
 * Link function.
 */
ticketTile.link_ = function($scope) {
  $scope.openDialogTicket = function($event, ticket) {
    $scope.$parent.openDialogCreateTicket($event, ticket);    
  };
};

