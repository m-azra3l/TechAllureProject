// test/SkillChain.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SkillChain", function () {
  let skillChain;

  beforeEach(async function () {
    owner = await ethers.getSigners();
    const SkillChain = await ethers.getContractFactory("SkillChain");
    skillChain = await SkillChain.deploy();
    await skillChain.deployed();
  });

  it("should sign up an individual account", async function () {
    
    const email = "test@test.com";
    const metaurl = "https://example.com";
    const acc_type = "individual";

    const tx = await skillChain.sign_up(email, metaurl, acc_type);

    // Verify that account was created
    expect(await skillChain.email_to_address(email)).to.equal(await tx.from);
    const individual = await skillChain.employees(await skillChain.address_to_id(await tx.from));
    expect(individual.id.toNumber()).to.equal(0);
    expect(individual.metaurl).to.equal(metaurl);
    expect(individual.wallet_address).to.equal(await tx.from);
  });

  it("should sign up an organization account", async function () {

    const email = "test@test.com";
    const metaurl = "https://example.com";
    const acc_type = "organization";

    const tx = await skillChain.sign_up(email, metaurl, acc_type);

    // Verify that account was created
    expect(await skillChain.email_to_address(email)).to.equal(await tx.from);
    const organization = await skillChain.organizations(await skillChain.address_to_id(await tx.from));
    expect(organization.id.toNumber()).to.equal(0);
    expect(organization.metaurl).to.equal(metaurl);
    expect(organization.wallet_address).to.equal(await tx.from);
    expect(await skillChain.is_organization(await tx.from)).to.be.true;
  });

  it("should revert if account already exists", async function () {

    const email = "test@test.com";
    const metaurl = "https://example.com";
    const acc_type = "individual";

    // Sign up first time
    await skillChain.sign_up(email, metaurl, acc_type);

    // Sign up second time with the same email
    await expect(skillChain.sign_up(email, metaurl, acc_type)).to.be.revertedWith("error: account already exists!");
  });

  it("should add a new skill for an individual", async function () {

    // create a new individual
    await skillChain.sign_up("individual@test.com", "metaurl", "individual");
    const individualId = 0;

    // add a skill for the individual
    await skillChain.add_skill(individualId, "Javascript");
    
    // check that the skill was added
    const skill = await skillChain.skills(0);
    expect(skill.id).to.equal(0);
    expect(skill.name).to.equal("Javascript");
    expect(skill.verified).to.be.false;
  });
});