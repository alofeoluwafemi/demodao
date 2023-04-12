//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Governance {
    struct Proposal {
        uint256 id;
        address creator;
        string title;
        string description;
        uint256 amount;
        uint256 deadline;
        bytes32 ipfsHash;
        uint256 yesVotes;
        uint256 noVotes;
        bool executed;
        bool disputed;
    }

    Proposal[] public proposals;

    mapping(address => uint256) public tokens;

    uint256 public totalTokens;

    constructor() {
        totalTokens = 1000;
        tokens[msg.sender] = totalTokens;
    }

    function submitProposal(
        string memory _title,
        string memory _description,
        uint256 _amount,
        uint256 _deadline,
        bytes32 _ipfsHash
    ) public {
        require(
            tokens[msg.sender] > 0,
            "Must have tokens to submit a proposal"
        );
        require(
            _amount <= address(this).balance,
            "Not enough funds in DAO to fulfill request"
        );
        uint256 proposalId = proposals.length;
        proposals.push(
            Proposal(
                proposalId,
                msg.sender,
                _title,
                _description,
                _amount,
                _deadline,
                _ipfsHash,
                0,
                0,
                false,
                false
            )
        );
        tokens[msg.sender] -= 1;
    }

    function vote(uint256 _proposalId, bool _inSupport) public {
        require(tokens[msg.sender] > 0, "Must have tokens to vote");
        require(
            proposals[_proposalId].deadline > block.timestamp,
            "Voting period has ended"
        );
        require(
            !proposals[_proposalId].executed,
            "Proposal has already been executed"
        );
        require(
            !proposals[_proposalId].disputed,
            "Proposal is currently in dispute"
        );
        if (_inSupport) {
            proposals[_proposalId].yesVotes += tokens[msg.sender];
        } else {
            proposals[_proposalId].noVotes += tokens[msg.sender];
        }
        tokens[msg.sender] = 0;
    }

    function executeProposal(uint256 _proposalId) public {
        require(
            proposals[_proposalId].yesVotes > proposals[_proposalId].noVotes,
            "Proposal did not receive enough support"
        );
        require(
            proposals[_proposalId].deadline < block.timestamp,
            "Voting period has not ended"
        );
        require(
            !proposals[_proposalId].executed,
            "Proposal has already been executed"
        );
        proposals[_proposalId].executed = true;
        payable(proposals[_proposalId].creator).transfer(
            proposals[_proposalId].amount
        );
    }

    function disputeProposal(uint256 _proposalId) public {
        require(
            !proposals[_proposalId].disputed,
            "Proposal is already in dispute"
        );
        proposals[_proposalId].disputed = true;
        // Trigger dispute resolution process
    }

    function getProposal(
        uint256 _proposalId
    ) public view returns (Proposal memory) {
        return proposals[_proposalId];
    }

    function getProposalFileHash(
        uint256 proposalId
    ) public view returns (bytes32) {
        return proposals[proposalId].ipfsHash;
    }
}
