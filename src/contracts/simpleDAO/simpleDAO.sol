// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract simpleDAO{
   mapping(address=>bool) public members;
   mapping(address=>bool) public pending_join;
   uint256 date;
   address[] public proposals;
   address[] public joinRequests;
   function balance() internal view returns(uint){
        return address(this).balance;
    }
    event added_ether(address sender,uint256 date,uint256 value,string reason);
    constructor( address[] memory _members,uint256 _date)
    {   date=_date;
        require(_members.length >0, "menbers cant be empty");
        for(uint128 i =0; i<_members.length; i++)
        {
            require(!members[_members[i]], "Don't repeat members");
            members[_members[i]]=true;
           
        }

    }
    function add_ether(uint256 _value,string memory _reason) payable external{
        require(msg.value == _value,"Value must match the entered _value ");
        emit added_ether(msg.sender,block.timestamp,_value,_reason);

    
    }
    function self_abdicate() external
    {
        members[msg.sender]=false;
    }
    function transfer(uint256 _value,uint id) external returns(uint256)
    {   require(id<proposals.length,"Invalid ID");
        require(proposals[id]==msg.sender,"Function should be called only from proposal contract");
        proposal current = proposal(proposals[id]);
        require(current.state()==simpleProposal.State.voting,"Proposal not passed yet");
        require(_value <= current.value(),"You cannot withdraw that much");

        payable(current.caller()).transfer(_value);
        uint256 doneVal = current.value()- _value;
        return doneVal;
        
    }
    function introduce_proposal(string memory name,string memory url, uint256 _value) external {
        require(members[msg.sender],"You are not a member yet");
        proposal newProposal = new proposal(msg.sender,name,url,block.timestamp+date,_value,proposals.length);
        proposals.push(address(newProposal));

    }
    function introduce_join_proposal(string memory name,string memory reason) external{
        require(!members[msg.sender],"You are already a member");
        require(!pending_join[msg.sender], "Your join proposal already in pipline");
        join_request new_request = new join_request(msg.sender,name,reason,block.timestamp+date,joinRequests.length);
        joinRequests.push(address(new_request));
        pending_join[msg.sender]=true;

    }
    function join_dao(uint256 id) external{
    require(id<joinRequests.length,"Invalid ID");
    require(joinRequests[id]==msg.sender,"Function should be called only from proposal contract");
    join_request current = join_request(joinRequests[id]);
    require(current.state()==simpleProposal.State.voting,"Voting Not Over yet");
    
    members[current.caller()] = current.state() == simpleProposal.State.passed ? true:false;
    pending_join[current.caller()]=false;

    }
   
   
}
 contract simpleProposal{
     enum State{voting,withdraw,rejected,passed} State public state;
    address public caller;
    address public factory;
    uint public date;
    uint id;
    uint yes;
    uint no;
    simpleDAO DAO;
    mapping(address=>bool) voted;

    constructor(address _caller,  uint _date,uint _id)
    {
        factory = msg.sender;
        caller = _caller;
        date = _date;
        id =_id;
        DAO = simpleDAO(factory);

    }
     modifier canVote{
        require(DAO.members(msg.sender),"You are not eligible to vote");
        require(!voted[msg.sender],"You have voted already");
        require(date>=block.timestamp,"Voting period ended");

        _;
    }
    modifier isActive{
        require(state == State.voting, "Proposal is now passed/withdrawn/rejected");
        _;
    }
    modifier isMember{
        require(DAO.members(msg.sender), "You are not a member");
        _;
    }
    modifier isCaller{
        require(msg.sender==caller,"You are not the caller");
        _;
    }
    modifier isPassed{
        require(state == State.passed,"Proposal not passed yet, ");
        _;
    }

     function say_yes() canVote isActive public {
        voted[msg.sender] = true;
        yes +=1;
    }

    function say_no() canVote isActive public {
        voted[msg.sender] = true;
        no +=1;
    }
    function get_results()  isCaller internal {
        require(block.timestamp>date,"Voting is not complete yet");
        state = yes>no ? State.passed:State.rejected;
    }
    function withdraw_proposal() isCaller isActive public {
        state = State.withdraw;
   }

    

    
}

contract join_request is simpleProposal{
   
    string username;
    string reason;
   

    constructor(address _caller, string memory _name, string memory _reason, uint _date,uint _id) 
    simpleProposal(_caller,_date,_id)
    {        
        username = _name;
        reason = _reason;
    }
     
     function execute_results() public  isCaller
    {   get_results();
        DAO.join_dao(id);

    }
}
contract proposal is simpleProposal {

    uint256 public value;
    string public proposalName;
    string public url;
    
    constructor(address  _caller,string memory _name, string memory _url,uint _date,uint256 _value,uint _id)
    simpleProposal(_caller,_date,_id)
    {
       
        url =_url;
        proposalName = _name;
        value=_value;
       
    }
    
    function declare_result() isActive isCaller public returns(State)
    {

        get_results();
        return state;

    }

    function get_ether(uint256 _value) isCaller isMember isPassed public {
        simpleDAO DAO = simpleDAO(factory);
        require(value<=_value,"You cannot withdraw that much");
        uint256 transfered = DAO.transfer(_value,id);
        value-=transfered;

    }


}
