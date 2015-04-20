/**
 * Directive for tile to render the ticket info into tile form.
 *
 */
var ticketTile = function($window, $mdToast, TicketsApi) {
  return {
    'restrict': 'EAM',
    'replace': true,
    'scope': {
      'ticket': '='
    },
    'templateUrl': ticketTile.TEMPLATE_URL_,
    'link': angular.bind(null, ticketTile.link_,
        $window, $mdToast, TicketsApi)
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
ticketTile.link_ = function($window, $mdToast, TicketsApi,
    $scope, element, attrs) {

   
  $scope.openDialogTicket = function($event, ticket) {
    $scope.$parent.openDialogCreateTicket($event, ticket);    
  };

  $scope.toastPosition = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };
  $scope.getToastPosition = function() {
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  
  /**
  * Handler for button to change status of a ticket.
  */
  $scope.handleClick = function($event, status, ticket) {
    var request = {};
    $event.stopPropagation();
    request["status"] = status;
    TicketsApi.updateTicket(ticket.ticket_no, request,
        angular.bind(null, function(window, scope, response) {
          if(response.status != "200") {
            $mdToast.show($mdToast.simple()
              .content(response.message)
              .position(scope.getToastPosition()).hideDelay(3000));
          } else {
            $window.location.reload();
            }
        }, $window, $scope),
        function() {
          console.log("Ticket status updation faild");
        })
  }
};
