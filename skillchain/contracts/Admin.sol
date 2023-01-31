// SPDX-License-Identifier: GPL-3.0 License

// Solidity version declaration
pragma solidity ^0.8.13;

// Imports
import "./Employee.sol";
import "./OrganizationEndorser.sol";

// Declaring the contract
contract Admin {
  // The address of the contract owner
  address public owner;

  // Constructor function to set the owner of the contract
  constructor() public {
    owner = msg.sender;
  }

  // Modifier to only allow the owner to execute the following function
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // Mapping to store addresses of registered employees
  mapping(address => address) registeredEmployeesmap;

  // Mapping to store addresses of registered organizations
  mapping(address => address) registeredOrganizationmap;

  // Array to store addresses of registered employees
  address[] registeredEmployees;

  // Array to store addresses of registered organizations
  address[] registeredOrganization;

  // Function to register a new user with either employee or organization role
  function registerUser(
    address EthAddress,
    string memory Name,
    string memory Location,
    string memory Description,
    uint256 Role
  ) public onlyOwner {
    // If the role is employee
    if (Role == 1) {
      // Create a new instance of Employee contract
      Employee newEmployee = new Employee(
        owner,
        EthAddress,
        Name,
        Location,
        Description
      );
      // Add the new employee to the mapping of registered employees
      registeredEmployeesmap[EthAddress] = address(newEmployee);

      // Add the new employee's address to the array of registered employees
      registeredEmployees.push(EthAddress);

    } else {
      // Create a new instance of OrganizationEndorser contract
      OrganizationEndorser newOrganizationEndorser = new OrganizationEndorser(
        owner,
        EthAddress,
        Name,
        Location,
        Description
      );
      // Add the new organization to the mapping of registered organizations
      registeredOrganizationmap[EthAddress] = address(newOrganizationEndorser);

      // Add the new organization's address to the array of registered organizations
      registeredOrganization.push(EthAddress);
    }
  }

  // User Section

  // Function to check if an address is registered as an employee
  function isEmployee(address _employeeAddress) public view returns (bool) {
    return registeredEmployeesmap[_employeeAddress] != address(0x0);
  }

  // Function to check if an address is registered as an organization
  function isOrganizationEndorser(address _organizationEndorser)
    public
    view
    returns (bool)
  {
    return registeredOrganizationmap[_organizationEndorser] != address(0x0);
  }

  // Function to get the number of registered employees
  function employeeCount() public view returns (uint256) {
    return registeredEmployees.length;
  }

  // Function to get the contract address of an employee by their address
  function getEmployeeContractByAddress(address _employee)
    public
    view
    returns (address)
  {
    return registeredEmployeesmap[_employee];
  }
  
  // Function to get the contract address of an employee by its index in the registeredEmployees array 
  function getEmployeeContractByIndex(uint256 index) public view returns (address) {
    return getEmployeeContractByAddress(registeredEmployees[index]);
  }

  //Function to get the count of registered organizations
  function OrganizationEndorserCount() public view returns (uint256) {
    return registeredOrganization.length;
  }

  // Function to get the contract address of an organization by its address
  function getOrganizationContractByAddress(address _organization) public view returns (address) {
    return registeredOrganizationmap[_organization];
  }

  // Function to get the contract address of an organization by its index in the registeredOrganization array
  function getOrganizationContractByIndex(uint256 index) public view returns (address) {
    return getOrganizationContractByAddress(registeredOrganization[index]);
  }
}