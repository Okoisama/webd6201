class Contact 
{
  // Constructor
  constructor(fullName="", contactNumber="", emailAddress="") 
  {
    this.m_fullName = fullName;
    this.m_contactNumber = contactNumber;
    this.m_emailAddress = emailAddress;

    this.splitFullName();
  }

  // Getters and Setters
  get fullName() 
  {
    return this.m_fullName;
  }

  set fullName(full_name) 
  {
    this.m_fullName = full_name;
  }

  get contactNumber() 
  {
    return this.m_contactNumber;
  }

  set contactNumber(contact_number) 
  {
    this.m_contactNumber = contact_number;
  }

  get emailAddress() 
  {
    return this.m_emailAddress;
  }

  set emailAddress(email_address) 
  {
    this.m_emailAddress = email_address;
  }

  // functions
  splitFullName()
  {
    let names = this.fullName.split(" ")
    this.firstName = names[0];
    this.lastName = names[1];
  }

  /* This method overrides the default toString method for the Contact class */
  toString()
  {
    let contactString = `Full Name     : ${this.fullName}
Contact Number: ${this.contactNumber}
Email Address : ${this.emailAddress}`;

    return contactString; 
  }

  /**
   * This method converts the Contact to a JSON Object
   * 
   * @return {Object}
   */
  toJSON()
  {
    let json = {};
    json.contactNumber = this.contactNumber;
    json.fullName = this.fullName;
    json.emailAddress = this.emailAddress;

    return json;
  }

  /**
   * This method serializes the properties into a comma-separated value string
   * @return {string}
   */
  serialize()
  {
    return `${this.fullName},${this.contactNumber},${this.emailAddress}`;
  }

  /**
   * This method takes a comma-separated string of contact properties and sets the current c
   * contact to these new properties
   * 
   * @param {string} data 
   * @return {void}
   */
  deserialize(data)
  {
    console.log(data);
    // create an array of property data
    let properties = data.split(",");
    this.fullName = properties[0];
    this.contactNumber = properties[1];
    this.emailAddress = properties[2];
  }
}