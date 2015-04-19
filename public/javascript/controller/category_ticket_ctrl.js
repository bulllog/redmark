/**
 * Controller for specific type of tickets.
 */
var categoryTicketCtrl = function($scope) {
  $scope.category = 'Close';
  
  $scope.$parent.updateToolbarInfo($scope.category);
  $scope.tickets = [{
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
    }, {
    'ticket_no': 'TIC40406',
    'created_by': 'Thomas Blurson',
    'assigned_to': 'Jens trap',
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
    'ticket_no': 'TIC40476',
    'created_by': 'Thomas Blurson',
    'assigned_to': 'Satyam',
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
    'ticket_no': 'TIC40403',
    'created_by': 'Thomas Blurson',
    'assigned_to': 'Jens trap',
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
    'ticket_no': 'TIC40405',
    'created_by': 'Thomas Blurson',
    'assigned_to': 'Satyam',
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
};

categoryTicketCtrl.NG_NAME = 'categoryTicketCtrl';

