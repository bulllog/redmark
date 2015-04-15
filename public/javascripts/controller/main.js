/**
 * Main Controller.
 */
var redmarkCtrl = function($scope, $mdDialog) {
  $scope.toolbarInfo = {
    'title': 'Ticket View',
    'background': 'rgb(63,81,181)'
  };
  $scope.navigation = [{
    'name': 'New',
    'icon': 'new',
    'background': 'red'
  },{
    'name': 'Open',
    'icon': 'open',
    'background': '#0091ea'
  },{
    'name': 'Close',
    'icon': 'close',
    'background': '#42bd41'
  }];
  
  // TODO: Try to remove it from the scope if possible.
  $scope.updateToolbarInfo = function(title) {
    $scope.toolbarInfo.title = title;
    angular.forEach( $scope.navigation,
        function(nav) {
          if (nav.name == title) {
            $scope.toolbarInfo.background = nav.background;
          }
        });
  };
  $scope.openDialogCreateTicket = function($event, ticket) {
    $mdDialog.show({
        controller: createTicketDialogCtrl,
        templateUrl: '/assets/javascripts/directives/create_ticket_dialog/create-ticket-dialog.ng',
        targetEvent: $event,
        locals: {
          ticket: ticket
        }
      })
      .then(function(answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      });
  };
};

/** Name used by AngularJS dependency injector. */
redmarkCtrl.NG_NAME = 'redmarkCtrl';





/**
 * Controller for toggel menu.
 */
var toggleNavCtrl = function($scope, $mdSidenav) {
  $scope.openNav = function() {
    $mdSidenav('left').toggle();
  };
};

/** Name used by AngularJS dependency injector. */
toggleNavCtrl.NG_NAME = 'toggleNavCtrl';





/**
 * Intialize app.
 */
var redmarkApp = angular.module('main', [
  'ngMaterial',
  'ngMdIcons',
  'ngRoute',
  ticketTile.NG_NAME]);


/**
 * Controller list.
 */
var ControllerList = [redmarkCtrl, toggleNavCtrl, homeCtrl, createTicketDialogCtrl, categoryTicketCtrl, ticketCtrl];


/**
 * Adding Controllers.
 */
angular.forEach(ControllerList,
  function(ctrl) {
    redmarkApp.controller(ctrl.NG_NAME, ctrl);
  });

/**
 * Configures the angular module.
 */
redmarkApp.ngConfigure = function($locationProvider, $routeProvider) {
  // Configure application deep linking path.
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  // Configure template for path.
  $routeProvider.when('/', {
    'controller': homeCtrl,
    'templateUrl': '/assets/templates/home.ng'
  }).when('/new', {
    'controller': categoryTicketCtrl,
    'templateUrl': 'assets/templates/category_ticket_template.ng'
  }).when('/open', {
    'controller': categoryTicketCtrl,
    'templateUrl': 'assets/templates/category_ticket_template.ng'
  }).when('/close', {
    'controller': categoryTicketCtrl,
    'templateUrl': 'assets/templates/category_ticket_template.ng'
  }).when('/ticket', {
    'controller': ticketCtrl,
    'templateUrl': 'assets/templates/ticket_template.ng'
  }); 
};


redmarkApp.config(redmarkApp.ngConfigure);
