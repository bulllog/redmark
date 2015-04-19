/**
 * Directive for tile to render the ticket info into tile form.
 *
 */
var ticketTile = function(TicketsApi) {
  return {
    'restrict': 'EAM',
    'replace': true,
    'scope': {
      'ticket': '='
    },
    'templateUrl': ticketTile.TEMPLATE_URL_,
    'link': angular.bind(null, ticketTile.link_, TicketsApi)
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
ticketTile.NG_MODULE = angular.module(ticketTile.NG_NAME,
    [ticketService.NG_NAME]).
    directive(ticketTile.NG_NAME, ticketTile);


/**
 * Link function.
 */
ticketTile.link_ = function(TicketsApi, $scope, element, attrs) {

  
  $scope.openDialogTicket = function($event, ticket) {
    $scope.$parent.openDialogCreateTicket($event, ticket);    
  };
  
  /**
  * Handler for button to change status of a ticket.
  */
  $scope.handleClick = function($event, status, ticket) {
    var request = {};
    $event.stopPropagation();
    request["status"] = status;
    TicketsApi.updateTicket(ticket.ticket_no, request,
        function() {
        console.log("Ticket status updated."); 
        },
        function() {
          console.log("Ticket status updation faild");
        })
  }
};
