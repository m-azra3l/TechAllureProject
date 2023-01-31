// SPDX-License-Identifier: GPL-3.0 License

// Solidity version declaration
pragma solidity ^0.8.13;

// Declaring the contract for Employee information
contract Employee {
  // Admin address
  address admin;
  // Address of the employee
  address employee_address;
  // Description of the employee
  string description;
  // Location of the employee
  string location;
  // Overall endorsement of the employee
  uint256[] public overallEndorsement;
  // Count of the endorsement of the employee
  uint256 endorsecount;
  // Name of the employee
  string name;

  // Constructor function to initialize the employee information
  constructor(
  address _admin,
  address _employee_address,
  string memory _name,
  string memory _description,
  string memory _location
  ) public {
    // Setting the admin address
    admin = _admin;
    // Setting the name of the employee
    name = _name;
    // Setting the address of the employee
    employee_address = _employee_address;
    // Setting the description of the employee
    description = _description;
    // Setting the location of the employee
    location = _location;
    // Setting the endorsement count to 0
    endorsecount = 0;
  }

  // Modifier to check if msg.sender is the employee address
  modifier OnlyEmployee() {
    require(msg.sender == employee_address, "Only the employee can call this function");
    _;
  }

  // Function to retrieve the employee information 
  function getEmployeeInfo()
    public
    view
    returns (
      address,
      string memory,
      string memory,
      string memory,
      uint256,
      uint256
    )
  {
    return (employee_address, name, description, location, 0, endorsecount);
  }

  // Function to edit the employee information
  function editInfo(
    string memory _name,
    string memory _descrip,
    string memory _location
  ) public OnlyEmployee {

    // Updating the employee name, description, and location
    name = _name;
    description = _descrip;
    location = _location;
  }


  // Skill Section

  // Define a struct to store skill information
  struct skillInfo {
    // Name of the skill
    string name;
    // Overall endorsement percentage for the skill
    uint256 overall_percentage;
    // Employee's experience with the skill
    string experience;
    // Boolean indicating whether the skill has been endorsed
    bool endorsed;
    // Address of the endorser
    address endorser_address;
    // Endorser's review of the skill
    string review;
    // Boolean indicating whether the skill is visible to others
    bool visible;
  }

  // Mapping to store the skills of the employee, with the key being the name of the skill
  mapping(string => skillInfo) skillmap;
  // Array to store the names of the employee's skills
  string[] skills;

  // Function to add a new skill to the employee's skill set
  function addSkill(string memory _name, string memory _experience)
      public
      // Require that the caller be the employee themselves
      OnlyEmployee
  {
      // Create a new skillInfo object to store information about the new skill
      skillInfo memory employeeSkillSet;
      // Set the name of the skill
      employeeSkillSet.name = _name;
      // Set the employee's experience with the skill
      employeeSkillSet.experience = _experience;
      // Initialize the overall endorsement percentage to 0
      employeeSkillSet.overall_percentage = 0;
      // Initialize the endorsement status to false
      employeeSkillSet.endorsed = false;
      // Initialize the visibility of the skill to true
      employeeSkillSet.visible = true;
      // Add the new skill to the skill map
      skillmap[_name] = employeeSkillSet;
      // Add the name of the skill to the skills array
      skills.push(_name);
  }


  // This function allows an address to endorse a skill of an employee
  function endorseSkill(
    string memory _name,  // name of the skill to endorse
    uint256 _overall_percentage,  // overall percentage of endorsement
    string memory _review  // review of the endorsement
  ) public {
    // Require that the skill is visible in the mapping
    require(skillmap[_name].visible);

    // Update the overall endorsement percentage for the skill
    skillmap[_name].overall_percentage = _overall_percentage;

    // Push the endorsement percentage to the overall endorsement array
    overallEndorsement.push(_overall_percentage);

    // Increase the endorsement count
    endorsecount = endorsecount + 1;

    // Mark the skill as endorsed
    skillmap[_name].endorsed = true;

    // Store the address of the endorser
    skillmap[_name].endorser_address = msg.sender;

    // Store the review of the endorsement
    skillmap[_name].review = _review;
  }

  // This function retrieves the information of a skill by its name
  function getSkillByName(string memory _name)
    private  // visibility is private
    view  // specifies that the function is a view function
    returns (
      string memory,  // name of the skill
      uint256,  // overall endorsement percentage
      string memory,  // experience with the skill
      bool,  // whether the skill has been endorsed
      address,  // address of the endorser
      string memory,  // review of the endorsement
      bool  // visibility of the skill
    ) {
    // Return the skill information from the skill mapping
    return (
      skillmap[_name].name,
      skillmap[_name].overall_percentage,
      skillmap[_name].experience,
      skillmap[_name].endorsed,
      skillmap[_name].endorser_address,
      skillmap[_name].review,
      skillmap[_name].visible
    );
  }

  // This function returns the count of skills
  function getSkillCount() public view returns (uint256) {
    // Return the length of the skills array
    return skills.length;
  }

  // This function retrieves the information of a skill by its index in the skills array
  function getSkillByIndex(uint256 _index)
    public  // visibility is public
    view  // specifies that the function is a view function
    returns (
      string memory,  // name of the skill
      uint256,  // overall endorsement percentage
      string memory,  // experience with the skill
      bool,  // whether the skill has been endorsed
      address,  // address of the endorser
      string memory,  // review of the endorsement
      bool  // visibility of the skill
    ) {
    // Return the information of the skill by its name
    return getSkillByName(skills[_index]);
  }

  // This function deletes a skill by making it invisible
  function deleteSkill(string memory _name) public OnlyEmployee {
    // Toggle the visibility of the skill in the mapping
    skillmap[_name].visible = !skillmap[_name].visible;
  }


  // Certification Section

  // Struct to store certification information
  struct certificationInfo {
    string name; // name of the certification
    address organization; // organization that issued the certification
    uint256 score; // score obtained in the certification
    bool endorsed; // whether the certification is endorsed or not
    bool visible; // whether the certification is visible or not
  }

// Mapping of certification names to certification information
  mapping(string => certificationInfo) certificationmap;

// List of all certifications
  string[] certifications;

  /**
   * Function to add a certification
   * param _name Name of the certification
   * param _organization Organization that issued the certification
   * param _score Score obtained in the certification
   * Only employees can add certifications
   */
  function addCertification(
    string memory _name,
    address _organization,
    uint256 _score
  ) public OnlyEmployee {
    // Create a new certificationInfo struct
    certificationInfo memory newcertificationInfo;
    // Set the properties of the struct
    newcertificationInfo.name = _name;
    newcertificationInfo.organization = _organization;
    newcertificationInfo.score = _score;
    newcertificationInfo.endorsed = false;
    newcertificationInfo.visible = true;
    // Add the certification to the mapping
    certificationmap[_name] = newcertificationInfo;
    // Add the name of the certification to the list of all certifications
    certifications.push(_name);
  }

  /**
   * Function to endorse a certification
   * param _name Name of the certification to endorse
   * Only the issuing organization can endorse a certification
   */
  function endorseCertification(string memory _name) public {
    // Check if the sender is the issuing organization
    require(msg.sender == certificationmap[_name].organization);
    // Endorse the certification
    certificationmap[_name].endorsed = true;
  }

  /**
   * Function to get the information of a certification by its name
   * param _name Name of the certification
   * returns name, organization, score, endorsed, visible
   * Private and view function
   */
  function getCertificationByName(string memory _name)
    private
    view
    returns (
      string memory,
      address,
      uint256,
      bool,
      bool
    )
  {
    // Return the information of the certification
    return (
      certificationmap[_name].name,
      certificationmap[_name].organization,
      certificationmap[_name].score,
      certificationmap[_name].endorsed,
      certificationmap[_name].visible
    );
  }

  /**
   * Function to get the total number of certifications
   * returns number of certifications
   * Public and view function
   */
  function getCertificationCount() public view returns (uint256) {
    // Return the length of the certifications list
    return certifications.length;
  }

  /**
   * Function to get the information of a certification by its index in the list
   * param _index Index of the certification in the list
   * returns name, organization, score, endorsed, visible
   * Public and view function
   */
  // Get certification information by index from the certifications array
  function getCertificationByIndex(uint256 _index) public view returns (
    string memory,  // name of the certification
    address,        // organization that issued the certification
    uint256,        // score received for the certification
    bool,           // if the certification is endorsed
    bool            // if the certification is visible
  ) {
    // Returns the certification information for the name specified by the index passed
    return getCertificationByName(certifications[_index]);
  }

  // Function to delete a certification by name
  function deleteCertification(string memory _name) public OnlyEmployee {
    // Changes the visibility of the certification with the specified name
    certificationmap[_name].visible = !certificationmap[_name].visible;
  }


  // Work Experience Section

  // Definition of work experience information struct
  struct workexpInfo {
    // Role of the worker
    string role;
    // Address of the organization the worker worked for
    address organization;
    // Start date of the work experience
    string startdate;
    // End date of the work experience
    string enddate;
    // Endorsement status
    bool endorsed;
    // Description of the work experience
    string description;
    // Visibility status
    bool visible;
  }

  // Mapping to store work experience information
  mapping(address => workexpInfo) workexpmap;
  // Array to store all work experience addresses
  address[] workexps;

  // Function to add work experience information
  function addWorkExp(
  string memory _role,
  address _organization,
  string memory _startdate,
  string memory _enddate,
  string memory _description
  ) public OnlyEmployee {
    // Temporary workexpInfo instance
    workexpInfo memory newworkexp;
    // Assign role to the new workexpInfo instance
    newworkexp.role = _role;
    // Assign organization to the new workexpInfo instance
    newworkexp.organization = _organization;
    // Assign start date to the new workexpInfo instance
    newworkexp.startdate = _startdate;
    // Assign end date to the new workexpInfo instance
    newworkexp.enddate = _enddate;
    // Set endorsement status to false
    newworkexp.endorsed = false;
    // Set visibility status to true
    newworkexp.visible = true;
    // Assign description to the new workexpInfo instance
    newworkexp.description = _description;
    // Add the new workexpInfo instance to the workexpmap
    workexpmap[_organization] = newworkexp;
    // Add the organization address to the workexps array
    workexps.push(_organization);
  }

  // Function to endorse a work experience
  function endorseWorkExp() public {
    // Require the organization address of the work experience to be non-zero
    require(workexpmap[msg.sender].organization != address(0x0));
    // Set endorsement status to true
    workexpmap[msg.sender].endorsed = true;
  }

  // getWorkExpByAddress returns work experience information of a specific organization by address
  function getWorkExpByAddress(address _organization)
    private
    view
    returns (
      string memory, // role
      address, // organization
      string memory, // startdate
      string memory, // enddate
      bool, // endorsed
      string memory, // description
      bool // visible
    )
  {
    // return all the fields of workexpmap for the given organization
    return (
      workexpmap[_organization].role,
      workexpmap[_organization].organization,
      workexpmap[_organization].startdate,
      workexpmap[_organization].enddate,
      workexpmap[_organization].endorsed,
      workexpmap[_organization].description,
      workexpmap[_organization].visible
    );
  }

  // getWorkExpCount returns the total number of work experiences
  function getWorkExpCount() public view returns (uint256) {
    return workexps.length;
  }

  // getWorkExpByIndex returns work experience information of a specific organization by index
  function getWorkExpByIndex(uint256 _index)
    public
    view
    returns (
      string memory, // role
      address, // organization
      string memory, // startdate
      string memory, // enddate
      bool, // endorsed
      string memory, // description
      bool // visible
    )
  {
    // return all the fields of workexpmap for the organization found at the given index in workexps array
    return getWorkExpByAddress(workexps[_index]);
  }

  // deleteWorkExp sets the visibility of a specific organization to false
  function deleteWorkExp(address org) public OnlyEmployee {
    // change visibility of the workexpmap for the given organization to false
    workexpmap[org].visible = false;
  }


  // Education Section

  // Struct to store education information
  struct educationInfo {
    // address of the educational institute
    address institute;
    // start date of education
    string startdate;
    // end date of education
    string enddate;
    // whether the education is endorsed
    bool endorsed;
    // description of the education
    string description;
  }

  // mapping to store education information, key is the institute address
  mapping(address => educationInfo) educationmap;
  // array to store all the institute addresses
  address[] educations;

  // function to add education information for an employee
  function addEducation(
      // institute address
      address _institute,
      // start date of education
      string memory _startdate,
      // end date of education
      string memory _enddate,
      // description of the education
      string memory _description
  ) public OnlyEmployee {
    // memory variable to store new education information
    educationInfo memory newEducation;
    // store the institute address
    newEducation.institute = _institute;
    // store the start date
    newEducation.startdate = _startdate;
    // store the end date
    newEducation.enddate = _enddate;
    // set endorsement to false initially
    newEducation.endorsed = false;
    // store the description
    newEducation.description = _description;
    // add the education information to the mapping
    educationmap[_institute] = newEducation;
    // push the institute address to the array
    educations.push(_institute);
  }

  // function to endorse the education information for an employee
  function endorseEducation() public {
    // check if the education information for the employee exists
    require(educationmap[msg.sender].institute != address(0x0));
    // set endorsement to true
    educationmap[msg.sender].endorsed = true;
  }

  //This function returns the education details for a given institute address
  function getEducationByAddress(address _institute)
    //The function is private and can only be accessed within the contract
    private
    //This function uses a view function, which means it does not modify the state of the contract
    view
    //This function returns five values: address, startdate, enddate, endorsed, and description
    returns (
      address,
      string memory,
      string memory,
      bool,
      string memory
    )
  {
    //The function returns the education details stored in the educationmap mapping
    return (
      educationmap[_institute].institute,
      educationmap[_institute].startdate,
      educationmap[_institute].enddate,
      educationmap[_institute].endorsed,
      educationmap[_institute].description
    );
  }

  //This function returns the number of educational records stored in the educations array
  function getEducationCount() public view returns (uint256) {
    return educations.length;
  }

  //This function returns the education details for a given index in the educations array
  function getEducationByIndex(uint256 _index)
    //The function is public and can be accessed from outside the contract
    public
    //This function uses a view function, which means it does not modify the state of the contract
    view
    //This function returns five values: address, startdate, enddate, endorsed, and description
    returns (
      address,
      string memory,
      string memory,
      bool,
      string memory
    )
  {
    //The function returns the education details for a given institute address by calling the getEducationByAddress function
    return getEducationByAddress(educations[_index]);
  }

}
