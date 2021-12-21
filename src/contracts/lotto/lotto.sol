// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
contract lotto{
    uint public ticket_cost = 0 wei;
    uint public min_participants;
    address public manager;
    uint public tickets_sold;

    address payable  public winner;
    uint max_fees;
    uint winner_index;
    address[]  final_list;
    mapping(address=>uint)  partcipants;
    address[]  partcipants_list;
    enum State{active,drawn} State public current_state=State.active;

    //Events 
    event sale(
            uint tickets,
            address participant,
            uint date
    );
    event genisis(
            uint targetPool,
            address manager,
            uint date
    );
    event drawn(
        uint prize,
        address winner,
        uint date
    );

    constructor(uint _ticket_cost,uint _min_tickets, uint _max_fees){
    //    require(_ticket_size >= 0.001 ether,"Size cannot be smaller than 0.001 ether" );
       require(_min_tickets>= 5,"At least 5 tickets must to be sold");
        min_participants = _min_tickets;
        ticket_cost  = _ticket_cost;
        manager = msg.sender;
        max_fees = _max_fees;

        emit genisis(ticket_cost*min_participants,manager,block.timestamp);
        
    }
   function balance() public view returns(uint){
        return address(this).balance;
    }
    function my_tickets() public view returns(uint) {
        return partcipants[msg.sender];
    }
    function buy_ticket() public payable {
        require(current_state==State.active,"Lottery has been drawn");
        require(msg.value ==  ticket_cost,"Value should be exactly equal to ticket size");
        tickets_sold+=1;
        partcipants[msg.sender] += 1;
        partcipants_list.push(msg.sender);  
        emit sale(tickets_sold,msg.sender,block.timestamp);
    }

    function get_winner() internal{
        
         winner_index = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%final_list.length;
         winner = payable(final_list[winner_index]);
         emit drawn(balance(),address(winner),block.timestamp);
         winner.transfer(balance());
         current_state = State.drawn;
         
    }
    function give_fees() internal {
       payable(manager).transfer(manager_fees());
    }

    function draw() public {
        require(current_state==State.active,"Lottery has been drawn");
        require(msg.sender==manager,"Only manager can call this function");
        require(tickets_sold >= min_participants,"Participants must be grater than or equalt to min_participants");
        
        for(uint i=0; i<partcipants_list.length; i++)
        {
            while(partcipants[partcipants_list[i]] > 0)   
            {
                final_list.push(partcipants_list[i]);
                partcipants[partcipants_list[i]] -=1;
            }
        }

        give_fees();
        get_winner();
         current_state = State.drawn;
    }
    
    function ticket_refund() public{
        require(partcipants[msg.sender]>0,"You don't have a valid ticket");
            address payable sender = payable(msg.sender);
            sender.transfer(ticket_cost);
            partcipants[msg.sender]-=1;
            tickets_sold -= 1;
            emit sale(tickets_sold,msg.sender,block.timestamp);
    }
    
    function manager_fees() public view returns(uint){
        uint fees =  uint(address(this).balance*5/100);
        return fees>max_fees ? max_fees:fees;
    }

    
}