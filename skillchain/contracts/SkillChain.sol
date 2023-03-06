// SPDX-License-Identifier: M
pragma solidity ^0.8.9;


// Declare the contract
contract SkillChain{

    bool public initialized;
    
    // mapping of account's mail id with account's wallet address
    mapping(string => address) public email_to_address;

    // mapping of wallet address with account id
    mapping(address => uint256) public address_to_id;

    // mapping of wallet address with bool representing account status (Organization/individual)
    mapping(address => bool) public is_organization;

    //create structure for organization
    struct organization {
        uint256 id;
        string metaurl;
        address wallet_address;
        uint256[] current_employees;
        uint256[] previous_employees;
    }

    //create structure for individual account
    struct individual {
        uint256 id;
        uint256 organization_id;
        string metaurl;
        address wallet_address;
        bool is_employed;
        bool is_manager;
        uint256 num_skill;
        uint256[] individual_skills;
        
    }

    //create structure for certificate
    struct certificate {
        string metaurl;
        uint256 id;
    }

    //create structure for verification
    struct verification {
        uint256 verifier_id;        
        string metaurl;
    }

    //create structure for skill
    struct skill {
        uint256 id;
        string name;
        bool verified;
        uint256[] skill_certifications;
        uint256[] skill_verifications;
    }
    
    // Call identifiers 
    organization[] public organizations;
    individual[] public employees;
    certificate[] public certifications;
    verification[] public verifications;
    skill[] public skills;

    // Declare constructor
    constructor() {
        require(!initialized, "Contract already initialized");
        initialized = true;
    }

    // Declare string comparison functions

    function memcomparison(bytes memory a, bytes memory b)
    internal
    pure
    returns (bool)
    {
        return (a.length == b.length) && (keccak256(a) == keccak256(b));
    }

    function strcomp(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return memcomparison(bytes(a), bytes(b));
    }

    // Create the signup function
    function sign_up(
        string calldata email,
        string calldata metaurl,
        string calldata acc_type // account type (organization/individual)
    ) public {
        // first we check that account does not already exists
        require(
            email_to_address[email] == address(0),
            "error: account already exists!"
        );
        email_to_address[email] = msg.sender;
    
        if (strcomp(acc_type, "individual")) { // for individual account type            
            if (employees.length == 0) {
                employees.push(); // add dummy element at index 0
            }
            individual storage new_individual = employees.push(); // creates a new individual and returns the reference to it
            new_individual.metaurl = metaurl;
            new_individual.id = employees.length - 1; // give account a unique individual id
            new_individual.wallet_address = msg.sender;
            address_to_id[msg.sender] = new_individual.id;
            new_individual.individual_skills = new uint256[](0);
        } 
        else { // for organization account type
            if (organizations.length == 0) {
                organizations.push(); // add dummy element at index 0
            }
            organization storage new_organization = organizations.push(); // creates a new organization and returns a reference to it
            new_organization.metaurl = metaurl;
            new_organization.id = organizations.length - 1; // give account a unique organization id
            new_organization.wallet_address = msg.sender;
            new_organization.current_employees = new uint256[](0);
            new_organization.previous_employees = new uint256[](0);
            address_to_id[msg.sender] = new_organization.id;
            is_organization[msg.sender] = true;
        }
    }

    // Create signin function
    function signin(string calldata email) public view returns (string memory accountType, uint256 id) {
        // checking the function caller's wallet address from global map containing email address mapped to wallet address
        require(
        msg.sender == email_to_address[email],
        "error: incorrect wallet address used for signing in"
        );
        
        if (is_organization[msg.sender]) {
            accountType = "organization";
            for (uint256 i = 0; i < organizations.length; i++) {
                if (organizations[i].wallet_address == msg.sender) {
                    id = organizations[i].id;
                    break;
                }
            }
        } else {
            accountType = "individual";
            for (uint256 i = 0; i < employees.length; i++) {
                if (employees[i].wallet_address == msg.sender) {
                    id = employees[i].id;
                    break;
                }
            }
        }
    
        return (accountType, id);
    }
    

    // Funtion to update wallet address
    function update_wallet_address(string calldata email, address new_address)
    public
    {
        require(
            email_to_address[email] == msg.sender, // check if the current wallet address is what is linked to the email address
            "error: Function called from incorrect wallet address"
        );
        email_to_address[email] = new_address;
        uint256 id = address_to_id[msg.sender];
        address_to_id[msg.sender] = 0;
        address_to_id[new_address] = id;
    }

    // Create modifier for verified Individual
    modifier verifiedIndividual(uint256 individual_id) {
        require(individual_id == address_to_id[msg.sender]);
        _;
    }

    // Funtion to edit employee role
    function editemployeerole(uint256 employee_id) public {
        require(is_organization[msg.sender], "error: sender not an organization account");
        require(
            employees[employee_id].organization_id == address_to_id[msg.sender],
            "error: user is not of the same organization"
        );
        if (employees[employee_id].is_manager == true) {
            // Demote manager
            employees[employee_id].is_manager = false;
        } else {
            // Promote employee
            employees[employee_id].is_manager = true;
        }
    }

    // Function to add employee
    function add_employee(uint256 org_id, uint256 employee_id) public {
        // check that the caller is an organization
        require(
        is_organization[msg.sender],
        "error: only organizations can add employees"
        );
            // check that the organization exists and the employee exists
        require(
            org_id < organizations.length,
            "error: organization does not exist"
        );
        require(
            employee_id < employees.length,
            "error: employee does not exist"
        ); 

        // add employee to the current employees list of the organization
        organizations[org_id].current_employees.push(employee_id);

        // update the organization_id field of the employee
        employees[employee_id].organization_id = org_id;
    }

    // Function to remove employee
    function remove_employee(uint256 org_id, uint256 employee_id) public {
        // check that the caller is an organization
        require(
            is_organization[msg.sender],
            "error: only organizations can remove employees"
        );

        // check that the organization exists and the employee exists
        require(
            org_id < organizations.length,
            "error: organization does not exist"
        );
        require(
            employee_id < employees.length,
            "error: employee does not exist"
        );

        // remove the employee from the current employees list of the organization
        uint256[] storage current_employees = organizations[org_id].current_employees;
        for (uint256 i = 0; i < current_employees.length; i++) {
            if (current_employees[i] == employee_id) {
                current_employees[i] = current_employees[current_employees.length - 1];
                current_employees.pop();
                break;
            }
        }

        // add the employee to the previous employees list of the organization
        organizations[org_id].previous_employees.push(employee_id);

        // update the organization_id field of the employee
        employees[employee_id].organization_id = 0;
    }


    // Function to add skill
    function add_skill(uint256 individualid, string calldata skill_name)
        public
        verifiedIndividual(individualid)
    {
        skill storage new_skill = skills.push();
        employees[individualid].individual_skills.push(skills.length - 1);
        new_skill.id = skills.length - 1;
        new_skill.name = skill_name;
        new_skill.verified = false;
        new_skill.skill_certifications = new uint256[](0);
        new_skill.skill_verifications = new uint256[](0);
    }

    // Function to verify skill
    function verify_skill(
        uint256 individual_id,
        uint256 skill_id,
        string calldata metaurl
    ) public {

        require(address_to_id[msg.sender] != individual_id, "error: Endorser cannot endorse their own skill");
        verification storage new_verification = verifications.push();
        new_verification.verifier_id = address_to_id[msg.sender];
        new_verification.metaurl = metaurl;
        skills[skill_id].skill_verifications.push(verifications.length - 1);
        if (employees[address_to_id[msg.sender]].is_manager) {
            if (
                employees[address_to_id[msg.sender]].organization_id ==
                employees[individual_id].organization_id
            ) {
                skills[skill_id].verified = true;
            }
        }
    }

    // Function to add certificate
    function add_certification(
        uint256 individual_id,
        string memory metaurl,
        uint256 linked_skill_id
    ) public verifiedIndividual(individual_id) {
        certificate storage new_certificate = certifications.push();
        new_certificate.metaurl = metaurl;
        new_certificate.id = certifications.length - 1;
        skills[linked_skill_id].skill_certifications.push(new_certificate.id);
    }

    // Function to get number of orgainizations
    function getNumberOfOrganizations() public view returns (uint256) {
        return organizations.length;
    }  
    
    // Function to get the list of all individuals
    function getAllOrgs() public view returns (organization[] memory) {
        return organizations;
    }


    // Function to get number of users
    function getNumberOfUsers() public view returns (uint256) {
        return employees.length;
    }  
    
    // Function to get the list of all individuals
    function getAllUsers() public view returns (individual[] memory) {
        return employees;
    }

    
    // Function to get the skills of a user
    function skills_of_individual(uint256 id) public view returns (uint256[] memory) {
        return employees[id].individual_skills;
    }

    // Function to list current employees of an organization
    function curr_emp_of_organization(uint256 id)
        public
        view
        returns (uint256[] memory)
    {
        return organizations[id].current_employees;
    }

    // Function to list previous employees of an organization
    function prev_emp_of_organization(uint256 id)
        public
        view
        returns (uint256[] memory)
    {
        return organizations[id].previous_employees;
    }

    // Function to get the certificate of skills of a user
    function cert_of_skill(uint256 id) public view returns (uint256[] memory) {
        return skills[id].skill_certifications;
    }

    // Function to get the verified skills of a user
    function ver_of_skill(uint256 id) public view returns (uint256[] memory) {
        return skills[id].skill_verifications;
    }   
    
}