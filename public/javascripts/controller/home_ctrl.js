/**
 * Controller for home.
 */
var homeCtrl = function($scope) {
  $scope.newTickets = [{
    'ticket_no': 'TIC40421',
    'created_by': 'Thomas Blurson',
    'status': 'new',
    'create_date': '02/05/2015',
    'summary': 'Auto Deactivation of your filer homedir due to no response',
    'customer_info': {
      'name': 'Harry Askham',
      'Contact_no': '9087767865',
      'email_id': 'harry@yahoo.com',
      'Address': 'London'},
    'comments': {
      'name': 'Daniel',
      'comment': 'some comment'}
    }, {
    'ticket_no': 'TIC40443',
    'created_by': 'Thomas Blurson',
    'status': 'new',
    'create_date': '02/05/2015',
    'summary': 'Auto Deactivation of your filer homedir due to no response',
    'customer_info': {
      'name': 'Harry Askham',
      'Contact_no': '9087767865',
      'email_id': 'harry@yahoo.com',
      'Address': 'London'},
    'comments': {
      'name': 'Daniel',
      'comment': 'some comment'}
    }];
  
    $scope.openTickets = [{
    'ticket_no': 'TIC40406',
    'created_by': 'Thomas Blurson',
    'assigned_to': 'Jens trap',
    'status': 'open',
    'create_date': '02/05/2015',
    'summary': 'Auto Deactivation of your filer homedir due to no response',
    'customer_info': {
      'name': 'Harry Askham',
      'Contact_no': '9087767865',
      'email_id': 'harry@yahoo.com',
      'Address': 'London'},
    'comments': {
      'name': 'Daniel',
      'comment': 'some comment'}
    }, {
    'ticket_no': 'TIC40476',
    'created_by': 'Thomas Blurson',
    'assigned_to': 'Satyam',
    'status': 'open',
    'create_date': '02/05/2015',
    'summary': 'Auto Deactivation of your filer homedir due to no response',
    'customer_info': {
      'name': 'Harry Askham',
      'Contact_no': '9087767865',
      'email_id': 'harry@yahoo.com',
      'Address': 'London'},
    'comments': {
      'name': 'Daniel',
      'comment': 'some comment'}
    }];
  
  $scope.closeTickets = [{
    'ticket_no': 'TIC40403',
    'created_by': 'Thomas Blurson',
    'assigned_to': 'Jens trap',
    'status': 'close',
    'create_date': '02/05/2015',
    'summary': 'Auto Deactivation of your filer homedir due to no response',
    'customer_info': {
      'name': 'Harry Askham',
      'Contact_no': '9087767865',
      'email_id': 'harry@yahoo.com',
      'Address': 'London'},
    'comments': {
      'name': 'Daniel',
      'comment': 'some comment'}
    }, {
    'ticket_no': 'TIC40405',
    'created_by': 'Thomas Blurson',
    'assigned_to': 'Satyam',
    'status': 'close',
    'create_date': '02/05/2015',
    'summary': 'Auto Deactivation of your filer homedir due to no response',
    'customer_info': {
      'name': 'Harry Askham',
      'Contact_no': '9087767865',
      'email_id': 'harry@yahoo.com',
      'Address': 'London'},
    'comments': {
      'name': 'Daniel',
      'comment': 'some comment'}
    }];
  $scope.ticketsObject = [{
    'name': 'New',
    'tickets': $scope.newTickets,
    'background': 'red'
  },{
    'name': 'Open',
    'tickets': $scope.openTickets,
    'background': '#0091ea'
  },{
    'name': 'Close',
    'tickets': $scope.closeTickets,
    'background': '#42bd41'
  }];
};

homeCtrl.NG_NAME = 'homeCtrl';