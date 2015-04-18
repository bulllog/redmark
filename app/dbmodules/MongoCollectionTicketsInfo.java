package dbmodules;

import com.fasterxml.jackson.databind.JsonNode;

import com.mongodb.BasicDBObject;
import com.mongodb.BulkWriteOperation;
import com.mongodb.BulkWriteResult;
import com.mongodb.Cursor;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.ParallelScanOptions;
import com.mongodb.ServerAddress;

import org.bson.types.ObjectId;

import play.Logger;

import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.net.UnknownHostException;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import static java.util.concurrent.TimeUnit.SECONDS;

/**
 * Intialize the database object.
 */
// TODO: Make this class singleton so that for each instance of the application it return the same db object.
class MongoDBConnection {
  String localHostUri = "mongodb://localhost:27017";
  String cloudHostUri = "mongodb://pankaj.ducs:pankaj1234@ds061671.mongolab.com:61671/managetickets";
  private DB ticketDBObject;

  /**
  * Defualt constructor.
  */
  protected MongoDBConnection() {
    this.ticketDBObject = createConnection(cloudHostUri);
  }

  
/**
  * Parametrized constructor.
  */
  protected MongoDBConnection(String instaceType) {
    this.ticketDBObject = instaceType == "local" ?
      createConnection(localHostUri): createConnection(cloudHostUri);
  }
  
  private DB createConnection(String hostUri) {
    MongoClient mongoClient = null;
    MongoClientURI uri = new MongoClientURI(hostUri);
    try {
      mongoClient = new MongoClient(uri);
    } catch (UnknownHostException e) {
      Logger.error("UnknownHostException: ", e.getMessage());
    }
    DB db = mongoClient.getDB("managetickets");
    return db;
  }

  protected DBCollection getCollectionObejct(String collectionName) {
    return this.ticketDBObject.getCollection(collectionName);
  } 

}


/**
 * Intialize and handle operations on TicketsInfo collection.
 */
public class MongoCollectionTicketsInfo extends MongoDBConnection {
  DBCollection ticketsInfoObject;
  String collectionName = "TicketInfo";

  /**
   * Default constructor which itialize the DB with default host i.e cloud host.
   */
  public MongoCollectionTicketsInfo() {
    super();
    this.ticketsInfoObject = this.getCollectionObejct(this.collectionName);
  }

  /**
   * Constructor which call the super constructor with the given host.
   */
  public MongoCollectionTicketsInfo(String hostUri) {
    super(hostUri);
    this.ticketsInfoObject = this.getCollectionObejct(this.collectionName);
  }

  /**
   * Get all the tickets from the DB.
   */
  public List<DBObject> getTickets() {
      DBCursor cursor = this.ticketsInfoObject.find();
      return cursor.toArray();
  }

  /**
   * Get all the tickets with the given status from the DB.
   */
  public List<DBObject> getTickets(String status) {
      BasicDBObject query = new BasicDBObject("status", status);
      DBCursor cursor = this.ticketsInfoObject.find(query);
      
      return cursor.toArray();
  }

  /**
   * Get the ticket with the given ticket id.
   */
  public DBObject getTicket(String ticketId) {
      BasicDBObject query = new BasicDBObject("ticket_no", ticketId);
      DBCursor cursor = this.ticketsInfoObject.find(query);
      
      return cursor.one();
  }

  /**
   * Creates the new ticket.
   */
  public String createTicket(String status, String summary,
      String created_by, String assigned_to, JsonNode customer_info,
      JsonNode comments) {
    DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    Date created_date = new Date();
    ObjectId ticketId = new ObjectId();
    MongoCollectionCustomerInfo customerObject = 
        new MongoCollectionCustomerInfo();
    String customerEmailId = customer_info.findPath("emailId").textValue();
    if (customerEmailId == null) {
      return "Customer Email ID required.";
    }
    String customer_id = customerObject.createCustomer(
        customer_info.findPath("name").textValue(),
        customerEmailId,
        customer_info.findPath("address").textValue(),
        customer_info.findPath("contact").textValue());
    BasicDBObject newTicket = new BasicDBObject("summary", summary)
          .append("ticket_no", ticketId.toString())
          .append("status", status)
          .append("created_by", created_by)
          .append("created_date", dateFormat.format(created_date))
          .append("assigned_to", assigned_to)
          .append("customer_id", customer_id)
          .append("comments", comments);
    this.ticketsInfoObject.insert(newTicket);
    return "success";
  }

  /**
   * Upadate ticket information of the given ticket id.
   */
  public String updateTicket(String ticketId, String status,
      String assigned_to, JsonNode comments) {
    DBObject ticketToUpdate = this.getTicket(ticketId);
    if (ticketToUpdate == null) {
      return "Ticket not exist";
    }
    
    status = (status == null) ?
        (String) ticketToUpdate.get("status") : status;

    assigned_to = (assigned_to == null) ?
        (String) ticketToUpdate.get("assigned_to") : assigned_to;

    comments = (comments == null) ?
        (JsonNode) ticketToUpdate.get("comments") : comments;

    if (assigned_to == null && (status.equals("open") || status.equals("close"))) {
      return "Ticket should be assigned.";
    }
    DBObject updatedInfo = new BasicDBObject("status", status)
        .append("assigned_to", assigned_to)
        .append("comments", comments);
    
    this.ticketsInfoObject.update(ticketToUpdate,
        new BasicDBObject("$set", updatedInfo));
    return "success";
  }
}


/**
 * Intialize and handle operations on TicketsInfo collection.
 */
class MongoCollectionCustomerInfo extends MongoDBConnection {
  DBCollection customerInfoObject;
  String collectionName = "CustomerInfo";

  /**
   * Default constructor which itialize the DB with default host i.e cloud host.
   */
  public MongoCollectionCustomerInfo() {
    super();
    this.customerInfoObject = this.getCollectionObejct(this.collectionName);
  }

  /**
   * Constructor which call the super constructor with the given host.
   */
  public MongoCollectionCustomerInfo(String hostUri) {
    super(hostUri);
    this.customerInfoObject = this.getCollectionObejct(this.collectionName);
  }

  /**
   * Returns the customer id for the given email id.
   */
  private DBCursor getCustomer(String emailId) {
    BasicDBObject query = new BasicDBObject("email_id", emailId);
    DBCursor cursor = this.customerInfoObject.find(query);
    
    return cursor;
  }

  /**
   * Creates the new customer instance in the db if not exists
   * and returns its id alse returns the existing id.
   */
  public String createCustomer(String name, String emailId,
      String address, String contact) {
    DBCursor customer = this.getCustomer(emailId);
    if (customer.count() == 0) {
      ObjectId customerId = new ObjectId();
      BasicDBObject newCustomer = new BasicDBObject("name", name)
            .append("customer_id", customerId.toString())
            .append("email", emailId)
            .append("address", address)
            .append("contact", contact);
      this.customerInfoObject.insert(newCustomer);
      return customerId.toString();
    }
    return (String) customer.one().get("customer_id");
  }

}
