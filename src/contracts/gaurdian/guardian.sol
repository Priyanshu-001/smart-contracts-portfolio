// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
contract guardian{
    mapping(address=>bool)  benificaries;
    uint256 amt;
    uint256 interval;
    uint256 startdate;
     uint256 public  _required;
    uint times;
    mapping(address=>uint) withdraws;
    constructor(address[] memory _benificaries, uint256  _amt, uint256   _interval,uint _times, uint256  _startdate) payable
    
    {  
        _required = _benificaries.length*_amt*_times;
        require(msg.value == _required,"deposit must be exactly be equal to benificaries.length*amt*times");
        require(_benificaries.length <=100, "benificaries must be less than or equal to 100");
        for(uint i=0; i<_benificaries.length; i++)
        {   
            require(_benificaries[i] != address(0x0),"Empy address not allowed");
            require(benificaries[_benificaries[i]] == false,"Duplicate entries not allowed");
            benificaries[_benificaries[i]] = true;
        }
        amt = _amt;
        interval = _interval;
        times = _times;
        startdate = _startdate;

    }
    function withdraw() public  {
       
        require(benificaries[msg.sender],"You are not a benificary");
        require(block.timestamp>startdate,"You will have to wait");

        uint256 cycles = (block.timestamp - startdate)/interval;

        require(withdraws[msg.sender] <times,"You withdrawn for max times");
        require(withdraws[msg.sender] < cycles,"Next cycle hasn't begun yet");

        payable(msg.sender).transfer(amt);
        withdraws[msg.sender]+=1;
        
    }
    function oustanding_withdrawls() view public returns(uint256)
    {   
        require(benificaries[msg.sender],"You are not a benificary");
        uint256 cycles = (block.timestamp - startdate)/interval;
        return withdraws[msg.sender] - cycles;
    }
}